import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/organisms/AppShell";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Board",
  description: "게시판",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        <TooltipProvider>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
