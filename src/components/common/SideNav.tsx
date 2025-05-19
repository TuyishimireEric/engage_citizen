"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sideMenus } from "@/utils/SideMenus";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useUser from "@/hooks/auth/useUser";

export default function SidebarMenu() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const { userProfile } = useUser();

  const filteredMenus = sideMenus.filter((menu) =>
    menu.roles.some((role) => role === userProfile?.role_id)
  );

  const activeItem = filteredMenus.find((item) =>
    pathname?.includes(item.url.toLocaleLowerCase())
  )?.id;

  return (
    <div
      className={`hidden sm:block relative ${
        isExpanded ? "w-44 max-w-44" : "w-20"
      } bg-white dark:bg-gray-900 shadow-md transition-all duration-300 rounded-br-3xl h-full`}
    >
      <div
        className={`p-6 flex ${
          isExpanded ? "justify-between" : "justify-center"
        } items-center`}
      >
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
              className={`${
                isExpanded ? "px-6" : "px-0 flex justify-center"
              } py-3 ${
                isActive
                  ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                  : ""
              } ${
                isActive && !isExpanded
                  ? "animate__animated animate__pulse"
                  : ""
              }`}
            >
              <Link
                href={item.url}
                className={`flex items-center ${
                  isExpanded ? "w-full" : "justify-center"
                } text-left cursor-pointer whitespace-nowrap`}
              >
                <Icon
                  className={`${isExpanded ? "mr-3" : ""} ${
                    isActive
                      ? "text-green-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  size={20}
                />
                {isExpanded && (
                  <span
                    className={`${
                      isActive
                        ? "text-green-500 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    } animate__animated animate__fadeIn cursor-pointer`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
