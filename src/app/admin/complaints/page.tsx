"use client";

import { useState } from "react";
import ComplaintDetails from "@/components/complaints/ComplaintDetail";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

const ComplaintsPage = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {selectedComplaint ? (
        <ComplaintDetails
          complaintId={selectedComplaint}
          onBack={() => setSelectedComplaint(null)}
        />
      ) : (
        <main className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Complaints
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
              View and manage all complaints submitted by users. You can also
              search for specific complaints using the search bar below.
            </p>
          </header>
          <section className="mt-6 flex flex-col gap-4 bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
            <ComplaintsList
              setSelectedComplaint={setSelectedComplaint}
              limit={20}
              isPublic={false}
            />
          </section>
        </main>
      )}
    </div>
  );
};

export default ComplaintsPage;
