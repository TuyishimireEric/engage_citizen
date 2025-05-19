import { supabase } from "@/utils/supabase";

export const FC_getDashboardData = async () => {
  try {
    const { data: complaints, error } = await supabase
      .from("Complaints")
      .select("id, status, category_id, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Calculate stats
    const stats = {
      totalComplaints: complaints.length,
      totalInProgress: complaints.filter((c) => c.status === "in-progress")
        .length,
      totalResolved: complaints.filter((c) => c.status === "resolved").length,
      totalClosed: complaints.filter((c) => c.status === "closed").length,
    };

    // Calculate categories
    const categoryMap = new Map();
    complaints.forEach((complaint) => {
      const categoryId = complaint.category_id;
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          total: 0,
          resolved: 0,
        });
      }
      const category = categoryMap.get(categoryId);
      category.total++;
      if (complaint.status === "resolved") {
        category.resolved++;
      }
    });
    const categories = Array.from(categoryMap.values());

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const submissionsByDate: { [key: string]: number } = {};
    complaints
      .filter((complaint) => new Date(complaint.created_at) >= sevenDaysAgo)
      .forEach((complaint) => {
        const date = new Date(complaint.created_at);
        const dateKey = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
        submissionsByDate[dateKey] = (submissionsByDate[dateKey] || 0) + 1;
      });

    return {
      stats,
      categories,
      submittedByDate: submissionsByDate,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch complaints: ${error.message}`);
  }
};
