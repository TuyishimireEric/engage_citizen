import { MessageCircle, Users, CheckCircle } from "lucide-react";

type StatusKey = "acknowledged" | "in-progress" | "resolved" | "default";

export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    StatusKey,
    {
      bgColor: string;
      textColor: string;
      icon: React.ReactNode;
      label: string;
    }
  > = {
    acknowledged: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      icon: <MessageCircle className="h-3.5 w-3.5 mr-1.5" />,
      label: "Under Review",
    },
    "in-progress": {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      icon: <Users className="h-3.5 w-3.5 mr-1.5" />,
      label: "In Progress",
    },
    resolved: {
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      icon: <CheckCircle className="h-3.5 w-3.5 mr-1.5" />,
      label: "Resolved",
    },
    default: {
      bgColor: "bg-gray-100",
      textColor: "text-gray-600",
      icon: null,
      label: "Submitted",
    },
  };

  const config = statusConfig[status as StatusKey] ?? statusConfig.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
