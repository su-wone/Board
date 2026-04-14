interface Props {
  assigneeId: number | null;
}

export default function AssigneeAvatar({ assigneeId }: Props) {
  if (assigneeId === null) {
    return (
      <div
        aria-label="Unassigned"
        className="size-6 shrink-0 rounded-full border border-dashed border-gray-300"
      />
    );
  }
  return (
    <div
      aria-label={`Assignee #${assigneeId}`}
      className="size-6 shrink-0 rounded-full bg-gray-300"
    />
  );
}
