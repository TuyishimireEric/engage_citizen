"use client";

import useComplaintDetails from "@/hooks/complains/useComplaintDetails";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [showReassignModal, setShowReassignModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>("In Progress");
  const [currentPriority, setCurrentPriority] = useState<string>("High");
  const params = useParams();
  let complaintId = params?.complaint_id || "";
  if (Array.isArray(complaintId)) {
    complaintId = complaintId[0] || "";
  }

  const { data: complaintData } = useComplaintDetails({
    complaint_id: complaintId,
  });

  console.log("Complaint Data:", complaintData);

  useEffect(() => {
    // Here you would typically fetch the complaint data using the ID
    console.log(`Fetching complaint with ID: ${complaintId}`);
    // fetchComplaintData(complaintId);
  }, [complaintId]);

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Priority indicator color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Sample communication history
  const communications = [
    {
      id: 1,
      sender: "John Smith",
      senderType: "customer",
      timestamp: "2025-05-15T09:30:00",
      content:
        "I received a defective product. The screen has dead pixels and the battery doesn't hold a charge for more than an hour. I'd like a replacement or refund as soon as possible.",
      attachments: ["defect_photo.jpg"],
    },
    {
      id: 2,
      sender: "Alex Johnson",
      senderType: "agent",
      timestamp: "2025-05-15T10:15:00",
      content:
        "I'm sorry to hear about the issues with your product. Could you please provide your order number and the serial number of the device? This will help us process your request faster.",
    },
    {
      id: 3,
      sender: "John Smith",
      senderType: "customer",
      timestamp: "2025-05-15T10:45:00",
      content:
        "My order number is #ORD-28591 and the serial number is SN-XJ29087. I purchased it just two weeks ago and expected better quality.",
      attachments: ["receipt.pdf"],
    },
    {
      id: 4,
      sender: "Alex Johnson",
      senderType: "agent",
      timestamp: "2025-05-15T11:30:00",
      content:
        "Thank you for providing that information. I've reviewed your purchase and you're definitely covered under our warranty. I've initiated a replacement process. You'll receive a prepaid shipping label via email to return the defective item.",
    },
    {
      id: 5,
      sender: "System",
      senderType: "system",
      timestamp: "2025-05-15T11:32:00",
      content: 'Complaint status changed from "Open" to "In Progress"',
    },
  ];

  // Sample status history
  const statusHistory = [
    {
      status: "Open",
      timestamp: "2025-05-15T09:30:00",
      agent: "System",
      note: "Complaint submitted by customer",
    },
    {
      status: "Assigned",
      timestamp: "2025-05-15T09:45:00",
      agent: "System",
      note: "Automatically assigned to Alex Johnson based on product category",
    },
    {
      status: "In Progress",
      timestamp: "2025-05-15T11:32:00",
      agent: "Alex Johnson",
      note: "Verified customer purchase details and initiated replacement process",
    },
  ];

  // Sample agents for reassignment
  const agents = [
    {
      id: 1,
      name: "Alex Johnson",
      department: "Product Support",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520friendly%2520smile%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=50&height=50&seq=1&orientation=squarish",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      department: "Billing Support",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520woman%2520with%2520medium%2520length%2520hair%2520and%2520glasses%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=50&height=50&seq=2&orientation=squarish",
    },
    {
      id: 3,
      name: "David Thompson",
      department: "Technical Support",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520man%2520with%2520beard%2520and%2520glasses%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=50&height=50&seq=3&orientation=squarish",
    },
    {
      id: 4,
      name: "Emily Davis",
      department: "Customer Relations",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520woman%2520with%2520long%2520dark%2520hair%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=50&height=50&seq=4&orientation=squarish",
    },
  ];

  return (
    <div className="flex h-full my-2 bg-gray-50">
      {/* Complaint Detail Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center mb-2">
              <Link
                href="/complaints"
                className="text-gray-500 hover:text-blue-600 mr-2 cursor-pointer flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to Complaints
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Complaint Details
            </h1>
            <p className="text-gray-600">
              Complaint ID: <span className="font-medium">{complaintId}</span>
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full ${getPriorityColor(
                  currentPriority
                )} mr-2`}
              ></div>
              <span className="text-sm font-medium">
                {currentPriority} Priority
              </span>
            </div>
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer Info and Complaint Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Complaint Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Complaint Details
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                  <p className="text-gray-800 mt-1">Product Defect</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Description
                  </h3>
                  <p className="text-gray-800 mt-1">
                    I received a defective product. The screen has dead pixels
                    and the battery doesn't hold a charge for more than an hour.
                    I'd like a replacement or refund as soon as possible.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Category
                    </h3>
                    <p className="text-gray-800 mt-1">Electronics</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Subcategory
                    </h3>
                    <p className="text-gray-800 mt-1">Smartphones</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date Submitted
                    </h3>
                    <p className="text-gray-800 mt-1">May 15, 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Time Submitted
                    </h3>
                    <p className="text-gray-800 mt-1">09:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Assignment
                </h2>
                <button
                  onClick={() => setShowReassignModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                >
                  Reassign
                </button>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520friendly%2520smile%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=100&height=100&seq=6&orientation=squarish"
                    alt="Alex Johnson"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900">
                    Alex Johnson
                  </h3>
                  <p className="text-gray-600 text-sm">Product Support</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="text-sm text-gray-800">
                    alex.johnson@company.com
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Phone:</span>
                  <span className="text-sm text-gray-800">
                    +1 (555) 987-6543
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Assigned On:</span>
                  <span className="text-sm text-gray-800">
                    May 15, 2025 (09:45 AM)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">SLA Deadline:</span>
                  <span className="text-sm text-red-600 font-medium">
                    May 18, 2025 (09:45 AM)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Status Timeline and Communication History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-sync-alt mr-2"></i>
                  <span>Update Status</span>
                </button>
                <button
                  onClick={() => setShowReassignModal(true)}
                  className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 shadow-sm hover:bg-gray-50 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-user-friends mr-2 text-blue-500"></i>
                  <span>Reassign</span>
                </button>

                <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>Resolve Complaint</span>
                </button>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-gray-600 mr-3">Priority:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPriority("Low")}
                    className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
                      currentPriority === "Low"
                        ? "bg-green-100 text-green-800 font-medium"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Low
                  </button>
                  <button
                    onClick={() => setCurrentPriority("Medium")}
                    className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
                      currentPriority === "Medium"
                        ? "bg-yellow-100 text-yellow-800 font-medium"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setCurrentPriority("High")}
                    className={`px-3 py-1 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
                      currentPriority === "High"
                        ? "bg-red-100 text-red-800 font-medium"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    High
                  </button>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Status Timeline
              </h2>
              <div className="relative">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === statusHistory.length - 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.status === "Open" && (
                          <i className="fas fa-folder-open text-xs"></i>
                        )}
                        {item.status === "Assigned" && (
                          <i className="fas fa-user-check text-xs"></i>
                        )}
                        {item.status === "In Progress" && (
                          <i className="fas fa-spinner text-xs"></i>
                        )}
                        {item.status === "Resolved" && (
                          <i className="fas fa-check text-xs"></i>
                        )}
                        {item.status === "Closed" && (
                          <i className="fas fa-times text-xs"></i>
                        )}
                      </div>
                      {index !== statusHistory.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-medium text-gray-900">
                            {item.status}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.note}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">{item.agent}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Communication History
              </h2>
              <div className="space-y-6">
                {communications.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderType === "system"
                        ? "justify-center"
                        : message.senderType === "customer"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    {message.senderType === "system" ? (
                      <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                        <p className="text-sm text-gray-600">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.timestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`flex ${
                          message.senderType === "customer"
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-200 overflow-hidden ${
                            message.senderType === "customer" ? "mr-3" : "ml-3"
                          }`}
                        >
                          <img
                            src={
                              message.senderType === "customer"
                                ? "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520man%2520with%2520short%2520dark%2520hair%2520and%2520casual%2520professional%2520attire%252C%2520minimalist%2520light%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520friendly%2520expression&width=100&height=100&seq=7&orientation=squarish"
                                : "https://readdy.ai/api/search-image?query=professional%2520headshot%2520portrait%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520friendly%2520smile%252C%2520minimalist%2520background%252C%2520high%2520quality%252C%2520photorealistic%252C%2520soft%2520lighting%252C%2520professional%2520appearance&width=100&height=100&seq=8&orientation=squarish"
                            }
                            alt={message.sender}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div
                          className={`max-w-md ${
                            message.senderType === "customer"
                              ? "bg-gray-100"
                              : "bg-blue-50"
                          } rounded-lg px-4 py-3`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">
                              {message.sender}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800">
                            {message.content}
                          </p>
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {message.attachments.map(
                                  (attachment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center bg-white bg-opacity-50 px-2 py-1 rounded text-xs"
                                    >
                                      {attachment.endsWith(".jpg") ||
                                      attachment.endsWith(".png") ? (
                                        <i className="fas fa-image text-gray-500 mr-1"></i>
                                      ) : attachment.endsWith(".pdf") ? (
                                        <i className="fas fa-file-pdf text-gray-500 mr-1"></i>
                                      ) : (
                                        <i className="fas fa-file text-gray-500 mr-1"></i>
                                      )}
                                      <span>{attachment}</span>
                                      <button className="ml-1 text-gray-500 hover:text-blue-500 cursor-pointer">
                                        <i className="fas fa-download text-xs"></i>
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="relative">
                  <textarea
                    placeholder="Type your reply here..."
                    className="w-full px-4 py-3 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-500 resize-none"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                        <i className="fas fa-paperclip"></i>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                        <i className="fas fa-smile"></i>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                        <i className="fas fa-image"></i>
                      </button>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-150 cursor-pointer !rounded-button whitespace-nowrap">
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reassign Modal */}
      {showReassignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Reassign Complaint
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Agent
                </label>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="agent"
                        id={`agent-${agent.id}`}
                        className="mr-3"
                      />
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">
                          {agent.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {agent.department}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Reassignment
                </label>
                <textarea
                  placeholder="Enter reason for reassignment..."
                  className="w-full px-4 py-3 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowReassignModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReassignModal(false)}
                className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                Reassign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Update Status
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status
                </label>
                <div
                  className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(
                    currentStatus
                  )}`}
                >
                  {currentStatus}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Open", "In Progress", "Resolved", "Closed"].map(
                    (status) => (
                      <div
                        key={status}
                        onClick={() => setCurrentStatus(status)}
                        className={`px-4 py-2 rounded-lg text-center cursor-pointer border ${
                          currentStatus === status
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {status}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Note
                </label>
                <textarea
                  placeholder="Enter note about status change..."
                  className="w-full px-4 py-3 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex items-center mt-4">
                <input type="checkbox" id="notifyCustomer" className="mr-2" />
                <label
                  htmlFor="notifyCustomer"
                  className="text-sm text-gray-700"
                >
                  Notify customer about status change
                </label>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer !rounded-button whitespace-nowrap"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
