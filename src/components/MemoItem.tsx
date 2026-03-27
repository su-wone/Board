"use client"

import { Memo } from "@/types/memo";

// MemoItem이 받는 props의 타입 정의
interface MemoItemProps {
    memo: Memo;
    editingId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    saveEdit: (id: number) => void;
    cancelEdit: () => void;
    deleteMemo: (id: number) => void;
    startEdit: (memo: Memo) => void;
}

export default function MemoItem({
    memo,
    editingId,
    editingText,
    setEditingText,
    saveEdit,
    cancelEdit,
    deleteMemo,
    startEdit,
}: MemoItemProps) {
    return (
        <li className="flex gap-2">
            {editingId === memo.id ? (
                <>
                    <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-2 py-1"
                    />
                    <button onClick={() => saveEdit(memo.id)} className="text-green-600 hover:text-green-800">저장</button>
                    <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">취소</button>
                </>
            ) : (
                <>
                    <span className="flex-1">{memo.text}</span>
                    <button onClick={() => startEdit(memo)} className="text-blue-500 hover:text-blue-700">수정</button>
                    <button onClick={() => deleteMemo(memo.id)} className="text-red-500 hover:text-red-700">삭제</button>
                </>
            )}
        </li>
    )
}
