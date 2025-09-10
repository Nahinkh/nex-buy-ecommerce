import { useAppContext } from "@/context/AppContext";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: (err: any) => {
        const { setError } = useAppContext();
        setError(err?.message || "Something went wrong");
      },
      onSettled: () => {
        const { setLoading } = useAppContext();
        setLoading(false);
      },
      onSuccess: () => {
        const { setLoading } = useAppContext();
        setLoading(false);
      },
      retry: false,
    },
  },
});