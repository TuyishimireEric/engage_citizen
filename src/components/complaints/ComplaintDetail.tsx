"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

import { DetailsCard } from "@/components/complaints/ComplainCard";
import { StatusTimeline } from "@/components/complaints/StatusTimeline";
import AdminControls from "@/components/complaints/AdminControls";

import useComplaintDetails from "@/hooks/complains/useComplaintDetails";
import useUser from "@/hooks/auth/useUser";

const statusConfig = {
  submitted: "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
  "in-progress": "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
  resolved: "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
  closed: "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
};

interface ComplaintDetailsProps {
  complaintId: string;
  onBack: () => void;
}

const ComplaintDetails = ({ complaintId, onBack }: ComplaintDetailsProps) => {
  const { data: complaintData } = useComplaintDetails({
    complaint_id: complaintId,
  });

  const { userProfile } = useUser();

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase() as keyof typeof statusConfig;
    return statusConfig[normalizedStatus] || statusConfig.submitted;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Complaints
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Complaint Details
              </h1>
              <div className="text-gray-600 dark:text-gray-400">
                Complaint ID:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  #{complaintData?.tracking_code || "Loading..."}
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              {complaintData?.status && (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                    complaintData.status
                  )}`}
                >
                  {complaintData.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <DetailsCard
              complaintData={complaintData}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <StatusTimeline complaintId={complaintId} />
            {userProfile?.role_id === 2 && (
              <AdminControls
                complaintId={complaintId}
                currentStatus={complaintData?.status || "submitted"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
