"use client";

import { useUser } from "@/modules/user/hooks/useUser";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useContext } from "react";
// import "@/lib/process-refresh";

const queryClient = new QueryClient();

const UserContext = createContext<UseQueryResult<any, Error> | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const userQuery = useUser();
  return (
    <UserContext.Provider value={userQuery}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}

export { queryClient };
