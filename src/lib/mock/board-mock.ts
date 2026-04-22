import type {
  BacklogSection,
  Epic,
  Sprint,
  Ticket,
  User,
} from '@/types/board';

export const USERS: Record<string, User> = {
  L: { id: 'u-l', name: 'Lia', initial: 'L', avatarColor: '#dd5b00' },
  J: { id: 'u-j', name: 'Jun', initial: 'J', avatarColor: '#5b8def' },
  M: { id: 'u-m', name: 'Min', initial: 'M', avatarColor: '#615d59' },
  S: { id: 'u-s', name: 'Sun', initial: 'S', avatarColor: '#1aae39' },
};

export const EPICS: Record<string, Epic> = {
  feedPurchase: {
    id: 'e-feed-purchase',
    name: '고객이 피드 상품을 구매합니다',
    color: 'lavender',
  },
};

export const TICKETS: Ticket[] = [
  // TO DO
  {
    id: 'VEASLY-208',
    type: 'task',
    priority: 'high',
    status: 'TO DO',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title:
      '[호전] 관리자가 상품 중 부실 중 일부를 선택할 경우 수정을 못하실 수 있습니다.',
  },

  // READY FOR DEV
  {
    id: 'VEASLY-375',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR DEV',
    assignee: USERS.M,
    sprintId: 'sprint-7',
    dueWarning: '2026년 4월 15일',
    title: '판매소 관련 이메일 목록 복시 반영 것',
  },
  {
    id: 'VEASLY-434',
    type: 'task',
    priority: 'high',
    status: 'READY FOR DEV',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    dueWarning: '2026년 4월 14일',
    title: '고객인 판매도 오랜 모달 답숙 수 있는.',
  },

  // IN PROGRESS
  {
    id: 'VEASLY-452',
    type: 'task',
    priority: 'medium',
    status: 'IN PROGRESS',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    dueWarning: '2026년 4월 14일',
    title:
      '[FE] 주문 상세 페이지에서 고객 판매에 간편한 상세 다 인할 수 있습니다.',
  },
  {
    id: 'VEASLY-453',
    type: 'task',
    priority: 'medium',
    status: 'IN PROGRESS',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[BE] 주문 복시 API 수정',
  },
  {
    id: 'VEASLY-454',
    type: 'task',
    priority: 'medium',
    status: 'IN PROGRESS',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[BE] 주문 상세 API 수정',
  },
  {
    id: 'VEASLY-458',
    type: 'story',
    priority: 'low',
    status: 'IN PROGRESS',
    assignee: USERS.S,
    sprintId: 'sprint-7',
    title: 'AI 기반 기반 수업 업데이트 기능(변경 선배)',
  },

  // READY FOR QA
  {
    id: 'VEASLY-202',
    type: 'task',
    priority: 'high',
    status: 'READY FOR QA',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    epic: EPICS.feedPurchase,
    title: '고객이 판매도 오랜 상태를 확인할 수 있습니다.',
  },
  {
    id: 'VEASLY-441',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[BE] 판매도 오랜 수정 및 개발',
  },
  {
    id: 'VEASLY-442',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[FE] 판매도 오랜 모달 페이지 개선',
  },
  {
    id: 'VEASLY-443',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[FE] 판매도 오랜 모달 개선',
  },
  {
    id: 'VEASLY-456',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '[FE] 판매도 오랜 Quick Edit 모달',
  },
  {
    id: 'VEASLY-210',
    type: 'task',
    priority: 'high',
    status: 'READY FOR QA',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    epic: EPICS.feedPurchase,
    title: '고객인 판매를 오랜 취소 수 있습니다.',
  },

  // DONE
  {
    id: 'VEASLY-406',
    type: 'task',
    priority: 'high',
    status: 'DONE',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title: '[리시치] 오랜 이미지 저장 방식 개선 검토',
  },
  {
    id: 'VEASLY-430',
    type: 'task',
    priority: 'medium',
    status: 'DONE',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: 'server',
  },
  {
    id: 'VEASLY-436',
    type: 'task',
    priority: 'high',
    status: 'DONE',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title: '[BE] DashBoard schema 수정',
  },
  {
    id: 'VEASLY-457',
    type: 'task',
    priority: 'medium',
    status: 'DONE',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: 'API 수정',
  },
  {
    id: 'VEASLY-467',
    type: 'task',
    priority: 'medium',
    status: 'DONE',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: 'CORS 작시',
  },
  {
    id: 'VEASLY-420',
    type: 'task',
    priority: 'high',
    status: 'DONE',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title: '[부] Dashboard 생성',
  },
  {
    id: 'VEASLY-438',
    type: 'task',
    priority: 'medium',
    status: 'DONE',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '엑소니 할되냐 오랜다 간',
  },
  {
    id: 'VEASLY-106',
    type: 'task',
    priority: 'high',
    status: 'DONE',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title:
      '[X] 관리자는 백오피스에서 판매도 오랜의 하결 보낼 수정 및 결주 처리 할 수 있습니다.',
  },

  // Backlog section 1 — 스프린트 #7 extra tickets (not in TO DO~DONE columns above)
  {
    id: 'VEASLY-431',
    type: 'task',
    priority: 'high',
    status: 'READY FOR QA',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    dueWarning: '4월 14일',
    title: '고객이 판매도 오랜을 확인 수 있습니다.',
  },
  {
    id: 'VEASLY-201',
    type: 'task',
    priority: 'high',
    status: 'READY FOR QA',
    assignee: USERS.L,
    sprintId: 'sprint-7',
    title:
      '고객이 판매도 오랜이 가격이 모든 이례사 판매 오래이 일 시 메시지에 확인할 수 있습니다.',
  },
  {
    id: 'VEASLY-194',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '고객이 주문 복시 페이지에서 판매에 도움될 수 있습니다.',
  },
  {
    id: 'VEASLY-193',
    type: 'task',
    priority: 'medium',
    status: 'DONE',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title:
      '고객인 판매를 오랜 사이트서 일반도구 분다에서 확인할 수 있습니다.',
  },
  {
    id: 'VEASLY-433',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '고객이 판매도 오랜 관련 안내 및 FAQ를 확인할 수 있습니다.',
  },
  {
    id: 'VEASLY-460',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title: '구매대 판매 다본본도 시 포인트 자금 전 금액으로 측환되 이유',
  },
  {
    id: 'VEASLY-327',
    type: 'task',
    priority: 'medium',
    status: 'READY FOR QA',
    assignee: USERS.J,
    sprintId: 'sprint-7',
    title:
      '관리자가 모바일 엄청 복시 페이지 스위치 동사어 상품이 이의해 쉽게 확인할 수 있습니다.',
  },

  // Bugs
  {
    id: 'VEASLY-411',
    type: 'bug',
    priority: 'medium',
    status: 'TO DO',
    title:
      '[신택 선장 페이지] 상위 상품의 Add 방상 구메니 닦기러는 깃, 선택 기능이 있음',
  },
  {
    id: 'VEASLY-428',
    type: 'bug',
    priority: 'medium',
    status: 'TO DO',
    title: '[색은 선택 모디] 상위 사이즈  프로선언 선택 개기',
  },
  {
    id: 'VEASLY-440',
    type: 'bug',
    priority: 'medium',
    status: 'TO DO',
    title:
      '[상위 상세 페이지] 옵션 선택 완기 옵션 반다 Switch On 상태로 옵션 선택 시, Select 내지 반다가 없나 이판 옵션이 선택됐어도 인지자치 어려움',
  },
  {
    id: 'VEASLY-68',
    type: 'bug',
    priority: 'medium',
    status: 'TO DO',
    title: '변경/완료 리시 상세 페이지 비어있 주점 파닉가 보이지 않는 모상 수정',
  },

  // Backlog
  {
    id: 'VEASLY-23',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title:
      '고객이 저장값을 삼했한 결제 선행을 취소했을 경우 주시 저장값을 환보 받을 수 있습니다.',
  },
  {
    id: 'VEASLY-33',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title: '고객이 아니스 오랜 시 친부만 아이스를 수선할 수 있습니다.',
  },
  {
    id: 'VEASLY-35',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title: '상품 무세 25kg 초과 시 구메 금액 승을 오늘 수정',
  },
  {
    id: 'VEASLY-34',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title: '먼치버스커 그릴버 치기',
  },
  {
    id: 'VEASLY-39',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title:
      '고객이 주문 상세 페이지에서 관산사가 구메한 상품에서 오류를 발생했을 때 확인 요청을 할 수 있습니다.',
  },
  {
    id: 'VEASLY-44',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title: '비준이 컨나츠 에이시 상송 신기 수집',
  },
  {
    id: 'VEASLY-65',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title:
      '고객이 사진 생성할 선체터 등 성룸을 구매할 경우 우리 이에 에이시와 구메 전 구메 장수흠을 확인할 수 있습니다.',
  },
  {
    id: 'VEASLY-37',
    type: 'task',
    priority: 'medium',
    status: 'DESIGN IN PROGRESS',
    assignee: USERS.J,
    title: '고객 혜탁하는 도 특이 설립이 초간 설립평 상세히 인내열 수 있습니다.',
  },
  {
    id: 'VEASLY-45',
    type: 'task',
    priority: 'medium',
    status: 'DESIGN IN PROGRESS',
    assignee: USERS.J,
    title: '고객인 중고 시대 등 특이 성들의 특별한 인내열 수 있습니다.',
  },
  {
    id: 'VEASLY-42',
    type: 'task',
    priority: 'medium',
    status: 'TO DO',
    title: '일본 서비스 대상 폰트 변경 (LINE Seed 적용)',
  },
];

const SPRINT_7_TICKET_IDS = TICKETS.filter(
  (t) => t.sprintId === 'sprint-7',
).map((t) => t.id);

const BUG_TICKET_IDS = ['VEASLY-411', 'VEASLY-428', 'VEASLY-440', 'VEASLY-68'];

const BACKLOG_TICKET_IDS = [
  'VEASLY-23',
  'VEASLY-33',
  'VEASLY-35',
  'VEASLY-34',
  'VEASLY-39',
  'VEASLY-44',
  'VEASLY-65',
  'VEASLY-37',
  'VEASLY-45',
  'VEASLY-42',
];

export const SPRINTS: Sprint[] = [
  {
    id: 'sprint-7',
    name: '스프린트 #7',
    dateRange: '13. 4월 – 27. 4월',
    estimate: 24.5,
    ticketIds: SPRINT_7_TICKET_IDS,
    isActive: true,
  },
];

export const BACKLOG_SECTIONS: BacklogSection[] = [
  {
    id: 'section-sprint-7',
    title: '스프린트 #7',
    variant: 'active-sprint',
    ticketIds: SPRINT_7_TICKET_IDS,
    estimate: 24.5,
    dateRange: '13. 4월 – 27. 4월',
  },
  {
    id: 'section-bugs',
    title: '버그',
    variant: 'bugs',
    ticketIds: BUG_TICKET_IDS,
    estimate: 0,
  },
  {
    id: 'section-backlog',
    title: 'Backlog',
    variant: 'backlog',
    ticketIds: BACKLOG_TICKET_IDS,
  },
];
