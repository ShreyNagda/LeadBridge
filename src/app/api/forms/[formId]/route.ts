import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Form from "@/models/Form";
import Submission from "@/models/Submission";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await params;
    await connectDB();

    const form = await Form.findOne({ _id: formId, userId: session.user.id });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await params;
    const body = await req.json();
    const { name, description, settings, isActive } = body;

    await connectDB();

    const form = await Form.findOne({ _id: formId, userId: session.user.id });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    if (name) form.name = name;
    if (description !== undefined) form.description = description;
    if (isActive !== undefined) form.isActive = isActive;
    if (settings) {
      form.settings = { ...form.settings, ...settings };
    }

    await form.save();

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await params;
    await connectDB();

    const form = await Form.findOneAndDelete({
      _id: formId,
      userId: session.user.id,
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    // Also delete all submissions for this form
    await Submission.deleteMany({ formId });

    return NextResponse.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
