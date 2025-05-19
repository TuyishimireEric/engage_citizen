"use client";

import useResponse from "@/hooks/responses/useResponse";
import { Clock, Check, X, FileText } from "lucide-react";

interface StatusTimelineProps {
  complaintId: string;
}

type StatusType = "submitted" | "in progress" | "resolved" | "closed";

const statusConfig: Record<
  StatusType,
  {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bgColor: string;
    textColor: string;
    borderColor: string;
    lightBgColor: string;
  }
> = {
  submitted: {
    icon: FileText,
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-500",
    lightBgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  "in progress": {
    icon: Clock,
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    lightBgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  resolved: {
    icon: Check,
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    lightBgColor: "bg-green-50 dark:bg-green-900/20",
  },
  closed: {
    icon: X,
    bgColor: "bg-gray-500",
    textColor: "text-gray-500",
    borderColor: "border-gray-500",
    lightBgColor: "bg-gray-50 dark:bg-gray-900/20",
  },
};

export const StatusTimeline = ({ complaintId }: StatusTimelineProps) => {
  const response = useResponse({ complaintId });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Status Timeline
      </h2>

      <div className="relative">
        {response.isLoading
          ? Array(3)
              .fill(null)
              .map((_, index, arr) => (
                <div key={`skeleton-${index}`} className="flex flex-col sm:flex-row mb-8 last:mb-0">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    {index !== arr.length - 1 && (
                      <div className="w-0.5 bg-gray-200 dark:bg-gray-700 h-16 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pt-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-4">
                      <div className="w-full">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
                      </div>
                      <div className="text-right ml-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1 animate-pulse" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                  </div>
                </div>
              ))
          : response.data?.map((item, index, arr) => {
              const normalizedStatus = item.status.toLowerCase() as StatusType;
              const config = statusConfig[normalizedStatus] ?? statusConfig["submitted"];
              const IconComponent = config.icon;
              const isActive = index === 0;

              return (
                <div key={index} className="flex flex-col sm:flex-row mb-8 last:mb-0">
                  <div className="flex flex-col items-center mr-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isActive
                          ? config.bgColor
                          : `bg-white dark:bg-gray-800 border-2 ${config.borderColor}`
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${isActive ? "text-white" : config.textColor}`}
                      />
                    </div>
                    {index !== arr.length - 1 && (
                      <div className="w-0.5 bg-gray-300 dark:bg-gray-600 h-16 mt-2" />
                    )}
                  </div>

                  <div className="flex-1 pt-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 capitalize flex items-center">
                          {item.status}
                          {isActive && (
                            <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.created_at).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Updated by{" "}
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {item.Profiles.full_name}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}

        {!response.isLoading &&
          (!response.data || response.data.length === 0) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-base font-medium">No status updates available</p>
              <p className="text-sm mt-1">
                Updates will appear here as your complaint progresses
              </p>
            </div>
          )}
      </div>
    </div>
  );
};
