import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60
    }
  }
});
export const ProviderQuery = ({ children }: QueryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
interface QueryProps {
  children: ReactNode;
}
