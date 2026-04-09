"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModalStore } from "@/features/memo/store";
import { deleteMemoById } from "@/features/memo/api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteModal() {
    const queryClient = useQueryClient();
    const { deleteTargetMemo, setDeleteTargetMemo } = useModalStore();

    const { mutate: deleteMemo } = useMutation({
        mutationFn: deleteMemoById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["memos"] });
            setDeleteTargetMemo(null);
            toast.success("메모가 삭제되었습니다");
        },
        onError: () => toast.error("메모 삭제 실패"),
    });

    return (
        <AlertDialog
            open={deleteTargetMemo !== null}
            onOpenChange={(open) => !open && setDeleteTargetMemo(null)}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>메모 삭제</AlertDialogTitle>
                    <AlertDialogDescription>정말 삭제하시겠습니까?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteTargetMemo && deleteMemo(deleteTargetMemo.id)}
                    >
                        삭제
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
