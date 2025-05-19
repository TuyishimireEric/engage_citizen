"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X, LogOut, Loader2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import SearchInput from "../ui/SearchInput";
import useUser from "@/hooks/auth/useUser";
import AuthModal from "../auth/AuthModal";
import { NavLink } from "./NavLink";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register" | null>(null);

  const pathname = usePathname();
  const isDashboard = pathname.includes("admin");
  const { user, userProfile, logout, isLoggingOut } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as HTMLElement).closest(".mobile-menu") &&
        !(event.target as HTMLElement).closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-sm ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white/80 dark:bg-gray-900/80"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-xl sm:text-2xl text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              MyVoice
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-2">
              <nav className="flex items-center space-x-1">
                {!isDashboard && (
                  <>
                    <NavLink href="/" isActive={pathname === "/"}>
                      Home
                    </NavLink>
                    <NavLink
                      href="/complaints"
                      isActive={pathname.includes("complaints")}
                    >
                      Complaints
                    </NavLink>
                  </>
                )}
                <div className="relative ml-4">
                  {isSearchOpen ? (
                    <SearchInput
                      onClose={() => setIsSearchOpen(false)}
                      autoFocus
                    />
                  ) : (
                    <button
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                      onClick={() => setIsSearchOpen(true)}
                      aria-label="Open search"
                    >
                      <Search size={20} />
                    </button>
                  )}
                </div>
              </nav>

              {/* Buttons */}
              {userProfile ? (
                isDashboard ? (
                  <Link
                    href="/"
                    className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
                  >
                    ← Back to Home
                  </Link>
                ) : (
                  <Link
                    href="/admin/dashboard"
                    className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition flex items-center"
                  >
                    <Settings size={16} className="mr-2" />
                    Admin Dashboard
                  </Link>
                )
              ) : (
                <Link
                  href="/add_complaint"
                  className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
                >
                  + Add Complaint
                </Link>
              )}

              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-4" />

              {/* User */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden">
                      {userProfile?.image_url ? (
                        <img
                          src={userProfile.image_url}
                          alt={userProfile.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-white">
                          {userProfile?.full_name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div className="hidden xl:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {userProfile?.full_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userProfile?.role_id === 2 ? "Admin" : "User"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-gray-200 dark:border-gray-700 transition disabled:opacity-50"
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
                    className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthType("register")}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-1.5 text-sm font-medium transition border border-gray-200 dark:border-gray-700"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <ThemeToggle />
            </div>

            {/* Mobile Nav */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:text-green-400 dark:hover:bg-gray-800 rounded-lg transition"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="menu-button p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:text-green-400 dark:hover:bg-gray-800 rounded-lg transition"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              {!isDashboard && (
                <>
                  <NavLink href="/" isActive={pathname === "/"}>
                    Home
                  </NavLink>
                  <NavLink
                    href="/complaints"
                    isActive={pathname.includes("complaints")}
                  >
                    Complaints
                  </NavLink>
                </>
              )}
              {userProfile ? (
                <NavLink
                  href={isDashboard ? "/" : "/admin/dashboard"}
                  isActive={pathname.includes("admin")}
                >
                  {isDashboard ? "← Back to Home" : "Admin Dashboard"}
                </NavLink>
              ) : (
                <NavLink href="/add_complaint" isActive={false}>
                  + Add Complaint
                </NavLink>
              )}
            </nav>

            <div className="flex items-center justify-between">
              {user ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center text-red-600 hover:underline disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <LogOut size={16} className="mr-2" />
                  )}
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => setAuthType("login")}>Log In</button>
                  <button onClick={() => setAuthType("register")}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {authType && <AuthModal authType={authType} setAuthType={setAuthType} />}
    </>
  );
}
