"use client";

import { useState, useEffect } from "react";
import { StatusBadge } from "../common/StatusBadge";
import useComplaints from "@/hooks/complains/useComplaints";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Star,
  TrendingUp,
  User,
  Building2,
  Flag,
  AlertTriangle,
  Clock,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  SlidersHorizontal,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { ComplaintSkeleton } from "./ComplainSkeleton";
import { ComplaintI } from "@/types/complaint";
import useCategories from "@/hooks/categories/useCategories";
import Link from "next/link";

interface ComplaintsListProps {
  limit?: number;
  isPublic?: boolean;
  userIsAdmin?: boolean;
}

export const ComplaintsList = ({
  limit = 10,
  isPublic,
  userIsAdmin = false,
}: ComplaintsListProps) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [expandedComplaint, setExpandedComplaint] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    dateRange: "",
  });
  const [totalPages, setTotalPages] = useState(1);

  const { data: categories } = useCategories();

  const getCategoryName = (categoryId: string) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : "General";
  };

  const { data: complaints, isLoading } = useComplaints({
    page: currentPage,
    limit,
    isPublic,
  });

  //   // Calculate total pages
  //   useEffect(() => {
  //     if (complaints?.total) {
  //       setTotalPages(Math.ceil(complaints.total / limit));
  //     }
  //   }, [complaints, limit]);

  const filteredComplaints = (complaints || []).filter((c: any) => {
    if (activeTab === "resolved") return c.status === "resolved";
    if (activeTab === "trending") return c.upvotes >= 10;
    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      category: "",
      dateRange: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case "High":
        return <Flag className="h-3 w-3 text-orange-500" />;
      default:
        return <Clock className="h-3 w-3 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search complaints..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 text-sm border ${
                showFilters || Object.values(filters).some((v) => v !== "")
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100"
              } rounded-md`}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters{" "}
              {Object.values(filters).some((v) => v !== "") && "(Active)"}
            </button>
            {Object.values(filters).some((v) => v !== "") && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="block w-full py-2 px-3 border border-gray-200 rounded-md text-sm"
            >
              <option value="">Status: All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="block w-full py-2 px-3 border border-gray-200 rounded-md text-sm"
            >
              <option value="">Priority: All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="block w-full py-2 px-3 border border-gray-200 rounded-md text-sm"
            >
              <option value="">Category: All</option>
              {categories?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="block w-full py-2 px-3 border border-gray-200 rounded-md text-sm"
            >
              <option value="">Date: All time</option>
              <option value="today">Today</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="this_month">This month</option>
              <option value="last_month">Last month</option>
            </select>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
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
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <ComplaintSkeleton limit={limit} />
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint: ComplaintI, index) => (
              <Link
                key={complaint.id}
                href={`/complaints/${complaint.id}`}
                className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                    {(currentPage - 1) * limit + index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {complaint.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {getCategoryName(complaint.category_id)}
                        </span>
                        <StatusBadge status={complaint.status ?? ""} />
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>
                        {complaint.fullname || complaint.email
                          ? complaint.fullname ?? complaint.email
                          : "Anonymous"}
                      </span>
                      <span className="mx-1.5">•</span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {complaint.created_at ?? "just now"}
                      </span>
                      <span className="mx-1.5">•</span>
                      <span>#{complaint.tracking_code ?? "N/A"}</span>
                    </div>

                    {userIsAdmin && (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <User className="h-3 w-3" />
                          <span>{"Unassigned"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Building2 className="h-3 w-3" />
                          <span>{"General"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          {getPriorityIcon(complaint.priority ?? "Low")}
                          <span>{complaint.priority ?? "Low"}</span>
                        </div>
                      </div>
                    )}

                    {expandedComplaint === complaint.id && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="col-span-1 md:col-span-8">
                            <h5 className="font-medium text-gray-700 mb-1 text-xs">
                              Details
                            </h5>
                            <p className="text-xs">
                              {complaint.description ??
                                "No additional details provided."}
                            </p>
                          </div>
                          {userIsAdmin && (
                            <div className="col-span-1 md:col-span-4 border-l border-gray-200 pl-4">
                              <h5 className="font-medium text-gray-700 mb-1 text-xs">
                                Internal Notes
                              </h5>
                              <p className="text-xs">
                                {"No internal notes added yet."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-3">
                        <button className="flex items-center text-gray-500 hover:text-green-600 transition-colors text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          <span>{0}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>{0}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center text-green-600 hover:text-green-700 transition-colors text-xs"
                          onClick={() =>
                            setExpandedComplaint(
                              expandedComplaint === complaint.id
                                ? null
                                : complaint.id ?? null
                            )
                          }
                        >
                          {expandedComplaint === complaint.id ? (
                            <>
                              <span>Less</span>
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              <span>Details</span>
                            </>
                          )}
                        </button>
                        <button
                          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-xs ml-3"
                          title="View full complaint details"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-gray-600 font-medium mb-1">
                No complaints found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
              {Object.values(filters).some((v) => v !== "") && (
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-2 bg-green-50 text-green-600 text-sm font-medium rounded-md hover:bg-green-100"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        {isLoading ? (
          <div className="flex justify-between items-center w-full">
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        ) : (
          <>
            <span className="text-xs text-gray-500">
              {filteredComplaints.length} of {complaints?.length ?? 0}{" "}
              complaints
            </span>
            <button className="text-green-600 font-medium hover:text-green-700 transition-colors inline-flex items-center text-xs">
              View All
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
