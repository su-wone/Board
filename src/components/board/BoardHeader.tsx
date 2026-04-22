interface BoardHeaderProps {
  spaceName?: string;
  boardName?: string;
}

export function BoardHeader({
  spaceName = 'veasly',
  boardName = 'VEASLY Board',
}: BoardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 px-6 pb-3 pt-4">
      <div className="text-xs text-warm-400">스페이스 / {spaceName}</div>
      <div className="flex items-center gap-2">
        <h1 className="text-[26px] font-bold leading-tight tracking-[-0.625px]">
          {boardName}
        </h1>
        <span className="rounded-md bg-warm-50 px-2 py-0.5 text-xs font-medium text-warm-600">
          보드
        </span>
      </div>
    </div>
  );
}
