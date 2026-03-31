"use client"

import { Memo } from "@/types/memo";

interface MemoItemProps {
    memo: Memo;
    deleteMemo: (memo: Memo) => void;
    startEdit: (memo: Memo) => void;
}

export default function MemoItem({
    memo,
    deleteMemo,
    startEdit
}: MemoItemProps) {
    return (
        <li className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex gap-2">
                <span className="flex-1">{memo.text}</span>
                <button onClick={() => startEdit(memo)} className="text-blue-500 hover:text-blue-700">수정</button>
                <button onClick={() => deleteMemo(memo)}>삭제</button>
            </div>

            {memo.memoImages.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {memo.memoImages.map((img) => (
                        <div key={img.id} className="relative w-20 h-20">
                            <img
                                src={img.url}
                                alt={`memo-image-${img.id}`}
                                className="w-full h-full object-cover rounded border"
                            />
                        </div>
                    ))}
                </div>
            )}
        </li>
    )
}
