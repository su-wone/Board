interface Props {
  startDate: string;
  endDate: string;
}

const fmt = (iso: string) => {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export default function SprintDateRange({ startDate, endDate }: Props) {
  return (
    <span className="text-xs text-gray-500">
      {fmt(startDate)} ~ {fmt(endDate)}
    </span>
  );
}
