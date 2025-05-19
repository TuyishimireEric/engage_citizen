export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { StatusBadge } from "../common/StatusBadge";
import useComplaints from "@/hooks/complains/useComplaints";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  MessageCircle,
  Star,
  TrendingUp,
  Search,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { ComplaintSkeleton } from "./ComplainSkeleton";
import { ComplaintI } from "@/types/complaint";
import { timeFromNow } from "@/utils/functions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ComplaintsListProps {
  setSelectedComplaint: (complaint: string | null) => void;
  limit?: number;
  isPublic?: boolean;
}

const SearchParamsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export const ComplaintsList = ({
  setSelectedComplaint,
  limit = 10,
  isPublic,
}: ComplaintsListProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SearchParamsWrapper>
      <ComplaintsListContent
        setSelectedComplaint={setSelectedComplaint}
        limit={limit}
        isPublic={isPublic}
        router={router}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </SearchParamsWrapper>
  );
};

const ComplaintsListContent = ({
  setSelectedComplaint,
  limit,
  isPublic,
  router,
  currentPage,
  setCurrentPage,
}: ComplaintsListProps & {
  router: ReturnType<typeof useRouter>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState("recent");
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    dateRange: "",
  });

  const { data: complaints, isLoading } = useComplaints({
    page: currentPage,
    limit,
    isPublic,
    search: searchQuery,
  });

  const filteredComplaints = (complaints || []).filter((c) => {
    if (activeTab === "resolved") return c.status === "resolved";
    if (activeTab === "trending") return c.upvotes >= 10;
    return true;
  });

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      category: "",
      dateRange: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 m-2">
        <div className="w-full sm:w-auto">
          <Link
            href="/add_complaint"
            className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-3 font-medium transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New
            <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Search */}
        <div className="w-full flex-1">
          <div className="relative flex">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints or enter tracking ID..."
                className="w-full pl-10 pr-4 py-2.5 text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
            >
              Search
            </button>
          </div>
        </div>

        {/* Clear filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearFilters}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Tabs & Complaints List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          {[
            {
              id: "recent",
              label: "Recent",
              icon: <Bell className="h-4 w-4" />,
            },
            {
              id: "trending",
              label: "Trending",
              icon: <TrendingUp className="h-4 w-4" />,
            },
            {
              id: "resolved",
              label: "Resolved",
              icon: <CheckCircle className="h-4 w-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Complaint Items */}
        {isLoading ? (
          <ComplaintSkeleton limit={4} />
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700 px-2">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint: ComplaintI, index) => (
                <div
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint.id ?? null)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-100 cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-3">
                      {(currentPage - 1) * (limit ?? 10) + index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {complaint.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                            {complaint.category}
                          </span>
                          <StatusBadge status={complaint.status ?? ""} />
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>
                          {complaint.fullname || complaint.email
                            ? complaint.fullname ?? complaint.email
                            : "Anonymous"}
                        </span>
                        <span className="mx-1.5">•</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {timeFromNow(complaint.created_at ?? "")}
                        </span>
                        <span className="mx-1.5">•</span>
                        <span>#{complaint.tracking_code ?? "N/A"}</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-3">
                          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-600 transition-colors text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            <span>{0}</span>
                          </button>
                          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            <span>{0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">
                  No complaints found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Try adjusting your search or filter criteria
                </p>
                {Object.values(filters).some((v) => v !== "") && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 px-4 py-2 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-medium rounded-md hover:bg-green-100 dark:hover:bg-green-800"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
