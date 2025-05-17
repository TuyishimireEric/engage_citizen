import { useQuery } from "@tanstack/react-query";
import { FC_getCategories } from "./services";

export default function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: FC_getCategories,
    staleTime: 1000 * 60 * 60 * 3, // 3 hours
  });

  return { data, isLoading, error };
}
