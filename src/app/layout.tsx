import "./globals.css";


export const metadata = {
  title: "Board",
  description: "게시판",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
