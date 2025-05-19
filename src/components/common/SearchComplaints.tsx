export const dynamic = 'force-dynamic'

import { useState } from "react";
import { ArrowRight, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SearchComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/complaints?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 m-2">
      <div className="w-full md:w-auto">
        <Link
          href="/add_complaint"
          className="w-full md:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-3 font-medium transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Complaint
          <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-0 group-hover:translate-x-1" />
        </Link>
      </div>
      <form className="w-full md:flex-1" onSubmit={handleSearch}>
        <div className="relative flex">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints or enter tracking ID..."
              className="w-full pl-10 pr-4 py-2.5 text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-400 focus:border-green-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
