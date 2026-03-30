"use client"

import { useState } from "react";
import { Memo } from "@/types/memo";
import ImageModal from "@/components/ImageModal";

// MemoItem이 받는 props의 타입 정의
interface MemoItemProps {
    memo: Memo;
    editingId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    saveEdit: (id: number) => void;
    cancelEdit: () => void;
    deleteMemo: (id: number) => void;
    deleteImage: (imageId: number) => void;
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
    deleteImage,
    startEdit,
}: MemoItemProps) {
    const [modalIndex, setModalIndex] = useState<number | null>(null);

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
                    <div className="flex-1">
                        <span>{memo.text}</span>
                        {memo.memoImages.length > 0 && (
                            <div className="flex gap-1 mt-1">
                                {memo.memoImages.map((image, index) => (
                                    <img
                                        key={image.id}
                                        src={image.url}
                                        alt=""
                                        className="w-16 h-16 object-cover rounded cursor-pointer"
                                        onClick={() => setModalIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => startEdit(memo)} className="text-blue-500 hover:text-blue-700">수정</button>
                    <button onClick={() => deleteMemo(memo.id)} className="text-red-500 hover:text-red-700">삭제</button>
                </>
            )}
            {modalIndex !== null && (
                <ImageModal
                    images={memo.memoImages}
                    selectedIndex={modalIndex}
                    onClose={() => setModalIndex(null)}
                    onDelete={(imageId) => {
                        deleteImage(imageId);
                        setModalIndex(null);
                    }}
                />
            )}
        </li>
    )
}
