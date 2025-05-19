"use client";

import React from "react";

import { SearchComplaints } from "../common/SearchComplaints";

export function Welcome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto pt-20 sm:pt-32 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-green-100 dark:bg-green-900/20 rounded-full opacity-10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-10 blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            {/* Status badge */}
            <div className="inline-flex items-center bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-5">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-green-400"></span>
              </span>
              <span className="hidden sm:inline">Feedback & Issue Resolution Platform</span>
              <span className="sm:hidden">Feedback Platform</span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 leading-tight px-2">
              <span className="block sm:inline">Make Your Voice</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-green-600 dark:text-green-400 relative inline-block">
                Heard
                <span className="absolute bottom-0.5 sm:bottom-1 left-0 w-full h-2 sm:h-3 bg-green-100 dark:bg-green-900/40 -z-10 transform -rotate-1 opacity-80"></span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mt-3 sm:mt-4 px-4 leading-relaxed">
              <span className="hidden sm:inline">
                Report issues, suggest improvements, and track resolutions in one
                place. Your feedback drives our improvements.
              </span>
              <span className="sm:hidden">
                Report issues, suggest improvements, and track resolutions. Your feedback drives our improvements.
              </span>
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <SearchComplaints />
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center sm:hidden">
              <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Submit Feedback
              </button>
              <button className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Browse Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}