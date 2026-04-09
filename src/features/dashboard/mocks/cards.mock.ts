import { Card } from "@/features/dashboard/types/card";

export const mockCards: Card[] = [
  { id: 1, key: "BOARD-1", title: "로그인 페이지 만들기", workflowId: 1, sprintId: 2, priority: "high", order: 1, storyPoint: 5 },
  { id: 2, key: "BOARD-2", title: "회원가입 API 연동", workflowId: 1, sprintId: 2, priority: "medium", order: 2, storyPoint: 3 },
  { id: 3, key: "BOARD-3", title: "랜딩 페이지 문구 수정", workflowId: 1, sprintId: 2, priority: "low", order: 3 },
  { id: 4, key: "BOARD-4", title: "JWT 토큰 갱신 로직", workflowId: 2, sprintId: 2, priority: "high", order: 1, storyPoint: 8 },
  { id: 5, key: "BOARD-5", title: "유저 프로필 조회 API", workflowId: 2, sprintId: 2, priority: "medium", order: 2, storyPoint: 2 },
  { id: 6, key: "BOARD-6", title: "비밀번호 재설정 메일", workflowId: 3, sprintId: 2, priority: "medium", order: 1, storyPoint: 3 },
  { id: 7, key: "BOARD-7", title: "회원 약관 페이지", workflowId: 4, sprintId: 2, priority: "low", order: 1, storyPoint: 1 },
  { id: 8, key: "BOARD-8", title: "헤더 컴포넌트 분리", workflowId: 4, sprintId: 2, priority: "low", order: 2, storyPoint: 2 },

  { id: 9,  key: "BOARD-9",  title: "칸반 보드 페이지",      workflowId: 1, sprintId: 3, priority: "high",   order: 1, storyPoint: 8 },
  { id: 10, key: "BOARD-10", title: "스프린트 목록 페이지",  workflowId: 1, sprintId: 3, priority: "high",   order: 2, storyPoint: 5 },
];
