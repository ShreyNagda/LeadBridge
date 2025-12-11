import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import TerminalCode from "@/components/shared/terminal-code";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/shared/button";

import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";

export default function Home() {
  const code = `const response = await fetch("${
    process.env.NEXTAUTH_URL || "https://api.staticsend.com"
  }/v1/submit/form_123", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    message: "Hello from my static site!"
  })
});`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mt-10">
        <section className="px-6 lg:px-12 pt-20 pb-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-medium text-emerald-700 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                v1.0 is now live
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                The missing backend for
                <br />
                your <span className="italic text-gray-500">Static Forms</span>
              </h1>

              <p className="text-lg font-medium text-gray-900 mb-4">
                For developers who want their site up and running in no time.
              </p>

              <p className="text-lg mb-8 leading-relaxed max-w-xl text-gray-600">
                No backend required. Secure API endpoints for your forms. Get
                submissions via email and view submissions in real-time.
              </p>

              <div className="flex flex-col md:flex-row  items-center gap-4 mb-8">
                <Link href="/auth/register">
                  <Button
                    variant="primary"
                    className="inline-flex items-center gap-2 px-8 py-6"
                  >
                    Start for Free
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="secondary"
                    className="inline-flex items-center gap-2 px-8 py-6"
                  >
                    Read the Docs
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-muted" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-600" />
                  <span>Free tier available</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <TerminalCode code={code} language="javascript" title="bash" />
            </div>
          </div>
        </section>

        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
