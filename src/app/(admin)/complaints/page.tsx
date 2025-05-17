"use client";

import { SearchComplaints } from "@/components/common/SearchComplaints";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

const ComplaintsPage = () => {
  return (
    <div className="h-full dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Complaints</h1>
          <p className="text-gray-600 mt-1">
            View and manage all complaints submitted by users. You can also
            search for specific complaints using the search bar below.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4 bg-white">
          <ComplaintsList limit={20} isPublic={true} />
        </div>
      </main>
    </div>
  );
};

export default ComplaintsPage;
