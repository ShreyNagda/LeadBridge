import Logo from "@/components/shared/logo";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo iconSize={16} className="text-lg" />
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} StaticSend. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
