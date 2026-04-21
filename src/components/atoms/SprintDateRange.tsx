interface Props {
  startDate: string | null;
  endDate: string | null;
}

const fmt = (iso: string) => {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export default function SprintDateRange({ startDate, endDate }: Props) {
  if (!startDate || !endDate) return null;

  return (
    <span className="text-xs text-gray-500">
      {fmt(startDate)} ~ {fmt(endDate)}
    </span>
  );
}
