interface Props {
  cardCount: number;
}

export default function BacklogSectionHeader({ cardCount }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <h2 className="text-base font-semibold text-gray-900">백로그</h2>
      <span className="text-xs text-gray-500">{cardCount} cards</span>
    </div>
  );
}