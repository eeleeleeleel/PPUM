import Image from "next/image";
import type { Photo } from "./PhotoViewer";

// Six photos per row (three on phones and tablets).
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-6 md:gap-3">
      {photos.map((photo) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 768px) 33vw, 17vw"
          className="block h-auto w-full"
        />
      ))}
    </div>
  );
}
