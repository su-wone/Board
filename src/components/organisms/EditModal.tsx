"use client"

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/store/modalStore";
import { updateMemo, deleteImageById, addImages as addImagesApi } from "@/api/memoApi";

import Modal from "@/components/atoms/Modal";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ImageUploader from "@/components/molecules/ImageUploader";
import ImagePreviewList from "@/components/molecules/ImagePreviewList";

export default function EditModal() {
    const queryClient = useQueryClient();
    const { editingMemo, setEditingMemo } = useModalStore();
    const [text, setText] = useState(editingMemo?.text ?? "");
    const [newImages, setNewImages] = useState<File[]>([]);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    const { mutate: saveEdit } = useMutation({
        mutationFn: async ({ id, text, deleteIds }: { id: number; text: string; deleteIds: number[] }) => {
            await Promise.all(deleteIds.map(deleteImageById));
            return updateMemo(id, text);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            setEditingMemo(null);
        },
    });

    const { mutate: addImages } = useMutation({
        mutationFn: ({ memoId, files }: { memoId: number; files: File[] }) => addImagesApi(memoId, files),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["memos"] }),
    });

    useEffect(() => {
        setText(editingMemo?.text ?? "");
        setNewImages([]);
        setDeletedImageIds([]);
    }, [editingMemo]);

    const visibleMemoImages = (editingMemo?.memoImages ?? []).filter(
        (img) => !deletedImageIds.includes(img.id)
    );

    const handleNewImages = (files: File[]) => {
        setNewImages([...newImages, ...files]);
    };

    const handleSave = () => {
        if (!editingMemo) return;
        saveEdit({ id: editingMemo.id, text, deleteIds: deletedImageIds });
        if (newImages.length > 0) {
            addImages({ memoId: editingMemo.id, files: newImages });
        }
    };

    const existingImages = visibleMemoImages.map((img) => ({
        src: img.url,
        alt: `memo-image-${img.id}`,
        onRemove: () => setDeletedImageIds([...deletedImageIds, img.id]),
    }));

    const newPreviewImages = newImages.map((file, index) => ({
        src: URL.createObjectURL(file),
        alt: `new-${index}`,
        onRemove: () => setNewImages(newImages.filter((_, i) => i !== index)),
    }));

    return (
        <Modal isOpen={editingMemo !== null} onClose={() => setEditingMemo(null)}>
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
                    currentCount={visibleMemoImages.length + newImages.length}
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
                <Button variant="text" onClick={() => setEditingMemo(null)}>취소</Button>
                <Button onClick={handleSave}>저장</Button>
            </div>
        </Modal>
    );
}
