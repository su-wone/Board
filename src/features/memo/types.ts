export interface MemoImage {
    id: number;
    url: string;
    order: number;
    memoId: number;
}

export interface Memo {
    id: number;
    text: string;
    memoImages: MemoImage[];
}