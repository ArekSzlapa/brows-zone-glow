import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CarouselWithArrows } from "@/components/CarouselWithArrows";
import ModernHoverVideo from "./MutedPlayableVideo";

export type Media = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  children?: Media[];
};
export function MediaLightbox({ post }: { post: Media }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isCarousel = post.media_type === "CAROUSEL_ALBUM";
  const items = isCarousel ? post.children || [] : [post];

  const activeItem = items[activeIndex];

  return (
    <>
      {/* Thumbnail */}
      {!isCarousel && (
        <div
          className="aspect-square w-full overflow-hidden rounded-xl cursor-pointer"
          style={{ aspectRatio: "4/6" }}
          onClick={() => setOpen(true)}
        >
          {post.media_type === "IMAGE" && (
            <img
              src={post.media_url}
              alt={post.caption || "Instagram image"}
              className="h-full w-full object-cover"
            />
          )}
          {post.media_type === "VIDEO" && (
            <ModernHoverVideo
              thumbnailUrl={activeItem.thumbnail_url}
              src={activeItem.media_url}
              isThumbnail={true}
            />
          )}
        </div>
      )}

      {/* Carousel thumbnail */}
      {isCarousel && (
        <div
          className="w-full overflow-hidden rounded-xl cursor-pointer"
          style={{ aspectRatio: "4/6" }}
        >
          <CarouselWithArrows
            items={items}
            fitMode="cover"
            onMediaClick={(_, idx) => {
              setActiveIndex(idx); // set clicked item
              setOpen(true); // open modal
            }}
          />
        </div>
      )}

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isCarousel ? (
                <CarouselWithArrows
                  items={items}
                  fitMode="contain"
                  initialIndex={activeIndex}
                  onMediaClick={(_, idx) => setActiveIndex(idx)}
                />
              ) : activeItem.media_type === "IMAGE" ? (
                <img
                  src={activeItem.media_url}
                  alt={activeItem.caption || "Instagram image"}
                  className="max-h-[90vh] max-w-[90vw] object-contain mx-auto rounded-xl"
                />
              ) : (
                <ModernHoverVideo
                  src={activeItem.media_url}
                  autoplay={true} // auto play full size
                  isThumbnail={false} // allow autoplay button if needed
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
