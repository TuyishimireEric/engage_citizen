"use client";

import React, { useEffect } from "react";
import * as echarts from "echarts";
import { useDashboardData } from "@/hooks/dashboard/useDashboard";
import { SkeletonLoader } from "@/components/dashboard/skeleton";

const App: React.FC = () => {
  const { data, isLoading: loading } = useDashboardData();

  useEffect(() => {
    if (!data || loading) return;

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // === Line Chart ===
    const lineChartDom = document.getElementById("trend-chart");
    if (lineChartDom) {
      const lineChart = echarts.init(lineChartDom, isDark ? 'dark' : undefined);

      const dates = Object.keys(data.submittedByDate);
      const counts = Object.values(data.submittedByDate);

      const lineOption = {
        tooltip: { trigger: "axis" },
        grid: {
          left: "3%", right: "4%", bottom: "3%", top: "10%", containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { type: "dashed" } },
        },
        series: [
          {
            name: "Complaints",
            type: "line",
            smooth: true,
            data: counts,
            itemStyle: { color: "#3498DB" },
            lineStyle: { width: 3 },
            areaStyle: {
              color: {
                type: "linear",
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(52, 152, 219, 0.3)" },
                  { offset: 1, color: "rgba(52, 152, 219, 0.1)" },
                ],
              },
            },
            symbol: "circle",
            symbolSize: 8,
          },
        ],
        animation: false,
      };
      lineChart.setOption(lineOption);
    }

    // === Bar Chart ===
    const barChartDom = document.getElementById("distribution-chart");
    if (barChartDom) {
      const barChart = echarts.init(barChartDom, isDark ? 'dark' : undefined);

      const categoryTotal = data.categories.map((cat) => cat.total);
      const categoryResolved = data.categories.map((cat) => cat.resolved);

      const barOption = {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: {
          data: ["Total", "Resolved"],
          right: 0,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
        },
        grid: {
          left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.categories.map((_, index) => `Category ${index + 1}`),
          axisLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { type: "dashed" } },
        },
        series: [
          {
            name: "Total",
            data: categoryTotal,
            type: "bar",
            barWidth: "30%",
            itemStyle: { color: "#FFD166" },
          },
          {
            name: "Resolved",
            data: categoryResolved,
            type: "bar",
            barWidth: "30%",
            itemStyle: { color: "#FF6B6B" },
          },
        ],
        animation: false,
      };
      barChart.setOption(barOption);
    }

    // Resize on window change
    const handleResize = () => {
      echarts.getInstanceByDom(lineChartDom!)?.resize();
      echarts.getInstanceByDom(barChartDom!)?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      echarts.getInstanceByDom(lineChartDom!)?.dispose();
      echarts.getInstanceByDom(barChartDom!)?.dispose();
    };
  }, [data, loading]);

  if (loading || !data) {
    return (
      <div className="flex-1 max-h-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Loading dashboard data...</p>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="flex-1 max-h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Hi, Samantha. Welcome back to Complaint Admin!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Complaints",
            count: data.stats.totalComplaints,
            color: "bg-green-100 text-green-500",
            icon: "fas fa-clipboard-list",
          },
          {
            title: "Processing Status",
            count: data.stats.totalInProgress,
            color: "bg-teal-100 text-teal-500",
            icon: "fas fa-sync-alt",
          },
          {
            title: "Resolved Cases",
            count: data.stats.totalResolved,
            color: "bg-blue-100 text-blue-500",
            icon: "fas fa-check-circle",
          },
          {
            title: "Closed Cases",
            count: data.stats.totalClosed,
            color: "bg-green-100 text-green-500",
            icon: "fas fa-clock",
          },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{card.count}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{card.title}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                <i className={`${card.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Category Distribution
            </h3>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <div id="distribution-chart" className="w-full h-64" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Complaint Trend
            </h3>
            <button className="flex items-center text-blue-500 text-sm font-medium cursor-pointer rounded-md">
              <i className="fas fa-download mr-1"></i> Save Report
            </button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Daily complaint submissions over time
          </div>
          <div id="trend-chart" className="w-full h-64" />
        </div>
      </div>
    </div>
  );
};

export default App;
