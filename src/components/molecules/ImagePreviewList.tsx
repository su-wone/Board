"use client"

import ImageThumbnail from "@/components/atoms/ImageThumbnail";

interface ImagePreviewListProps {
    images: { src: string; alt: string; onRemove?: () => void }[];
    size?: "sm" | "md";
}

export default function ImagePreviewList({ images, size = "sm" }: ImagePreviewListProps) {
    if (images.length === 0) return null;

    return (
        <div className="flex gap-2 flex-wrap">
            {images.map((image, index) => (
                <ImageThumbnail
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    size={size}
                    onRemove={image.onRemove}
                />
            ))}
        </div>
    );
}
