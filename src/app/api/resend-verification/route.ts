import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/lib/email";
import { getVerificationEmailTemplate } from "@/lib/email-templates";
import { generateEmailVerificationToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: "If an account exists, a verification email has been sent" },
        { status: 200 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate new JWT verification token
    const token = generateEmailVerificationToken(
      user._id.toString(),
      user.email
    );

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
    const emailHtml = getVerificationEmailTemplate(user.name, verificationUrl);

    await sendEmail({
      to: email,
      subject: "Verify your email - FormBridge",
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
