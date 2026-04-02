"use client"

import { useState, useEffect } from "react"
import { Memo } from "@/types/memo";
import BoardTemplate from "@/components/templates/BoardTemplate";

const API_URL = "http://localhost:3000/memos";

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [deleteTargetMemo, setDeleteTargetMemo] = useState<Memo | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMemos(Array.isArray(data) ? data : []));
  }, []);

  const addMemo = async (text: string, images: File[]) => {
    const formData = new FormData();
    formData.append("text", text);
    images.forEach((file) => formData.append("images", file));

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    const newMemo = await res.json();
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMemos(memos.filter((memo) => memo.id !== id));
    setDeleteTargetMemo(null);
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

  const deleteImage = async (imageId: number) => {
    await fetch(`${API_URL}/images/${imageId}`, { method: "DELETE" });
    setMemos(memos.map((memo) => ({
      ...memo,
      memoImages: memo.memoImages.filter((img) => img.id !== imageId),
    })));
    if (editingMemo) {
      setEditingMemo({
        ...editingMemo,
        memoImages: editingMemo.memoImages.filter((img) => img.id !== imageId),
      });
    }
  };

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

  return (
    <BoardTemplate
      memos={memos}
      onAddMemo={addMemo}
      onEditMemo={setEditingMemo}
      onDeleteMemo={setDeleteTargetMemo}
      editingMemo={editingMemo}
      onCloseEdit={() => setEditingMemo(null)}
      onSaveEdit={saveEdit}
      onDeleteImage={deleteImage}
      onAddImages={addImages}
      deleteTargetMemo={deleteTargetMemo}
      onCloseDelete={() => setDeleteTargetMemo(null)}
      onConfirmDelete={deleteMemo}
    />
  );
}
