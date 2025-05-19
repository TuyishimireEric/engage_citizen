import { useQuery } from "@tanstack/react-query";
import { FC_getDashboardData } from "./services";

export const useDashboardData = (options = {}) => {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: FC_getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  });
};