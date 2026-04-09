"use client"

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMemo } from "@/features/memo/api";
import ImageUploader from "@/features/memo/components/ImageUploader";
import ImagePreviewList from "@/features/memo/components/ImagePreviewList";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function MemoForm() {
    const queryClient = useQueryClient();
    const [input, setInput] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const { mutate: addMemo } = useMutation({
        mutationFn: ({ text, files }: { text: string; files: File[] }) => createMemo(text, files),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            toast.success("메모가 추가되었습니다");
        },
        onError: () => toast.error("메모 추가 실패"),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() && images.length === 0) return;
        addMemo({ text: input, files: images });
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
        <form className="mb-6 space-y-3" onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="내용을 입력하세요"
                    className="flex-1"
                    rows={3}
                />
                <Button type="submit">추가</Button>
            </div>
            <ImageUploader
                currentCount={images.length}
                maxCount={5}
                onChange={handleNewImages}
            />
            <ImagePreviewList images={previewImages} />
        </form>
    );
}
