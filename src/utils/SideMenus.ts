import {
  Home,
  List,
  FileText,
  User,
  BarChart,
  Star,
  AlertCircle,
  UserCircle,
  Calendar,
  MessageSquare,
  FileBarChart,
} from "lucide-react";

export const sideMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/dashboard",
    roles: [1, 2, 3],
    icon: Home,
  },
  {
    id: "complaints",
    label: "Complaints",
    url: "/complaints",
    roles: [1, 2, 3],
    icon: List,
  },
  {
    id: "user",
    label: "Users",
    url: "/users",
    roles: [2, 3],
    icon: User,
  },
  {
    id: "analytics",
    label: "Analytics",
    url: "/analytics",
    roles: [2, 3],
    icon: BarChart,
  },
  {
    id: "reviews",
    label: "Reviews",
    url: "/reviews",
    roles: [1, 2, 3],
    icon: Star,
  },
  {
    id: "departments",
    label: "Departments",
    url: "/departments",
    roles: [2, 3],
    icon: FileText,
  },
];
