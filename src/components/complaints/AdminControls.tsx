"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Shield,
} from "lucide-react";
import useUser from "@/hooks/auth/useUser";
import { useRespondComplaint } from "@/hooks/responses/useRespondComplaint";

// Define status types to match with badges
type StatusKey = "submitted" | "in-progress" | "resolved" | "closed";

export const statusConfig = {
  submitted: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    hoverBg: "hover:bg-gray-200",
    icon: <AlertCircle className="h-4 w-4" />,
    label: "Submitted"
  },
  "in-progress": {
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-300",
    hoverBg: "hover:bg-yellow-100",
    icon: <Clock className="h-4 w-4" />,
    label: "In Progress"
  },
  resolved: {
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-300",
    hoverBg: "hover:bg-green-100",
    icon: <CheckCircle className="h-4 w-4" />,
    label: "Resolved"
  },
  closed: {
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-300",
    hoverBg: "hover:bg-red-100",
    icon: <X className="h-4 w-4" />,
    label: "Closed"
  }
};

interface AdminControlsProps {
  complaintId: string;
  currentStatus: string;
  onStatusUpdate?: () => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({
  complaintId,
  currentStatus,
  onStatusUpdate
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);
  const [statusNote, setStatusNote] = useState("");
  const { onSubmit, isPending, isSuccess } = useRespondComplaint();
  const { userProfile } = useUser();

  const statusOptions: StatusKey[] = [
    "submitted",
    "in-progress",
    "resolved",
    "closed"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      complaint_id: complaintId,
      status: selectedStatus,
      message: statusNote,
      responded_by: userProfile?.user_id ?? ""
    });
    
    if (onStatusUpdate) {
      onStatusUpdate();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setStatusNote("");
      setSelectedStatus(currentStatus);
    }
  }, [isSuccess, currentStatus]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Shield className="text-blue-600 h-4 w-4 mr-2" />
          <h2 className="text-base font-semibold text-gray-800">Quick Status Update</h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statusOptions.map((status) => {
              const config = statusConfig[status as StatusKey];
              return (
                <button
                  key={status}
                  type="button"
                  className={`p-1.5 border rounded-md flex items-center justify-center transition-all duration-200 ${
                    selectedStatus === status
                      ? `${config.bgColor} ${config.textColor} border-2 ${config.borderColor} shadow-sm`
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  <span className="flex items-center gap-1 text-xs sm:text-sm">
                    {React.cloneElement(config.icon, {
                      className: `h-3 w-3 ${selectedStatus === status ? "animate-pulse" : ""}`
                    })}
                    {config.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-3">
            <textarea
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={4}
              placeholder="Add status note..."
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm ${
                isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminControls;