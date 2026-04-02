"use client"

import { Memo } from "@/types/memo";
import MemoItem from "@/components/organisms/MemoItem";

interface MemoListProps {
    memos: Memo[];
    onEdit: (memo: Memo) => void;
    onDelete: (memo: Memo) => void;
}

export default function MemoList({ memos, onEdit, onDelete }: MemoListProps) {
    return (
        <ul className="space-y-4">
            {memos.map((memo) => (
                <MemoItem
                    key={memo.id}
                    memo={memo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
