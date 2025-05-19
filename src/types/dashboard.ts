export interface DashboardStats {
  totalComplaints: number;
  totalInProgress: number;
  totalResolved: number;
  totalClosed: number;
}

export interface CategoryData {
  id: string;
  total: number;
  resolved: number;
}

export interface DashboardData {
  stats: DashboardStats;
  categories: CategoryData[];
  submittedByDate: Record<string, number>;
}
