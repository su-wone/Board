"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCardAction } from "@/app/actions/cards";

const DEFAULT_WORKFLOW_ID = 1;

interface Props {
  sprintId: number | null;
}

export default function CardCreateInput({ sprintId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed.length === 0) return;
    startTransition(async () => {
      await createCardAction({
        title: trimmed,
        workflowId: DEFAULT_WORKFLOW_ID,
        sprintId,
      });
      setTitle("");
    });
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
      disabled={isPending}
      placeholder="카드 제목 입력 후 Enter"
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
          return;
        }
        if (e.key !== "Enter") return;
        if (e.nativeEvent.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        handleSubmit();
      }}
      onBlur={() => handleClose()}
    />
  );
}
