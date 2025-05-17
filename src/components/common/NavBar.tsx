"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X, User, LogOut, Loader2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import SearchInput from "../ui/SearchInput";
import useUser from "@/hooks/auth/useUser";
import AuthModal from "../auth/AuthModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register" | null>(null);

  const pathname = usePathname();

  const isDashboard = pathname.includes("dashboard");

  const { user, userProfile, logout, isLoggingOut } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [user, isMenuOpen]);

  const handleLogout = () => {
    logout();
  };

  console.log("is admin dash", isDashboard);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "bg-white dark:bg-gray-900 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className=" px-4 md:px-8 w-full">
          <div className="flex items-center justify-between h-16 md:h-16">
            <span className="font-bold text-2xl text-green-600">MyVoice</span>
            <div className="hidden md:flex items-center space-x-1">
              <nav className="flex items-center space-x-1">
                {!isDashboard && (
                  <>
                    <NavLink href="/" isActive>
                      Home
                    </NavLink>
                    <NavLink href="/about">About Us</NavLink>
                    <NavLink href="/complaints">Complaints</NavLink>
                  </>
                )}
                <div className="relative ml-4">
                  {isSearchOpen ? (
                    <SearchInput
                      onClose={() => setIsSearchOpen(false)}
                      autoFocus={true}
                    />
                  ) : (
                    <button
                      className="p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
                      onClick={() => setIsSearchOpen(true)}
                      aria-label="Open search"
                    >
                      <Search size={20} />
                    </button>
                  )}
                </div>
              </nav>
              {userProfile?.role_id === 2 ? (
                <>
                  {isDashboard ? (
                    <Link
                      href="/"
                      className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
                    >
                      Back to Home
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/add_complaint"
                  className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  Add Complaint
                </Link>
              )}

              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-4"></div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {
                        <span className="text-sm font-medium">
                          {userProfile?.full_name.charAt(0)}
                        </span>
                      }
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {userProfile?.full_name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="p-1.5 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Log out"
                  >
                    {isLoggingOut ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogOut size={16} />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setAuthType("login")}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthType("register")}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2 mr-1">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {userProfile?.image_url ? (
                      <img
                        src={userProfile?.image_url}
                        alt={userProfile?.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {userProfile?.full_name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-full border border-gray-200 dark:border-gray-700"
                  onClick={() => setAuthType("login")}
                  aria-label="Log in"
                >
                  <User size={18} />
                </button>
              )}
              <button
                className="focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg absolute w-full">
            <div className="px-4 py-3">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <nav className="flex flex-col space-y-3 mb-4">
                <NavLink href="/" isActive>
                  Home
                </NavLink>
                <NavLink href="/about">About Us</NavLink>
                <NavLink href="/complaints">Complaints</NavLink>
              </nav>

              {user ? (
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {userProfile?.image_url ? (
                        <img
                          src={userProfile?.image_url}
                          alt={userProfile?.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {userProfile?.full_name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {userProfile?.full_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userProfile?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Log out"
                  >
                    {isLoggingOut ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <LogOut size={18} />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 mb-4">
                  <button
                    onClick={() => setAuthType("login")}
                    className="flex-1 py-2 text-center border border-gray-200 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthType("register")}
                    className="flex-1 py-2 text-center bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <ThemeToggle />
                <button className="flex-1 ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-2.5 text-sm font-medium transition-colors">
                  Submit Complaint
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {authType && <AuthModal authType={authType} setAuthType={setAuthType} />}
    </>
  );
}

function NavLink({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "text-green-500 dark:text-green-400"
          : "text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </a>
  );
}
