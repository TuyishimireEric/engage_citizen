import { ComplaintI } from "@/types/complaint";
import { DATE, timeFromNow } from "@/utils/functions";

interface DetailsCardProps {
  complaintData: ComplaintI | undefined;
}

export const DetailsCard = ({ complaintData }: DetailsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Complaint Details
      </h2>

      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
            Title
          </label>
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-relaxed">
            {complaintData?.title || "—"}
          </p>
        </div>

        <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
            Description
          </label>
          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
            {complaintData?.description || "—"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
              Category
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {complaintData?.category ?? ""}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
              Status
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {complaintData?.status ?? ""}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 rounded-md p-4">
            <label className="text-sm font-medium text-blue-700 dark:text-blue-300 block mb-2">
              Date Submitted
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {complaintData?.created_at ? DATE(complaintData.created_at) : "—"}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-md p-4">
            <label className="text-sm font-medium text-green-700 dark:text-green-300 block mb-2">
              Time Ago
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {complaintData?.created_at
                ? timeFromNow(complaintData.created_at)
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
