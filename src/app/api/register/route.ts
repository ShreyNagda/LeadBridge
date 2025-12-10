import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { getVerificationEmailTemplate } from "@/lib/email-templates";
import { generateEmailVerificationToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
    });

    // Generate JWT verification token
    const token = generateEmailVerificationToken(
      user._id.toString(),
      user.email
    );

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
    const emailHtml = getVerificationEmailTemplate(name, verificationUrl);

    try {
      await sendEmail({
        to: email,
        subject: "Verify your email - FormBridge",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail registration if email fails, but log it
    }

    return NextResponse.json(
      {
        message:
          "Registration successful! Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
