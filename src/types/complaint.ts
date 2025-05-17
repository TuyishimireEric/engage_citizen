export interface ComplaintI {
  id?: string;
  tracking_code: string;
  category_id: string;
  created_by: null;
  is_public: boolean;
  title: string;
  description: string;
  fullname: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  priority?: string;
}

export interface ResultI {
  success: boolean;
  trackingId: string;
  error: string | null;
}
