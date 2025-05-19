import { supabase } from "@/utils/supabase";

export const FC_getDashboardData = async () => {
  try {
    // Fetch complaints with category information
    const { data: complaints, error: complaintsError } = await supabase
      .from("Complaints")
      .select("id, status, category, created_at")
      .order("created_at", { ascending: false });

    if (complaintsError) throw complaintsError;

    const { data: categories, error: categoriesError } = await supabase
      .from("Categories") 
      .select("id, name");

    if (categoriesError) {
      console.warn("Could not fetch categories:", categoriesError);
    }

    const categoryNameMap = new Map();
    if (categories) {
      categories.forEach((cat) => {
        categoryNameMap.set(cat.id, cat.name);
      });
    }

    // Calculate stats
    const stats = {
      totalComplaints: complaints.length,
      totalInProgress: complaints.filter((c) => c.status === "in-progress").length,
      totalResolved: complaints.filter((c) => c.status === "resolved").length,
      totalClosed: complaints.filter((c) => c.status === "closed").length,
    };

    // Calculate categories with proper names
    const categoryMap = new Map();
    complaints.forEach((complaint) => {
      const categoryId = complaint.category;
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: categoryNameMap.get(categoryId) || ` ${categoryId}`,
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

    const categoriesData = Array.from(categoryMap.values()).sort((a, b) => b.total - a.total);

    // Calculate submissions by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const submissionsByDate: { [key: string]: number } = {};
    
    // Initialize all dates with 0 to ensure continuity
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      ).toString().padStart(2, "0")}`;
      submissionsByDate[dateKey] = 0;
    }

    // Fill in actual submission counts
    complaints
      .filter((complaint) => new Date(complaint.created_at) >= sevenDaysAgo)
      .forEach((complaint) => {
        const date = new Date(complaint.created_at);
        const dateKey = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        ).toString().padStart(2, "0")}`;
        if (submissionsByDate.hasOwnProperty(dateKey)) {
          submissionsByDate[dateKey]++;
        }
      });

    return {
      stats,
      categories: categoriesData,
      submittedByDate: submissionsByDate,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to fetch dashboard data: ${error.message}`);
  }
};