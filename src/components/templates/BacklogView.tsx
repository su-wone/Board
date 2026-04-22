'use client';

import type { BacklogSection as BacklogSectionType, Ticket } from '@/types/board';
import { BacklogSection } from '../organisms/BacklogSection';

interface BacklogViewProps {
  sections: BacklogSectionType[];
  tickets: Ticket[];
}

export function BacklogView({ sections, tickets }: BacklogViewProps) {
  return (
    <div className="px-6 py-4">
      {sections.map((section) => {
        const sectionTickets = section.ticketIds
          .map((id) => tickets.find((t) => t.id === id))
          .filter((t): t is Ticket => t !== undefined);
        return (
          <BacklogSection
            key={section.id}
            section={section}
            tickets={sectionTickets}
          />
        );
      })}
    </div>
  );
}
