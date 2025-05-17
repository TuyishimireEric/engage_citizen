"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sideMenus } from "@/utils/SideMenus";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

export default function SidebarMenu({ userRole = [1] }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMenus = sideMenus.filter((menu) =>
    menu.roles.some((role) => userRole.includes(role))
  );

  const activeItem = filteredMenus.find((item) =>
    pathname?.startsWith(item.url)
  )?.id;

  return (
    <div
      className={`relative ${isExpanded ? "w-64" : "w-20"} bg-white dark:bg-gray-900 shadow-md transition-all duration-300 rounded-br-3xl h-full`}
    >
      <div className={`p-6 flex ${isExpanded ? "justify-between" : "justify-center"} items-center`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <ul className="mt-2">
        {filteredMenus.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <li
              key={item.id}
              className={`${isExpanded ? "px-6" : "px-0 flex justify-center"} py-3 ${
                isActive ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500" : ""
              } ${mounted && isActive && !isExpanded ? "animate__animated animate__pulse" : ""}`}
            >
              <Link
                href={item.url}
                className={`flex items-center ${isExpanded ? "w-full" : "justify-center"} text-left cursor-pointer whitespace-nowrap`}
              >
                <Icon
                  className={`${isExpanded ? "mr-3" : ""} ${
                    isActive ? "text-green-500" : "text-gray-500 dark:text-gray-400"
                  }`}
                  size={20}
                />
                {isExpanded && (
                  <span
                    className={`${
                      isActive ? "text-green-500 font-medium" : "text-gray-700 dark:text-gray-300"
                    } ${!mounted ? "" : "animate__animated animate__fadeIn"}`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Verification Card */}
      <div
        className={`mt-10 ${isExpanded ? "mx-6" : "mx-2"} p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white ${
          !isExpanded && mounted ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        {isExpanded ? (
          <>
            <p className="text-sm">Please complete your account verification</p>
            <div className="mt-4 flex justify-center">
              <button className="bg-white text-green-600 text-sm py-2 px-4 rounded-lg font-medium cursor-pointer whitespace-nowrap">
                Verify Account
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <AlertCircle size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
