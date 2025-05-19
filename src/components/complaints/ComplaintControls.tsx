interface ComplaintControlsProps {
  setShowStatusModal: (show: boolean) => void;
  setShowReassignModal: (show: boolean) => void;
  currentPriority: string;
  setCurrentPriority: (priority: string) => void;
}

export const ComplaintControls = ({
  currentPriority,
  setCurrentPriority,
  setShowReassignModal,
  setShowStatusModal,
}: ComplaintControlsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowStatusModal(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-sync-alt mr-2"></i>
          <span>Update Status</span>
        </button>
        <button
          onClick={() => setShowReassignModal(true)}
          className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 shadow-sm hover:bg-gray-50 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-user-friends mr-2 text-blue-500"></i>
          <span>Reassign</span>
        </button>

        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-check-circle mr-2"></i>
          <span>Resolve Complaint</span>
        </button>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm text-gray-600 mr-3">Priority:</span>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPriority("Low")}
            className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
              currentPriority === "Low"
                ? "bg-green-100 text-green-800 font-medium"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Low
          </button>
          <button
            onClick={() => setCurrentPriority("Medium")}
            className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
              currentPriority === "Medium"
                ? "bg-yellow-100 text-yellow-800 font-medium"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setCurrentPriority("High")}
            className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
              currentPriority === "High"
                ? "bg-red-100 text-red-800 font-medium"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            High
          </button>
        </div>
      </div>
    </div>
  );
};
