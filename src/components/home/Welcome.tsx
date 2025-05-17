"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Search,
  PlusCircle,
  Filter,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

import { ComplaintsList } from "../complaints/ComplaintsList";
import { SearchComplaints } from "../common/SearchComplaints";

export function Welcome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 pt-12 pb-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Feedback & Issue Resolution Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            Make Your Voice <br className="hidden sm:block" />
            <span className="text-green-600 relative inline-block">
              Heard
              <span className="absolute bottom-1 left-0 w-full h-3 bg-green-100 -z-10 transform -rotate-1 opacity-80"></span>
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Report issues, suggest improvements, and track resolutions in one
            place. Your feedback drives our improvements.
          </p>
        </div>

        <div className="space-y-6">
          <SearchComplaints />

          <ComplaintsList />
        </div>
      </div>
    </section>
  );
}
