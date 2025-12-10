import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        // Check if email is verified - REMOVED blocking check to allow dashboard access with warning
        // if (!user.emailVerified) {
        //   throw new Error("Please verify your email before logging in");
        // }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signIn() {
      // Broadcast sign-in event to other tabs
      if (typeof window !== "undefined") {
        window.localStorage.setItem("session-event", Date.now().toString());
      }
    },
    async signOut() {
      // Broadcast sign-out event to other tabs
      if (typeof window !== "undefined") {
        window.localStorage.setItem("session-event", Date.now().toString());
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};
