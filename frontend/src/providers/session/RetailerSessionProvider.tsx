"use client";

import { RoleSessionProvider } from "@/providers/session/RoleSessionProvider";

export default function RetailerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleSessionProvider role="retailer">{children}</RoleSessionProvider>;
}
