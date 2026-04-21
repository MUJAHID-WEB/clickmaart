"use client";

import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

type SharedAppProvidersProps = {
  children: React.ReactNode;
  includeCart?: boolean;
};

export default function SharedAppProviders({
  children,
  includeCart = true,
}: SharedAppProvidersProps) {
  const content = <LanguageProvider>{children}</LanguageProvider>;

  if (!includeCart) {
    return content;
  }

  return <CartProvider>{content}</CartProvider>;
}
