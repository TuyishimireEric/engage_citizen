import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC_getComplaints } from "./services";
import { supabase } from "@/utils/supabase";

const useComplaints = ({
  page = 1,
  limit = 10,
  isPublic = true,
}: {
  page?: number;
  limit?: number;
  isPublic?: boolean;
}) => {
  const queryClient = useQueryClient();
  
  const queryKey = ["complaints", page, limit, isPublic];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      FC_getComplaints({
        limit,
        page,
        isPublic,
      }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    const channelId = `realtime-complaints-${page}-${limit}-${isPublic}`;
    
    console.log("Setting up Supabase realtime subscription with channel:", channelId);
    
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Complaints",
          filter: isPublic ? 'is_public=eq.true' : undefined,
        },
        (payload) => {
          console.log("Change received:", payload);
          
          queryClient.invalidateQueries({ queryKey });
        }
      )
      .subscribe((status) => {
        console.log("Supabase realtime subscription status:", status);
      });

    return () => {
      console.log("Cleaning up Supabase realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient, page, limit, isPublic]); 

  return query;
};

export default useComplaints;