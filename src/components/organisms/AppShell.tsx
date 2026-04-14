"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Search,
  FolderKanban,
  Settings,
  Plus,
  Kanban,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox", href: "/inbox", icon: Inbox },
  { label: "Search", href: "/search", icon: Search },
  { label: "Projects", href: "/", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
];

function resolvePageTitle(pathname: string): string {
  if (pathname === "/") return "Backlog";
  if (pathname.startsWith("/sprints")) return "Sprint Board";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/inbox")) return "Inbox";
  if (pathname.startsWith("/search")) return "Search";
  if (pathname.startsWith("/settings")) return "Settings";
  return "";
}

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const title = resolvePageTitle(pathname);

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="BOARD">
                <Link href="/">
                  <Kanban />
                  <span className="text-base font-semibold tracking-wide">
                    BOARD
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/" || pathname.startsWith("/sprints")
                      : pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-sm font-semibold">{title}</h1>
          <div className="flex-1" />
          <div className="w-72">
            <Input placeholder="Search…" className="h-9" />
          </div>
          <Button size="icon" aria-label="Create issue">
            <Plus />
          </Button>
          <div className="size-9 shrink-0 rounded-full bg-muted" />
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
