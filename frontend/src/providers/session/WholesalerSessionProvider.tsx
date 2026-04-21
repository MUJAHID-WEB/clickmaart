"use client";

import { RoleSessionProvider } from "@/providers/session/RoleSessionProvider";

export default function WholesalerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleSessionProvider role="wholesaler">{children}</RoleSessionProvider>
  );
}
