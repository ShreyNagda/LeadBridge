import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/lib/email";
import { getWelcomeEmailTemplate } from "@/lib/email-templates";
import { verifyEmailVerificationToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 }
      );
    }

    // Verify JWT token
    const payload = verifyEmailVerificationToken(token);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the user
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify email matches (security check)
    if (user.email !== payload.email) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 200 }
      );
    }

    // Update user verification status
    user.emailVerified = true;
    await user.save();

    // Send welcome email
    try {
      const welcomeHtml = getWelcomeEmailTemplate(user.name);
      await sendEmail({
        to: user.email,
        subject: "Welcome to FormBridge! 🎉",
        html: welcomeHtml,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail verification if welcome email fails
    }

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
