"use client"

import { useState } from "react"
import MemoItem from "@/components/MemoItem";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // 추가함수
  const addMemo = () => {
    if (!input.trim()) return;
    setMemos([...memos, { id: Date.now(), text: input }]);
    setInput("");
  };

  // 삭제함수
  const deleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  // 수정 시작
  const startEdit = (memo) => {
    setEditingId(memo.id);
    setEditingText(memo.text);
  };

  // 수정 저장
  const saveEdit = (id) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id ? { ...memo, text: editingText } : memo
      )
    );
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