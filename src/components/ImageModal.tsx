"use client"

import { MemoImage } from "@/types/memo";


interface ImageModalProps {
    images: MemoImage[];       // 보여줄 이미지 배열
    selectedIndex: number;     // 현재 보고 있는 이미지 인덱스
    onClose: () => void;       // 모달 닫기 함수
    onDelete: (imageId: number) => void;  // 이미지 삭제 함수
}

export default function ImageModal({ images, selectedIndex, onClose, onDelete }: ImageModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2">
                <img
                    src={images[selectedIndex].url}
                    alt=""
                    className="max-w-[90vw] max-h-[80vh] object-contain rounded"
                />
                <button
                    onClick={() => onDelete(images[selectedIndex].id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}