"use client";

import { RoleSessionProvider } from "@/providers/session/RoleSessionProvider";

export default function AdminSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleSessionProvider role="admin">{children}</RoleSessionProvider>;
}
