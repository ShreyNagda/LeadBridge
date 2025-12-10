import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Form from "@/models/Form";
import Submission from "@/models/Submission";
import User from "@/models/User";
import { sendEmail } from "@/lib/email";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;

    // Parse body based on content type
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    await connectDB();

    const form = await Form.findById(formId);
    if (!form || !form.isActive) {
      return NextResponse.json(
        { message: "Form not found or inactive" },
        { status: 404 }
      );
    }

    // Create submission
    await Submission.create({
      formId,
      data,
    });

    // Send email notification if enabled
    if (form.settings.emailNotifications) {
      const user = await User.findById(form.userId);
      if (user && user.email) {
        // Format data for email
        const dataHtml = Object.entries(data)
          .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
          .join("<br>");

        await sendEmail({
          to: user.email,
          subject: `New submission for ${form.name}`,
          html: `
            <h1>New Form Submission</h1>
            <p>You have received a new submission for your form <strong>${form.name}</strong>.</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              ${dataHtml}
            </div>
            <p>View all submissions in your <a href="${process.env.NEXTAUTH_URL}/dashboard/forms/${formId}">dashboard</a>.</p>
          `,
        });
      }
    }

    return NextResponse.json(
      { message: "Submission received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
