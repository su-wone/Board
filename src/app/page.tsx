"use client"

import { useState, useEffect, useRef } from "react"
import MemoItem from "@/components/MemoItem";
import { Memo } from "@/types/memo";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";

const API_URL = "http://localhost:3000/memos";

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [input, setInput] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [deleteTargetMemo, setDeleteTargetMemo] = useState<Memo | null>(null);

  // 페이지 로드 시 메모 목록 가져오기
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMemos(data));
  }, []);

  // 이미지 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const total = images.length + selected.length;
    if (total > 5) {
      alert("이미지는 최대 5개까지 가능합니다.");
      return;
    }
    setImages([...images, ...selected]);
  };

  // 선택한 이미지 제거 (업로드 전)
  const removeSelectedImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 추가함수
  const addMemo = async () => {
    if (!input.trim() && images.length === 0) return;

    const formData = new FormData();
    formData.append("text", input);
    images.forEach((file) => formData.append("images", file));

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    const newMemo = await res.json();
    setMemos([...memos, newMemo]);
    setInput("");
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  // 삭제함수
  const deleteMemo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMemos(memos.filter((memo) => memo.id !== id));
    setDeleteTargetMemo(null);
  };

  // 이미지 삭제
  const deleteImage = async (imageId: number) => {
    await fetch(`${API_URL}/images/${imageId}`, { method: "DELETE" });
    setMemos(memos.map((memo) => ({
      ...memo,
      memoImages: memo.memoImages.filter((img) => img.id !== imageId),
    })));
    // 수정 모달이 열려있으면 editingMemo도 업데이트
    if (editingMemo) {
      setEditingMemo({
        ...editingMemo,
        memoImages: editingMemo.memoImages.filter((img) => img.id !== imageId),
      });
    }
  };

  // 기존 메모에 이미지 추가
  const addImages = async (memoId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const res = await fetch(`${API_URL}/${memoId}/images`, {
      method: "POST",
      body: formData,
    });
    const updated = await res.json();
    setMemos(memos.map((memo) => (memo.id === memoId ? updated : memo)));
  };

  const openEditModal = (memo: Memo) => {
    setEditingMemo(memo);
  };

  const openDeleteModal = (memo: Memo) => {
    setDeleteTargetMemo(memo);
  };

  const saveEdit = async (id: number, text: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    setMemos(memos.map((memo) => (memo.id === id ? { ...memo, ...updated } : memo)));
    setEditingMemo(null);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">게시판</h1>

      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="내용을 입력하세요" className="flex-1 border border-gray-300 rounded px-3 py-2" />
          <button onClick={addMemo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">추가</button>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">최대 5개 이미지 ({images.length}/5)</p>
        </div>

        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((file, index) => (
              <div key={index} className="relative w-16 h-16">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  onClick={() => removeSelectedImage(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs leading-none"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className="space-y-4">
        {memos.map((memo) => (
          <MemoItem
            key={memo.id}
            memo={memo}
            startEdit={openEditModal}
            deleteMemo={openDeleteModal}
          />
        ))}
      </ul>
      <EditModal
        memo={editingMemo}
        onClose={() => setEditingMemo(null)}
        onSave={saveEdit}
        onDeleteImage={deleteImage}
        onAddImages={addImages}
      />
      <DeleteModal
        memo={deleteTargetMemo}
        onClose={() => setDeleteTargetMemo(null)}
        onDelete={deleteMemo}
      />
    </div>
  )
}