"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchMemos } from "@/features/memo/api";
import MemoItem from "@/features/memo/components/MemoItem";

export default function MemoList() {
    const { data: memos = [], isLoading } = useQuery({
        queryKey: ["memos"],
        queryFn: fetchMemos,
    });

    if (isLoading) return <p>로딩 중...</p>;

    return (
        <ul className="space-y-4">
            {memos.map((memo) => (
                <MemoItem key={memo.id} memo={memo} />
            ))}
        </ul>
    );
}
