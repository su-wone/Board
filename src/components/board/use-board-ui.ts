'use client';

import { useContext } from 'react';
import { BoardUIContext } from './AppShell';

export function useBoardUI() {
  const ctx = useContext(BoardUIContext);
  if (!ctx) throw new Error('useBoardUI must be inside <AppShell/>');
  return ctx;
}
