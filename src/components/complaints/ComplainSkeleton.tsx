interface ComplaintSkeletonProps {
  limit?: number;
}

export const ComplaintSkeleton = ({ limit = 3 }: ComplaintSkeletonProps) => (
  <div className="divide-y divide-gray-100">
    {[...Array(limit)].map((_, index) => (
      <div key={index} className="p-6">
        <div className="flex items-start">
          <div className="shrink-0 w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 rounded-full w-12"></div>
                <div className="h-4 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
            <div className="flex items-center justify-between mt-4">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
