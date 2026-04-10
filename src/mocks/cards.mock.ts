import { Card } from "@/types/card";

export const mockCards: Card[] = [
  { id: 1, key: "BOARD-1", title: "로그인 페이지 만들기", type: "task", workflowId: 1, sprintId: 2, priority: "high", order: 1, storyPoint: 5 },
  { id: 2, key: "BOARD-2", title: "회원가입 API 연동", type: "task", workflowId: 1, sprintId: 2, priority: "medium", order: 2, storyPoint: 3 },
  { id: 3, key: "BOARD-3", title: "랜딩 페이지 문구 수정", type: "task", workflowId: 1, sprintId: 2, priority: "low", order: 3 },
  { id: 4, key: "BOARD-4", title: "JWT 토큰 갱신 로직", type: "task", workflowId: 2, sprintId: 2, priority: "high", order: 1, storyPoint: 8 },
  { id: 5, key: "BOARD-5", title: "유저 프로필 조회 API", type: "task", workflowId: 2, sprintId: 2, priority: "medium", order: 2, storyPoint: 2 },
  { id: 6, key: "BOARD-6", title: "비밀번호 재설정 메일", type: "task", workflowId: 3, sprintId: 2, priority: "medium", order: 1, storyPoint: 3 },
  { id: 7, key: "BOARD-7", title: "회원 약관 페이지", type: "task", workflowId: 4, sprintId: 2, priority: "low", order: 1, storyPoint: 1 },
  { id: 8, key: "BOARD-8", title: "헤더 컴포넌트 분리", type: "task", workflowId: 4, sprintId: 2, priority: "low", order: 2, storyPoint: 2 },

  { id: 9,  key: "BOARD-9",  title: "칸반 보드 페이지",      type: "story", workflowId: 1, sprintId: 3, priority: "high", order: 1, storyPoint: 8 },
  { id: 10, key: "BOARD-10", title: "스프린트 목록 페이지",  type: "story", workflowId: 1, sprintId: 3, priority: "high", order: 2, storyPoint: 5 },

  // Backlog (sprintId: null) — 아직 스프린트에 배정되지 않은 카드들
  { id: 11, key: "BOARD-11", title: "다크 모드 지원",        type: "story", workflowId: 1, sprintId: null, priority: "low",    order: 1, storyPoint: 3 },
  { id: 12, key: "BOARD-12", title: "알림 설정 페이지",      type: "story", workflowId: 1, sprintId: null, priority: "medium", order: 2, storyPoint: 5 },
  { id: 13, key: "BOARD-13", title: "검색 기능 추가",        type: "story", workflowId: 1, sprintId: null, priority: "medium", order: 3, storyPoint: 8 },
];