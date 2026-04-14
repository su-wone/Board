import { Button } from "@/components/ui/button";

interface Props {
  sprintId: number | null;
}

export default function CardCreateInput({ sprintId }: Props) {
  void sprintId;
  return (
    <Button
      variant="outline"
      disabled
      className="w-full justify-start border-dashed text-muted-foreground"
    >
      + 카드 추가 (준비 중)
    </Button>
  );
}
