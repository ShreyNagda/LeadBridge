import type { Metadata } from "next";
import {
  Inter,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  SEO_KEYWORDS,
  SOCIAL_LINKS,
} from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Backendless Form Endpoints`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: `${APP_NAME} Team` }],
  creator: APP_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: `${APP_NAME} - Backendless Form Endpoints`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Backendless Form Endpoints`,
    description: APP_DESCRIPTION,
    images: ["/og-image.png"],
    creator: SOCIAL_LINKS.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            closeOnClick
            closeButton
            autoClose={1000}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
