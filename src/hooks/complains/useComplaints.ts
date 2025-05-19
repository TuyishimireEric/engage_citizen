import { useQuery } from "@tanstack/react-query";
import { FC_getComplaints } from "./services";

const useComplaints = ({
  page = 1,
  limit = 10,
  isPublic = true,
  search = "",
  enabled = true,
}: {
  page?: number;
  limit?: number;
  isPublic?: boolean;
  search?: string;
  enabled?: boolean;
}) => {
  const queryKey = ["complaints", page, limit, isPublic, search];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      FC_getComplaints({
        limit,
        page,
        isPublic,
        search,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled, 
  });

  return query;
};

export default useComplaints;