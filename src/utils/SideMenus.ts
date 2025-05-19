import { Home, List } from "lucide-react";

export const sideMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/admin/dashboard",
    roles: [1, 2, 3],
    icon: Home,
  },
  {
    id: "complaints",
    label: "Complaints",
    url: "/admin/complaints",
    roles: [1, 2, 3],
    icon: List,
  },
];
