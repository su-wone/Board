"use client"

import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ImageUploader from "@/components/molecules/ImageUploader";
import ImagePreviewList from "@/components/molecules/ImagePreviewList";

interface MemoFormProps {
    onSubmit: (text: string, images: File[]) => void;
}

export default function MemoForm({ onSubmit }: MemoFormProps) {
    const [input, setInput] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = () => {
        if (!input.trim() && images.length === 0) return;
        onSubmit(input, images);
        setInput("");
        setImages([]);
    };

    const handleNewImages = (files: File[]) => {
        const total = images.length + files.length;
        if (total > 5) {
            alert("이미지는 최대 5개까지 가능합니다.");
            return;
        }
        setImages([...images, ...files]);
    };

    const previewImages = images.map((file, index) => ({
        src: URL.createObjectURL(file),
        alt: `preview-${index}`,
        onRemove: () => setImages(images.filter((_, i) => i !== index)),
    }));

    return (
        <div className="mb-6 space-y-3">
            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="내용을 입력하세요"
                    className="flex-1"
                />
                <Button onClick={handleSubmit}>추가</Button>
            </div>
            <ImageUploader
                currentCount={images.length}
                maxCount={5}
                onChange={handleNewImages}
            />
            <ImagePreviewList images={previewImages} />
        </div>
    );
}
