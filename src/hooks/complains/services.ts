import { ComplaintI } from "@/types/complaint";
import { supabase } from "@/utils/supabase";

export const FC_getComplaints = async ({
  limit = 10,
  page = 1,
  isPublic = true,
  search = "",
}: {
  limit?: number;
  page?: number;
  isPublic?: boolean;
  search?: string;
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from("Complaints")
      .select("*")
      .order("updated_at", { ascending: false })
      .range(from, to);

    // If search string is provided
    if (search && search.trim() !== "") {
      const isTrackingCodeFormat = /^TRK-\d{4}-\d{5}$/i.test(search.trim());

      if (isTrackingCodeFormat) {
        query = supabase
          .from("Complaints")
          .select("*")
          .ilike("tracking_code", `%${search.trim()}%`);
      } else {
        query = query.or(
          `title.ilike.%${search.trim()}%,description.ilike.%${search.trim()}%`
        );

        if (isPublic) {
          query = query.eq("is_public", true);
        }
      }
    } else if (isPublic) {
      query = query.eq("is_public", true);
    }

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

export const FC_createComplaint = async (complaintData: ComplaintI) => {
  const { data, error } = await supabase
    .from("Complaints")
    .insert([complaintData])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return { data, error };
};

export const FC_getComplaintDetails = async ({
  complaint_id,
  tracking_code,
}: {
  complaint_id?: string;
  tracking_code?: string;
}): Promise<ComplaintI> => {
  try {
    let query = supabase.from("Complaints").select("*");

    if (complaint_id) {
      query = query.eq("id", complaint_id);
    } else if (tracking_code) {
      query = query.eq("tracking_code", tracking_code);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data[0] as ComplaintI;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch complaints: ${error.message}`);
  }
};
