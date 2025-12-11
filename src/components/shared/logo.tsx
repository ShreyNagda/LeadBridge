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
      className={`flex items-center gap-2 font-display font-bold text-xl tracking-tight ${className}`}
    >
      {/* Icon Container */}
      <div className="relative w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white overflow-hidden">
        {/* The 'Static' Spark (Emerald Dot) */}
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full z-10 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />

        {/* The 'Send' Paper Plane SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="translate-y-0.5 -translate-x-0.5" // Optical adjustment to center the plane visually
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span>
          Static<span className="text-gray-400 font-medium">Send</span>
        </span>
      )}
    </div>
  );
}
