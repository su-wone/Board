"use client"

import { useState } from "react"

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
    <div>
      <h1>게시판</h1>

      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="내용을 입력하세요" />
        <button onClick={addMemo}>추가</button>
      </div>

      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            {editingId === memo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(memo.id)}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </>
            ) : (
              <>
                <span>{memo.text}</span>
                <button onClick={() => startEdit(memo)}>수정</button>
                <button onClick={() => deleteMemo(memo.id)}>삭제</button>
              </>
            )}
          </li>

        ))}
      </ul>
    </div>
  )
}