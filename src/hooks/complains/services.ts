import { ComplaintI } from "@/types/complaint";
import { supabase } from "@/utils/supabase";

export const FC_getComplaints = async ({
  limit = 10,
  page = 1,
  isPublic = true,
}: {
  limit?: number;
  page?: number;
  isPublic?: boolean;
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from("Complaints")
      .select("*")
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (isPublic) {
      query = query.eq("is_public", true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err: any) {
    console.error("Error fetching complaints:", err);
    throw new Error(`Failed to fetch complaints: ${err.message}`);
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

export const FC_updateComplaint = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from("Complaints")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    console.log("Updated complaint:", data);
    return data;
  } catch (err: any) {
    console.error("Error updating complaint:", err);
    throw new Error(`Failed to update complaint: ${err.message}`);
  }
};

export const FC_getComplaintDetails = async ({
  complaint_id,
  tracking_code,
}: {
  complaint_id?: string;
  tracking_code?: string;
}) : Promise<ComplaintI>=> {
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
  } catch (err: any) {
    console.error("Error fetching complaint details:", err);
    throw new Error(`Failed to fetch complaint details: ${err.message}`);
  }
};
