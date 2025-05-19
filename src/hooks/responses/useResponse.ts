import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { FC_getResponses } from "./services";

const useResponse = ({ complaintId }: { complaintId: string }) => {
  const queryClient = useQueryClient();

  const queryKey = ["Responses", complaintId];

  const query = useQuery({
    queryKey,
    queryFn: () => FC_getResponses({ complaintId }),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!complaintId,
  });

  useEffect(() => {
    const channelId = `realtime-responses-${complaintId}`;


    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Responses",
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
  }, [queryClient, complaintId]);

  return query;
};

export default useResponse;
