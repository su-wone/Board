import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  cardCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
  contentId: string;
}

export default function BacklogSectionHeader({
  cardCount,
  isCollapsed,
  onToggle,
  contentId,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
          aria-expanded={!isCollapsed}
          aria-controls={contentId}
        >
          <ChevronRight
            className={`transition-transform ${isCollapsed ? "" : "rotate-90"}`}
          />
        </Button>
        <h2 className="text-base font-semibold text-gray-900">백로그</h2>
      </div>
      <span className="text-xs text-gray-500">{cardCount} cards</span>
    </div>
  );
}