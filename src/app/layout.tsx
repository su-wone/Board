import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Board",
  description: "게시판",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
