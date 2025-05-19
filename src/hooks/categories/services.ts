import { supabase } from "@/utils/supabase";
import axios from "axios";

export const FC_getCategories = async () => {
  try {
    const query = supabase.from("Categories").select("*");

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch Categories: ${error.message}`);
  }
};

export const FC_analyzeCategory = async ({
  complaintText,
  availableCategories,
}: {
  complaintText: string;
  availableCategories: string[];
}) => {
  try {
    const response = await axios.post<string>("/api/openai", {
      complaintText,
      availableCategories,
    });

    const { data } = response;
    return data;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch Categories: ${error.message}`);
  }
};
