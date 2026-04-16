interface WaveDividerProps {
  fillTop?: string;
  fillBottom?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({
  fillTop = "#FAF8F5",
  fillBottom = "#F0E8DC",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`section-wave ${className}`}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(40px, 5vw, 80px)" }}
        aria-hidden="true"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z"
          fill={fillBottom}
        />
        <path
          d="M0,0 L1440,0 L1440,40 C1080,0 720,80 360,40 C180,20 60,50 0,40 Z"
          fill={fillTop}
        />
      </svg>
    </div>
  );
}
