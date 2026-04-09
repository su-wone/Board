"use client"

import { useRef } from "react";

interface ImageUploaderProps {
    currentCount: number;
    maxCount: number;
    onChange: (files: File[]) => void;
}

export default function ImageUploader({ currentCount, maxCount, onChange }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const remaining = maxCount - currentCount;

    if (remaining <= 0) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selected = Array.from(e.target.files);
        if (selected.length > remaining) {
            alert(`이미지는 최대 ${maxCount}개까지 가능합니다. (추가 가능 ${remaining}개)`);
            return;
        }
        onChange(selected);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">최대 {maxCount}개 이미지 ({currentCount}/{maxCount})</p>
        </div>
    );
}
