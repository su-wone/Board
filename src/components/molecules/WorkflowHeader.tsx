interface Props {
  title: string;
  count: number;
}

export default function WorkflowHeader({ title, count }: Props) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-semibold">{title}</h2>
      <span className="text-xs text-gray-500">{count}</span>
    </div>
  );
}
