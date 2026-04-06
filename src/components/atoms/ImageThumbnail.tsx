"use client"

import { Button } from "@/components/ui/button";

interface ImageThumbnailProps {
    src: string;
    alt: string;
    size?: "sm" | "md";
    onRemove?: () => void;
}

export default function ImageThumbnail({ src, alt, size = "sm", onRemove }: ImageThumbnailProps) {
    const sizeClass = size === "sm" ? "w-16 h-16" : "w-20 h-20";

    return (
        <div className={`relative ${sizeClass}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover rounded border" />
            {onRemove && (
                <Button
                    type="button"
                    size="icon-xs"
                    variant="destructive"
                    onClick={onRemove}
                    className="absolute -top-2 -right-2"
                >
                    x
                </Button>
            )}
        </div>
    );
}
