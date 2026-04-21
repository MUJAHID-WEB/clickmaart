"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SessionRole = "admin" | "wholesaler" | "retailer";
export type SessionStatus = "bootstrapping" | "guest" | "authenticated";

type RoleSessionContextValue = {
  role: SessionRole;
  status: SessionStatus;
  isReady: boolean;
};

const RoleSessionContext = createContext<RoleSessionContextValue | undefined>(
  undefined,
);

type RoleSessionProviderProps = {
  role: SessionRole;
  children: React.ReactNode;
};

export function RoleSessionProvider({
  role,
  children,
}: RoleSessionProviderProps) {
  const [status, setStatus] = useState<SessionStatus>("bootstrapping");

  useEffect(() => {
    setStatus("guest");
  }, []);

  const value = useMemo<RoleSessionContextValue>(
    () => ({
      role,
      status,
      isReady: status !== "bootstrapping",
    }),
    [role, status],
  );

  return (
    <RoleSessionContext.Provider value={value}>
      {children}
    </RoleSessionContext.Provider>
  );
}

export const useRoleSession = () => {
  const context = useContext(RoleSessionContext);

  if (!context) {
    throw new Error("useRoleSession must be used within a RoleSessionProvider");
  }

  return context;
};
