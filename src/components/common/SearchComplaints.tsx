"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  PlusCircle,
  Search,
} from "lucide-react";
import Link from "next/link";

export const SearchComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="w-full sm:w-auto">
        <Link
          href="/add_complaint"
          className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-3 font-medium transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Complaint
          <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="w-full sm:w-auto flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search complaints or enter tracking ID..."
            className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      <div className="w-full sm:w-auto flex items-center gap-2">
        <button className="flex items-center text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
