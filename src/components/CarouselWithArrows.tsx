// helpers (put above your component or in a separate file)
import { useState, useMemo, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Media = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  children?: Media[];
};

function MediaItem({
  item,
  fitMode = "contain",
}: {
  item: Media;
  fitMode: "cover" | "contain";
}) {
  if (item.media_type === "IMAGE") {
    return (
      <img
        src={item.media_url}
        alt="Carousel image"
        className={`max-h-[90vh] max-w-[90vw] object-${fitMode} mx-auto rounded-xl`}
      />
    );
  }
  return (
    <video
      src={item.media_url}
      // controls
      muted
      playsInline
      poster={item.thumbnail_url}
      className={`max-h-[90vh] max-w-[90vw] object-${fitMode} mx-auto rounded-xl`}
      preload="metadata"
    />
  );
}

export function CarouselWithArrows({
  items,
  fitMode = "cover",
  onMediaClick,
  initialIndex = 0, // ✅ new prop
}: {
  items: Media[];
  fitMode?: "cover" | "contain";
  onMediaClick?: (item: Media, index: number) => void;
  initialIndex?: number; // ✅ optional prop
}) {
  const [index, setIndex] = useState(initialIndex); // ✅ start at initialIndex
  const count = items.length;
  const currentItem = items[index];

  const canPrev = index > 0;
  const canNext = index < count - 1;

  const goPrev = useCallback(
    () => canPrev && setIndex((i) => i - 1),
    [canPrev]
  );
  const goNext = useCallback(
    () => canNext && setIndex((i) => i + 1),
    [canNext]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  if (count === 0) return null;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div
        className="max-h-[90vh] max-w-[90vw] object-contain mx-auto rounded-xl"
        onClick={() => onMediaClick?.(currentItem, index)}
      >
        <MediaItem item={currentItem} fitMode={fitMode} />
      </div>

      {/* arrows */}
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={goPrev}
        disabled={!canPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={goNext}
        disabled={!canNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {items.map((_, i) => (
          <span
            key={i}
            className={[
              "h-1.5 w-1.5 rounded-full",
              i === index ? "bg-foreground" : "bg-muted-foreground/40",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
