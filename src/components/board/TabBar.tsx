'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TabBarProps {
  activeSprintId?: number;
  className?: string;
}

interface Tab {
  label: string;
  href: string | null;
}

function buildTabs(activeSprintId?: number): Tab[] {
  const boardHref = '/';
  const backlogHref =
    activeSprintId !== undefined ? `/sprints/${activeSprintId}/backlog` : null;
  return [
    { label: '요약', href: null },
    { label: '타임라인', href: null },
    { label: '백로그', href: backlogHref },
    { label: '활성 스프린트', href: boardHref },
    { label: '캘린더', href: null },
    { label: '보고서', href: null },
    { label: '목록', href: null },
    { label: '양식', href: null },
    { label: '모든 업무', href: null },
    { label: '정보선드', href: null },
    { label: '개발', href: null },
    { label: '코드', href: null },
    { label: '보안', href: null },
    { label: '릴리스', href: null },
    { label: '메모', href: null },
  ];
}

function isTabActive(tab: Tab, pathname: string): boolean {
  if (tab.label === '백로그') return /^\/sprints\/\d+\/backlog$/.test(pathname);
  if (tab.label === '활성 스프린트') {
    return pathname === '/' || /^\/sprints\/\d+\/board$/.test(pathname);
  }
  return false;
}

export function TabBar({ activeSprintId, className }: TabBarProps) {
  const pathname = usePathname() ?? '';
  const tabs = buildTabs(activeSprintId);

  return (
    <nav
      className={cn('overflow-x-auto border-b border-border', className)}
    >
      <div className="flex min-w-max items-center gap-0 px-4">
        {tabs.map((tab) => {
          const active = isTabActive(tab, pathname);
          const baseClass = cn(
            'relative whitespace-nowrap px-2.5 py-2.5 text-sm transition-colors',
            active
              ? 'font-semibold text-foreground'
              : 'font-medium text-warm-600 hover:text-foreground',
          );

          const indicator = active ? (
            <span className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-newndy-blue" />
          ) : null;

          if (tab.href) {
            return (
              <Link key={tab.label} href={tab.href} className={baseClass}>
                {tab.label}
                {indicator}
              </Link>
            );
          }

          return (
            <button
              key={tab.label}
              type="button"
              disabled
              aria-disabled="true"
              className={cn(baseClass, 'cursor-not-allowed opacity-70')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
