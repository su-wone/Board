"use client"

import { useState, useEffect, useRef } from "react"
import { Memo, MemoImage } from "@/types/memo";
import Modal from "@/components/Modal";

interface EditModalProps {
    memo: Memo | null;
    onClose: () => void;
    onSave: (id: number, text: string) => void;
    onDeleteImage: (imageId: number) => void;      // 기존 이미지 삭제
    onAddImages: (memoId: number, files: File[]) => void;  // 새 이미지 추가
}

export default function EditModal({ memo, onClose, onSave, onDeleteImage, onAddImages }: EditModalProps) {
    const [text, setText] = useState(memo?.text ?? "");
    const [newImages, setNewImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setText(memo?.text ?? "");
        setNewImages([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [memo]);

    const currentImageCount = (memo?.memoImages.length ?? 0);
    const maxNewImages = 5 - currentImageCount;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selected = Array.from(e.target.files);
        if (newImages.length + selected.length > maxNewImages) {
            alert(`이미지는 최대 5개까지 가능합니다. (현재 ${currentImageCount}개, 추가 가능 ${maxNewImages}개)`);
            return;
        }
        setNewImages([...newImages, ...selected]);
    };

    const removeNewImage = (index: number) => {
        setNewImages(newImages.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        if (!memo) return;
        onSave(memo.id, text);
        if (newImages.length > 0) {
            onAddImages(memo.id, newImages);
        }
    };

    return (
        <Modal isOpen={memo !== null} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4">메모 수정</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            {memo && memo.memoImages.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">기존 이미지</p>
                    <div className="flex gap-2 flex-wrap">
                        {memo.memoImages.map((img) => (
                            <div key={img.id} className="relative w-16 h-16">
                                <img src={img.url} alt={`memo-image-${img.id}`} className="w-full h-full object-cover rounded border" />
                                <button onClick={() => onDeleteImage(img.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs leading-none">x</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {maxNewImages > 0 && (
                <div className="mb-4">
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} className="text-sm" />
                    <p className="text-xs text-gray-400 mt-1">추가 가능: {maxNewImages - newImages.length}개</p>
                </div>
            )}

            {newImages.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    {newImages.map((file, index) => (
                        <div key={index} className="relative w-16 h-16">
                            <img src={URL.createObjectURL(file)} alt={`new-${index}`} className="w-full h-full object-cover rounded border" />
                            <button onClick={() => removeNewImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs leading-none">x</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700">취소</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">저장</button>
            </div>
        </Modal>
    )
}
