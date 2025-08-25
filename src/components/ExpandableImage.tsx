import { useState } from "react";

export default function ExpandableImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="aspect-square w-full overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
