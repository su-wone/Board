"use client"

import { useState, useEffect } from "react";
import { Memo } from "@/types/memo";
import Modal from "@/components/atoms/Modal";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ImageUploader from "@/components/molecules/ImageUploader";
import ImagePreviewList from "@/components/molecules/ImagePreviewList";

interface EditModalProps {
    memo: Memo | null;
    onClose: () => void;
    onSave: (id: number, text: string) => void;
    onDeleteImage: (imageId: number) => void;
    onAddImages: (memoId: number, files: File[]) => void;
}

export default function EditModal({ memo, onClose, onSave, onDeleteImage, onAddImages }: EditModalProps) {
    const [text, setText] = useState(memo?.text ?? "");
    const [newImages, setNewImages] = useState<File[]>([]);

    useEffect(() => {
        setText(memo?.text ?? "");
        setNewImages([]);
    }, [memo]);

    const currentImageCount = memo?.memoImages.length ?? 0;

    const handleNewImages = (files: File[]) => {
        setNewImages([...newImages, ...files]);
    };

    const handleSave = () => {
        if (!memo) return;
        onSave(memo.id, text);
        if (newImages.length > 0) {
            onAddImages(memo.id, newImages);
        }
    };

    const existingImages = (memo?.memoImages ?? []).map((img) => ({
        src: img.url,
        alt: `memo-image-${img.id}`,
        onRemove: () => onDeleteImage(img.id),
    }));

    const newPreviewImages = newImages.map((file, index) => ({
        src: URL.createObjectURL(file),
        alt: `new-${index}`,
        onRemove: () => setNewImages(newImages.filter((_, i) => i !== index)),
    }));

    return (
        <Modal isOpen={memo !== null} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">메모 수정</h2>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mb-4"
            />

            {existingImages.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">기존 이미지</p>
                    <ImagePreviewList images={existingImages} />
                </div>
            )}

            <div className="mb-4">
                <ImageUploader
                    currentCount={currentImageCount + newImages.length}
                    maxCount={5}
                    onChange={handleNewImages}
                />
            </div>

            {newPreviewImages.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    <ImagePreviewList images={newPreviewImages} />
                </div>
            )}

            <div className="flex justify-end gap-2">
                <Button variant="text" onClick={onClose}>취소</Button>
                <Button onClick={handleSave}>저장</Button>
            </div>
        </Modal>
    );
}
