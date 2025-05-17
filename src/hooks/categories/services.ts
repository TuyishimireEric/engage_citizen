import { ComplaintI } from "@/types/complaint";
import { supabase } from "@/utils/supabase";

export const FC_getCategories = async () => {
  try {
    let query = supabase.from("Categories").select("*");

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err: any) {
    console.error("Error fetching Categories:", err);
    throw new Error(`Failed to fetch Categories: ${err.message}`);
  }
};
