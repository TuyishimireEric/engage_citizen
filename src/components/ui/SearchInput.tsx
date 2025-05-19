import React, { useRef, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  onClose: () => void;
  autoFocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onClose,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTracking, setIsTracking] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsTracking(true);
      router.push(
        `/complaints?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [autoFocus, onClose]);

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter tracking number..."
        className="py-2 pl-10 pr-10 bg-gray-100 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-green-500 w-64 transition-all duration-200"
      />
      {searchQuery && (
        <button
          type="submit"
          className="absolute right-10 text-green-600 hover:text-green-700 px-2 text-xs"
          disabled={isTracking}
        >
          {isTracking ? "Tracking..." : "Track"}
        </button>
      )}
      <button
        onClick={onClose}
        type="button"
        className="absolute right-3 text-gray-400 hover:text-gray-600"
        aria-label="Close search"
      >
        <X size={18} />
      </button>
    </form>
  );
};

export default SearchInput;
