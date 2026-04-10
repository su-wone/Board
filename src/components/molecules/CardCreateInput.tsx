"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardStore } from "@/store";

interface Props {
  sprintId: number | null;
}

export default function CardCreateInput({ sprintId }: Props) {
  const addCard = useDashboardStore((s) => s.addCard);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed.length === 0) return;
    addCard({ title: trimmed, sprintId });
    setTitle("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitle("");
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start border-dashed text-muted-foreground"
      >
        + 카드 추가
      </Button>
    );
  }

  return (
    <Input
      ref={inputRef}
      type="text"
      value={title}
      placeholder="카드 제목 입력 후 Enter"
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        // 한글 등 IME 조합 중에 발생하는 Enter는 무시 (중복 제출 방지)
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
        }
      }}
      onBlur={handleClose}
    />
  );
}