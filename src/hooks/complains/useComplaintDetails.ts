import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC_getComplaintDetails, FC_getComplaints } from "./services";
import { supabase } from "@/utils/supabase";

const useComplaintDetails = ({
  complaint_id,
  tracking_code,
}: {
  complaint_id?: string;
  tracking_code?: string;
}) => {
  const queryClient = useQueryClient();

  const queryKey = ["complaintDetails", complaint_id, tracking_code];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      FC_getComplaintDetails({
        complaint_id,
        tracking_code,
      }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    const channelId = `realtime-complaints-${complaint_id}-${tracking_code}`;

    console.log(
      "Setting up Supabase realtime subscription with channel:",
      channelId
    );

    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Complaints",
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
  }, [queryClient, complaint_id, tracking_code]);

  return query;
};

export default useComplaintDetails;
