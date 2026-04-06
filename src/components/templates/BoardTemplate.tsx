"use client"

import MemoForm from "@/components/organisms/MemoForm";
import MemoList from "@/components/organisms/MemoList";
import EditModal from "@/components/organisms/EditModal";
import DeleteModal from "@/components/organisms/DeleteModal";

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
