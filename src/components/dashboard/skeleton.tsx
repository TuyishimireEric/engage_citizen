import React from "react";

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={`stat-${index}`}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mt-1"></div>
                  <div className="flex items-center mt-2">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              </div>
            </div>
          ))}
      </div>

      {/* Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Charts Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`pie-${index}`}
                  className="flex flex-col items-center"
                >
                  <div className="w-full h-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
                </div>
              ))}
          </div>
        </div>

        {/* Line Chart Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
          <div className="w-full h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
