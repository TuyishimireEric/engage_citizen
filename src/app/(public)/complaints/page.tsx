"use client";

import { useState } from "react";
import ComplaintDetails from "@/components/complaints/ComplaintDetail";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

const ComplaintsPage = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(
    null
  );

  return (
    <div className="h-full min-h-screen  max-w-5xl py-10 mx-auto  bg-gray-50 dark:bg-gray-900">
      {selectedComplaint ? (
        <ComplaintDetails
          complaintId={selectedComplaint}
          onBack={() => setSelectedComplaint(null)}
        />
      ) : (
        <main className="container mx-auto px-4 sm:px-6 py-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Complaints</h1>
            <p className="text-gray-600 dark:text-white mt-1">
              View public complaints, track their status, and provide feedback.
              Your voice matters!
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <ComplaintsList
              setSelectedComplaint={setSelectedComplaint}
              limit={20}
              isPublic={true}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default ComplaintsPage;
