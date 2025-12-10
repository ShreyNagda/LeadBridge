import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
}

export default function Logo({
  className = "",
  iconSize = 18,
  showText = true,
}: LogoProps) {
  return (
    <div
      className={`flex items-center gap-2 font-display font-bold text-xl ${className}`}
    >
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
        <Zap size={iconSize} fill="currentColor" />
      </div>
      {showText && <span>FormBridge</span>}
    </div>
  );
}
