import axios from "axios";
import { Memo } from "@/features/memo/types";

const api = axios.create({
  baseURL: "http://localhost:3000/memos",
});

export const fetchMemos = async (): Promise<Memo[]> => {
  const { data } = await api.get("");
  return Array.isArray(data) ? data : [];
};

export const createMemo = async (text: string, images: File[]): Promise<Memo> => {
  const formData = new FormData();
  formData.append("text", text);
  images.forEach((file) => formData.append("images", file));

  const { data } = await api.post("", formData);
  return data;
};

export const updateMemo = async (id: number, text: string): Promise<Memo> => {
  const { data } = await api.patch(`/${id}`, { text });
  return data;
};

export const deleteMemoById = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};

export const deleteImageById = async (imageId: number): Promise<void> => {
  await api.delete(`/images/${imageId}`);
};

export const addImages = async (memoId: number, files: File[]): Promise<Memo> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await api.post(`/${memoId}/images`, formData);
  return data;
};
