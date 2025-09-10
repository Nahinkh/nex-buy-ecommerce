"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AppProvider } from "@/context/AppContext";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <AppProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AppProvider>;
};
