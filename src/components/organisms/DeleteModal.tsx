"use client"

import { Memo } from "@/types/memo";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

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
                <Button variant="text" onClick={onClose}>취소</Button>
                <Button variant="danger" onClick={() => memo && onDelete(memo.id)}>삭제</Button>
            </div>
        </Modal>
    );
}
