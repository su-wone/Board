"use client"

import { Memo } from "@/types/memo";
import MemoForm from "@/components/organisms/MemoForm";
import MemoList from "@/components/organisms/MemoList";
import EditModal from "@/components/organisms/EditModal";
import DeleteModal from "@/components/organisms/DeleteModal";

interface BoardTemplateProps {
    memos: Memo[];
    onAddMemo: (text: string, images: File[]) => void;
    onEditMemo: (memo: Memo) => void;
    onDeleteMemo: (memo: Memo) => void;
    editingMemo: Memo | null;
    onCloseEdit: () => void;
    onSaveEdit: (id: number, text: string) => void;
    onDeleteImage: (imageId: number) => void;
    onAddImages: (memoId: number, files: File[]) => void;
    deleteTargetMemo: Memo | null;
    onCloseDelete: () => void;
    onConfirmDelete: (id: number) => void;
}

export default function BoardTemplate({
    memos,
    onAddMemo,
    onEditMemo,
    onDeleteMemo,
    editingMemo,
    onCloseEdit,
    onSaveEdit,
    onDeleteImage,
    onAddImages,
    deleteTargetMemo,
    onCloseDelete,
    onConfirmDelete,
}: BoardTemplateProps) {
    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">게시판</h1>
            <MemoForm onSubmit={onAddMemo} />
            <MemoList memos={memos} onEdit={onEditMemo} onDelete={onDeleteMemo} />
            <EditModal
                memo={editingMemo}
                onClose={onCloseEdit}
                onSave={onSaveEdit}
                onDeleteImage={onDeleteImage}
                onAddImages={onAddImages}
            />
            <DeleteModal
                memo={deleteTargetMemo}
                onClose={onCloseDelete}
                onDelete={onConfirmDelete}
            />
        </div>
    );
}
