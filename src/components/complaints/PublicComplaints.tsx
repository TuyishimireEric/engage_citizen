import { SearchComplaints } from "@/components/common/SearchComplaints";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

const PublicComplaints = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Recent Complaints
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Below is a list of the most recent complaints submitted by users.
          </p>
        </div>
        <div className="mt-6">
          <SearchComplaints />
          <ComplaintsList limit={20} isPublic={true} />
        </div>
      </main>
    </div>
  );
};

export default PublicComplaints;
