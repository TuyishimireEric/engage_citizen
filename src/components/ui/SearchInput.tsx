import React, { useRef, useEffect, useState } from "react";
import { Search, X } from "lucide-react";

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
  const [trackingNumber, setTrackingNumber] = useState("");

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

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setIsTracking(true);
      // Simulate tracking lookup
      setTimeout(() => {
        setIsTracking(false);
        setTrackingNumber("");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleTrackingSubmit}
      className="relative flex items-center"
    >
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number..."
        className="py-2 pl-10 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64 transition-all duration-200"
      />
      {trackingNumber && (
        <button
          type="submit"
          className="absolute right-10 text-green-600 hover:text-green-700 px-2"
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
