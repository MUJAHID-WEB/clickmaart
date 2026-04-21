import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ClickMaart",
  description: "ClickMaart multi-role commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      >
        {children}
      </body>
    </html>
  );
}
