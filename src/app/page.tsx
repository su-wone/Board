"use client"

import { useState, useEffect } from "react"
import MemoItem from "@/components/MemoItem";
import { Memo } from "@/types/memo";


const API_URL = "http://localhost:3000/memos";

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  // 페이지 로드 시 메모 목록 가져오기
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMemos(Array.isArray(data) ? data : []));
  }, []);

  // 추가함수
  const addMemo = async () => {
    if (!input.trim()) return;
    const formData = new FormData();
    formData.append("text", input);
    images.forEach((file) => formData.append("images", file));

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,  // Content-Type 헤더를 직접 설정하면 안 됨! 브라우저가 자동으로 boundary를 설정해줌
    });
    const newMemo = await res.json();
    setMemos([...memos, newMemo]);
    setInput("");
    setImages([]);
  };

  // 삭제함수
  const deleteMemo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  // 수정 시작
  const startEdit = (memo: Memo) => {
    setEditingId(memo.id);
    setEditingText(memo.text);
  };

  // 수정 저장
  const saveEdit = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingText }),
    });
    const updated = await res.json();
    setMemos(memos.map((memo) => (memo.id === id ? updated : memo)));
    setEditingId(null);
    setEditingText("");
  };

  // 이미지 삭제
  const deleteImage = async (imageId: number) => {
    await fetch(`${API_URL}/images/${imageId}`, { method: "DELETE" });
    setMemos(memos.map((memo) => ({
      ...memo,
      memoImages: memo.memoImages.filter((img) => img.id !== imageId),
    })));
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">게시판</h1>

      <div className="flex gap-2 mb-6">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="내용을 입력하세요" className="flex-1 border border-gray-300 rounded px-3 py-2" />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />
        <button onClick={addMemo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">추가</button>
      </div>

      <ul className="space-y-2">
        {memos.map((memo) => (
          <MemoItem
            key={memo.id}
            memo={memo}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            deleteMemo={deleteMemo}
            deleteImage={deleteImage}
          />

        ))}
      </ul>
    </div>
  )
}