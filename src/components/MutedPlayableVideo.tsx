import { useRef, useState, useEffect } from "react";

export default function ModernHoverVideo({
  src,
  autoplay = false,
  isThumbnail = false,
  thumbnailUrl,
}: {
  src: string;
  autoplay?: boolean;
  isThumbnail?: boolean;
  thumbnailUrl?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(autoplay);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoplay) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [autoplay]);

  const togglePlay = () => {
    if (isThumbnail) return; // prevent background play in thumbnail
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="w-full h-full object-cover rounded-xl cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      <video
        poster={thumbnailUrl}
        ref={videoRef}
        src={src}
        muted
        loop={isThumbnail} // loop only in thumbnail
        playsInline
        className="w-full aspect-square object-cover rounded-xl"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Only show play/pause button in modal */}
      {!isThumbnail && (
        <button
          onClick={togglePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {playing ? (
            // ❚❚ pause icon
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                borderLeft: "4px solid white",
                borderRight: "4px solid white",
              }}
            />
          ) : (
            // ▶ play icon
            <span
              style={{
                display: "inline-block",
                width: 0,
                height: 0,
                borderLeft: "12px solid white",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
              }}
            />
          )}
        </button>
      )}
    </div>
  );
}
