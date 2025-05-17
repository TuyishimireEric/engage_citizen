"use client";

import React, { useState, useEffect } from "react";
import { Info, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useAddComplaint } from "@/hooks/complains/useAddComplaint";
import { SuccessModal } from "@/components/complaints/Success";
import { NotificationModal } from "@/components/common/NotificationModal";

const AddComplaint = () => {
  const {
    isSubmitting,
    showSuccessModal,
    trackingId,
    is_public,
    error,
    register,
    errors,
    handleSubmit,
    onSubmit,
    setIsPublic,
    closeSuccessModal,
  } = useAddComplaint();

  const [showErrorNotification, setShowErrorNotification] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorNotification(true);
      const timer = setTimeout(() => setShowErrorNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Add New Complaint
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Submit a new issue or suggestion. Be as detailed as possible to
              help us address your concerns quickly.
            </p>
          </div>

          {/* Complaint Form */}
          <div className="rounded-xl ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Title (Optional)
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 focus:border-green-500 dark:focus:border-green-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Brief summary of your complaint"
                />
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description should be at least 10 characters",
                    },
                  })}
                  rows={8}
                  className={`w-full px-4 py-3 border ${
                    errors.description
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-green-200 dark:focus:ring-green-800 focus:border-green-500"
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  placeholder="Please provide a detailed description of your issue or suggestion"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Is Public Toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visibility
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsPublic(!is_public)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      is_public
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  >
                    <span className="sr-only">Toggle visibility</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200 ${
                        is_public ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                  <div className="ml-3 flex items-center">
                    {is_public ? (
                      <>
                        <Eye className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Public - Others can see and upvote
                        </span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Private - Only visible to you and staff
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                  <Info className="h-4 w-4 mr-1.5 text-blue-500 dark:text-blue-400" />
                  Contact Information (Optional)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      {...register("fullname")}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 focus:border-green-500 dark:focus:border-green-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="Your name"
                    />
                  </div>

                  {/* email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-2.5 border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:ring-green-200 dark:focus:ring-green-800 focus:border-green-500"
                      } rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                      placeholder="Your contact email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-3" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Complaint"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Notifications */}

      {showSuccessModal && (
        <SuccessModal
          closeSuccessModal={closeSuccessModal}
          trackingId={trackingId}
        />
      )}

      {showErrorNotification && error && (
        <NotificationModal
          type="error"
          message={error}
          onClose={() => setShowErrorNotification(false)}
        />
      )}
    </div>
  );
};

export default AddComplaint;
