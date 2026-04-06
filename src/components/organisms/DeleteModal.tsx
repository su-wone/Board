"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/store/modalStore";
import { deleteMemoById } from "@/api/memoApi";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

export default function DeleteModal() {
    const queryClient = useQueryClient();
    const { deleteTargetMemo, setDeleteTargetMemo } = useModalStore();

    const { mutate: deleteMemo } = useMutation({
        mutationFn: deleteMemoById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            setDeleteTargetMemo(null);
        },
    });

    return (
        <Modal isOpen={deleteTargetMemo !== null} onClose={() => setDeleteTargetMemo(null)}>
            <h2 className="text-lg font-bold mb-4">메모 삭제</h2>
            <p className="mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-2">
                <Button variant="text" onClick={() => setDeleteTargetMemo(null)}>취소</Button>
                <Button variant="danger" onClick={() => deleteTargetMemo && deleteMemo(deleteTargetMemo.id)}>삭제</Button>
            </div>
        </Modal>
    );
}
