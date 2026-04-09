"use client"

import MemoForm from "@/features/memo/components/MemoForm";
import MemoList from "@/features/memo/components/MemoList";
import EditModal from "@/features/memo/components/EditModal";
import DeleteModal from "@/features/memo/components/DeleteModal";

export default function BoardTemplate() {
    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">게시판</h1>
            <MemoForm />
            <MemoList />
            <EditModal />
            <DeleteModal />
        </div>
    );
}
