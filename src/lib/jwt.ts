import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "fallback-secret-change-in-production";

export interface EmailVerificationPayload {
  userId: string;
  email: string;
  type: "email-verification";
}

/**
 * Generate a JWT token for email verification
 * @param userId - User's database ID
 * @param email - User's email address
 * @returns JWT token string
 */
export function generateEmailVerificationToken(
  userId: string,
  email: string
): string {
  const payload: EmailVerificationPayload = {
    userId,
    email,
    type: "email-verification",
  };

  // Token expires in 24 hours
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
    issuer: "formbridge",
    audience: "email-verification",
  });
}

/**
 * Verify and decode an email verification JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function verifyEmailVerificationToken(
  token: string
): EmailVerificationPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "formbridge",
      audience: "email-verification",
    }) as EmailVerificationPayload;

    // Validate the payload structure
    if (
      !decoded.userId ||
      !decoded.email ||
      decoded.type !== "email-verification"
    ) {
      return null;
    }

    return decoded;
  } catch (error) {
    // Token is invalid, expired, or malformed
    console.error("JWT verification error:", error);
    return null;
  }
}

/**
 * Generate a JWT token for password reset
 * @param userId - User's database ID
 * @param email - User's email address
 * @returns JWT token string
 */
export function generatePasswordResetToken(
  userId: string,
  email: string
): string {
  const payload = {
    userId,
    email,
    type: "password-reset",
  };

  // Token expires in 1 hour for security
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
    issuer: "formbridge",
    audience: "password-reset",
  });
}

/**
 * Verify and decode a password reset JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function verifyPasswordResetToken(token: string): {
  userId: string;
  email: string;
  type: string;
} | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "formbridge",
      audience: "password-reset",
    }) as { userId: string; email: string; type: string };

    if (
      !decoded.userId ||
      !decoded.email ||
      decoded.type !== "password-reset"
    ) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
