"use client"

import { Memo } from "@/types/memo";
import Modal from "@/components/Modal";

interface DeleteModalProps {
    memo: Memo | null;
    onClose: () => void;
    onDelete: (id: number) => void;
}

export default function DeleteModal({ memo, onClose, onDelete }: DeleteModalProps) {
    return (
        <Modal isOpen={memo !== null} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">메모 삭제</h2>
            <p className="mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700">취소</button>
                <button onClick={() => memo && onDelete(memo.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
            </div>
        </Modal>
    )
}
