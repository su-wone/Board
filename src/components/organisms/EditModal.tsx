"use client"

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/store/modalStore";
import { updateMemo, deleteImageById, addImages as addImagesApi } from "@/api/memoApi";
import ImageUploader from "@/components/molecules/ImageUploader";
import ImagePreviewList from "@/components/molecules/ImagePreviewList";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditModal() {
    const queryClient = useQueryClient();
    const { editingMemo, setEditingMemo } = useModalStore();
    const [text, setText] = useState(editingMemo?.text ?? "");
    const [newImages, setNewImages] = useState<File[]>([]);

    const { mutate: saveEdit } = useMutation({
        mutationFn: ({ id, text }: { id: number; text: string }) => updateMemo(id, text),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            setEditingMemo(null);
        },
    });

    const { mutate: deleteImage } = useMutation({
        mutationFn: deleteImageById,
        onSuccess: (_data, imageId) => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            if (editingMemo) {
                setEditingMemo({
                    ...editingMemo,
                    memoImages: editingMemo.memoImages.filter((img) => img.id !== imageId),
                });
            }
        },
    });

    const { mutate: addImages } = useMutation({
        mutationFn: ({ memoId, files }: { memoId: number; files: File[] }) => addImagesApi(memoId, files),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["memos"] }),
    });

    useEffect(() => {
        setText(editingMemo?.text ?? "");
        setNewImages([]);
    }, [editingMemo]);

    const currentImageCount = editingMemo?.memoImages.length ?? 0;

    const handleNewImages = (files: File[]) => {
        setNewImages([...newImages, ...files]);
    };

    const handleSave = () => {
        if (!editingMemo) return;
        saveEdit({ id: editingMemo.id, text });
        if (newImages.length > 0) {
            addImages({ memoId: editingMemo.id, files: newImages });
        }
    };

    const existingImages = (editingMemo?.memoImages ?? []).map((img) => ({
        src: img.url,
        alt: `memo-image-${img.id}`,
        onRemove: () => deleteImage(img.id),
    }));

    const newPreviewImages = newImages.map((file, index) => ({
        src: URL.createObjectURL(file),
        alt: `new-${index}`,
        onRemove: () => setNewImages(newImages.filter((_, i) => i !== index)),
    }));

    return (
        <Dialog
            open={editingMemo !== null}
            onOpenChange={(open) => !open && setEditingMemo(null)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>메모 수정</DialogTitle>
                </DialogHeader>

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

                <DialogFooter>
                    <Button variant="ghost" onClick={() => setEditingMemo(null)}>취소</Button>
                    <Button onClick={handleSave}>저장</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
