"use client"

import { Memo } from "@/types/memo";
import { useModalStore } from "@/store/modalStore";
import Button from "@/components/atoms/Button";
import ImagePreviewList from "@/components/molecules/ImagePreviewList";

interface MemoItemProps {
    memo: Memo;
}

export default function MemoItem({ memo }: MemoItemProps) {
    const { setEditingMemo, setDeleteTargetMemo } = useModalStore();

    const images = memo.memoImages.map((img) => ({
        src: img.url,
        alt: `memo-image-${img.id}`,
    }));

    return (
        <li className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex gap-2">
                <span className="flex-1">{memo.text}</span>
                <Button variant="text" onClick={() => setEditingMemo(memo)} className="!p-0 text-blue-500 hover:text-blue-700">수정</Button>
                <Button variant="text" onClick={() => setDeleteTargetMemo(memo)} className="!p-0">삭제</Button>
            </div>
            <ImagePreviewList images={images} size="md" />
        </li>
    );
}
