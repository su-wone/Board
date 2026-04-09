"use client"

import { Memo } from "@/features/memo/types";
import { useModalStore } from "@/features/memo/store";
import ImagePreviewList from "@/features/memo/components/ImagePreviewList";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <Card>
            <CardContent className="space-y-2">
                <div className="flex gap-2 items-center">
                    <span className="flex-1">{memo.text}</span>
                    <Button variant="ghost" size="sm" onClick={() => setEditingMemo(memo)}>수정</Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteTargetMemo(memo)}>삭제</Button>
                </div>
                <ImagePreviewList images={images} size="md" />
            </CardContent>
        </Card>
    );
}
