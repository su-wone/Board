import { Card } from "@/types/card";

const base = {
  assigneeId: null,
  reporterId: null,
  parentId: null,
  description: null,
  dueDate: null,
} as const;

export const mockCards: Card[] = [
  { ...base, id: 1, key: "BOARD-1", title: "로그인 페이지 만들기", type: "TASK", workflowId: 1, sprintId: 2, priority: "HIGH", order: 1, storyPoint: 5 },
  { ...base, id: 2, key: "BOARD-2", title: "회원가입 API 연동", type: "TASK", workflowId: 1, sprintId: 2, priority: "MEDIUM", order: 2, storyPoint: 3 },
  { ...base, id: 3, key: "BOARD-3", title: "랜딩 페이지 문구 수정", type: "TASK", workflowId: 1, sprintId: 2, priority: "LOW", order: 3, storyPoint: null },
  { ...base, id: 4, key: "BOARD-4", title: "JWT 토큰 갱신 로직", type: "TASK", workflowId: 2, sprintId: 2, priority: "HIGH", order: 1, storyPoint: 8 },
  { ...base, id: 5, key: "BOARD-5", title: "유저 프로필 조회 API", type: "TASK", workflowId: 2, sprintId: 2, priority: "MEDIUM", order: 2, storyPoint: 2 },
  { ...base, id: 6, key: "BOARD-6", title: "비밀번호 재설정 메일", type: "TASK", workflowId: 3, sprintId: 2, priority: "MEDIUM", order: 1, storyPoint: 3 },
  { ...base, id: 7, key: "BOARD-7", title: "회원 약관 페이지", type: "TASK", workflowId: 4, sprintId: 2, priority: "LOW", order: 1, storyPoint: 1 },
  { ...base, id: 8, key: "BOARD-8", title: "헤더 컴포넌트 분리", type: "TASK", workflowId: 4, sprintId: 2, priority: "LOW", order: 2, storyPoint: 2 },

  { ...base, id: 9,  key: "BOARD-9",  title: "칸반 보드 페이지",      type: "STORY", workflowId: 1, sprintId: 3, priority: "HIGH", order: 1, storyPoint: 8 },
  { ...base, id: 10, key: "BOARD-10", title: "스프린트 목록 페이지",  type: "STORY", workflowId: 1, sprintId: 3, priority: "HIGH", order: 2, storyPoint: 5 },

  { ...base, id: 11, key: "BOARD-11", title: "다크 모드 지원",        type: "STORY", workflowId: 1, sprintId: null, priority: "LOW",    order: 1, storyPoint: 3 },
  { ...base, id: 12, key: "BOARD-12", title: "알림 설정 페이지",      type: "STORY", workflowId: 1, sprintId: null, priority: "MEDIUM", order: 2, storyPoint: 5 },
  { ...base, id: 13, key: "BOARD-13", title: "검색 기능 추가",        type: "STORY", workflowId: 1, sprintId: null, priority: "MEDIUM", order: 3, storyPoint: 8 },
];
