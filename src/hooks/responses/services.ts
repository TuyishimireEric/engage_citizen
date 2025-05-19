import { ResponseI } from "@/types/complaint";
import { supabase } from "@/utils/supabase";

export const FC_addResponses = async (response: {
  complaint_id: string;
  status: string;
  message: string;
  responded_by: string;
}) => {
  const query = supabase.from("Responses").insert([response]);

  const { data, error } = await query;

  await supabase
    .from("Complaints")
    .update({ status: response.status })
    .eq("id", response.complaint_id);

  if (error && typeof error.message === "string") {
    throw new Error(error.message);
  } else if (error) {
    throw new Error("An unknown error occurred");
  }

  return { data, error };
};

export const FC_getResponses = async ({
  complaintId,
}: {
  complaintId: string;
}): Promise<ResponseI[]> => {
  try {
    const query = supabase
      .from("Responses")
      .select(
        `
    *,
    Profiles:responded_by (
      full_name
    )
  `
      )
      .eq("complaint_id", complaintId)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch complaints: ${error.message}`);
  }
};
