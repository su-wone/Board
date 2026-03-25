"use client"

import { useState, useEffect } from "react"
import MemoItem from "@/components/MemoItem";

const API_URL = "http://localhost:3000/memos";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // 페이지 로드 시 메모 목록 가져오기
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMemos(data));
  }, []);

  // 추가함수
  const addMemo = async () => {
    if (!input.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newMemo = await res.json();
    setMemos([...memos, newMemo]);
    setInput("");
  };

  // 삭제함수
  const deleteMemo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  // 수정 시작
  const startEdit = (memo) => {
    setEditingId(memo.id);
    setEditingText(memo.text);
  };

  // 수정 저장
  const saveEdit = async (id) => {
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
          />

        ))}
      </ul>
    </div>
  )
}