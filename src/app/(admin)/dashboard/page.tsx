// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";

import React, { useState } from "react";
import * as echarts from "echarts";
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showValue, setShowValue] = useState<boolean>(true);
  const [filterPeriod, setFilterPeriod] = useState<string>(
    "17 Apr 2025 - 17 May 2025"
  );
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("Weekly");
  const [isTimeframeOpen, setIsTimeframeOpen] = useState<boolean>(false);
  React.useEffect(() => {
    // Initialize pie charts
    const chartElements = [
      { id: "resolution-rate-chart", value: 81, color: "#FF6B6B" },
      { id: "customer-satisfaction-chart", value: 22, color: "#4ECDC4" },
      { id: "response-time-chart", value: 62, color: "#3498DB" },
    ];
    chartElements.forEach((item) => {
      const chartDom = document.getElementById(item.id);
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          series: [
            {
              type: "pie",
              radius: ["70%", "90%"],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: "center",
                formatter: `${item.value}%`,
                fontSize: 20,
                fontWeight: "bold",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: "bold",
                },
              },
              data: [
                {
                  value: item.value,
                  name: "Completed",
                  itemStyle: { color: item.color },
                },
                {
                  value: 100 - item.value,
                  name: "Remaining",
                  itemStyle: { color: "#f0f0f0" },
                },
              ],
              animation: false,
            },
          ],
        };
        myChart.setOption(option);
      }
    });
    // Initialize line chart
    const lineChartDom = document.getElementById("trend-chart");
    if (lineChartDom) {
      const lineChart = echarts.init(lineChartDom);
      const lineOption = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "Complaints",
            type: "line",
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              color: "#3498DB",
            },
            lineStyle: {
              width: 3,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(52, 152, 219, 0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(52, 152, 219, 0.1)",
                  },
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
    // Initialize comparative chart
    const comparativeChartDom = document.getElementById("comparative-chart");
    if (comparativeChartDom) {
      const comparativeChart = echarts.init(comparativeChartDom);
      const comparativeOption = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["2024", "2025"],
          right: 0,
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#666",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}k",
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "2024",
            type: "line",
            smooth: true,
            data: [30, 25, 35, 45, 40, 35, 30, 35, 40, 45, 50, 45],
            itemStyle: {
              color: "#3498DB",
            },
            lineStyle: {
              width: 3,
            },
            markPoint: {
              data: [
                {
                  coord: [3, 45],
                  symbol: "circle",
                  symbolSize: 8,
                  itemStyle: { color: "#3498DB" },
                },
              ],
            },
          },
          {
            name: "2025",
            type: "line",
            smooth: true,
            data: [20, 30, 25, 50, 40, 60, 55, 45, 50, 55, 60, 55],
            itemStyle: {
              color: "#FF6B6B",
            },
            lineStyle: {
              width: 3,
            },
            markPoint: {
              data: [
                {
                  coord: [10, 55],
                  symbol: "circle",
                  symbolSize: 8,
                  itemStyle: { color: "#FF6B6B" },
                },
              ],
            },
          },
        ],
        animation: false,
      };
      comparativeChart.setOption(comparativeOption);
    }
    // Initialize bar chart
    const barChartDom = document.getElementById("distribution-chart");
    if (barChartDom) {
      const barChart = echarts.init(barChartDom);
      const barOption = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Sun", "Sun", "Sun", "Sun", "Sun", "Sun", "Sun"],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          max: 80,
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            data: [
              { value: 70, itemStyle: { color: "#FFD166" } },
              { value: 40, itemStyle: { color: "#FF6B6B" } },
              { value: 70, itemStyle: { color: "#FFD166" } },
              { value: 40, itemStyle: { color: "#FF6B6B" } },
              { value: 70, itemStyle: { color: "#FFD166" } },
              { value: 30, itemStyle: { color: "#FFD166" } },
              { value: 70, itemStyle: { color: "#FF6B6B" } },
            ],
            type: "bar",
            barWidth: "40%",
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        animation: false,
      };
      barChart.setOption(barOption);
    }
    // Handle window resize
    const handleResize = () => {
      chartElements.forEach((item) => {
        const chartDom = document.getElementById(item.id);
        if (chartDom) {
          const chart = echarts.getInstanceByDom(chartDom);
          chart?.resize();
        }
      });
      const lineChart = echarts.getInstanceByDom(
        document.getElementById("trend-chart")!
      );
      lineChart?.resize();
      const comparativeChart = echarts.getInstanceByDom(
        document.getElementById("comparative-chart")!
      );
      comparativeChart?.resize();
      const barChart = echarts.getInstanceByDom(
        document.getElementById("distribution-chart")!
      );
      barChart?.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chartElements.forEach((item) => {
        const chartDom = document.getElementById(item.id);
        if (chartDom) {
          const chart = echarts.getInstanceByDom(chartDom);
          chart?.dispose();
        }
      });
      const lineChart = echarts.getInstanceByDom(
        document.getElementById("trend-chart")!
      );
      lineChart?.dispose();
      const comparativeChart = echarts.getInstanceByDom(
        document.getElementById("comparative-chart")!
      );
      comparativeChart?.dispose();
      const barChart = echarts.getInstanceByDom(
        document.getElementById("distribution-chart")!
      );
      barChart?.dispose();
    };
  }, []);
  return (
    <div className="flex-1 max-h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Hi, Samantha. Welcome back to Complaint Admin!
            </p>
          </div>
          <div className="relative">
            <button
              className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <i className="fas fa-calendar-alt mr-2 text-blue-500"></i>
              <span>Filter Period</span>
              <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Select Period</h3>
                </div>
                <div className="p-3">
                  <div className="mb-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() => {
                        setFilterPeriod("17 Apr 2025 - 17 May 2025");
                        setIsFilterOpen(false);
                      }}
                    >
                      Last 30 days
                    </button>
                  </div>
                  <div className="mb-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() => {
                        setFilterPeriod("17 Feb 2025 - 17 May 2025");
                        setIsFilterOpen(false);
                      }}
                    >
                      Last 90 days
                    </button>
                  </div>
                  <div className="mb-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() => {
                        setFilterPeriod("1 Jan 2025 - 17 May 2025");
                        setIsFilterOpen(false);
                      }}
                    >
                      Year to date
                    </button>
                  </div>
                  <div className="mb-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() => {
                        setFilterPeriod("Custom Range");
                        setIsFilterOpen(false);
                      }}
                    >
                      Custom Range
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">75</h2>
                <p className="text-gray-600 mt-1">Total Complaints</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-arrow-up text-green-500 mr-1"></i>
                  <span className="text-xs text-green-500">+5.25%</span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-clipboard-list text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">357</h2>
                <p className="text-gray-600 mt-1">Processing Status</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-arrow-up text-green-500 mr-1"></i>
                  <span className="text-xs text-green-500">+2.35%</span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <i className="fas fa-sync-alt text-teal-500 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">65</h2>
                <p className="text-gray-600 mt-1">Resolved Cases</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-arrow-up text-green-500 mr-1"></i>
                  <span className="text-xs text-green-500">+3.75%</span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-check-circle text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">128</h2>
                <p className="text-gray-600 mt-1">Resolution Time (hrs)</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-arrow-down text-red-500 mr-1"></i>
                  <span className="text-xs text-red-500">-1.25%</span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-clock text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Charts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Performance Metrics
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-xs rounded-md ${
                    !showValue
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  } cursor-pointer !rounded-button whitespace-nowrap`}
                  onClick={() => setShowValue(false)}
                >
                  Chart
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded-md ${
                    showValue
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  } cursor-pointer !rounded-button whitespace-nowrap`}
                  onClick={() => setShowValue(true)}
                >
                  Show Value
                </button>
                <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div id="resolution-rate-chart" className="w-full h-40"></div>
                <p className="text-sm text-gray-700 mt-2">Resolution Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  id="customer-satisfaction-chart"
                  className="w-full h-40"
                ></div>
                <p className="text-sm text-gray-700 mt-2">
                  Customer Satisfaction
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div id="response-time-chart" className="w-full h-40"></div>
                <p className="text-sm text-gray-700 mt-2">Response Time</p>
              </div>
            </div>
          </div>
          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Complaint Trend
              </h3>
              <button className="flex items-center text-blue-500 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-download mr-1"></i>
                Save Report
              </button>
            </div>
            <div className="text-xs text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
            <div id="trend-chart" className="w-full h-64"></div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comparative Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Complaint Analysis
              </h3>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs text-gray-600">2024</span>
                <span className="w-3 h-3 rounded-full bg-red-500 ml-2"></span>
                <span className="text-xs text-gray-600">2025</span>
              </div>
            </div>
            <div id="comparative-chart" className="w-full h-72"></div>
          </div>
          {/* Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Complaint Distribution
              </h3>
              <div className="relative">
                <button
                  className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                >
                  <span>{selectedTimeframe}</span>
                  <i className="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
                </button>
                {isTimeframeOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedTimeframe("Daily");
                          setIsTimeframeOpen(false);
                        }}
                      >
                        Daily
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedTimeframe("Weekly");
                          setIsTimeframeOpen(false);
                        }}
                      >
                        Weekly
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedTimeframe("Monthly");
                          setIsTimeframeOpen(false);
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div id="distribution-chart" className="w-full h-72"></div>
          </div>
        </div>
        {/* Customer Review Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Customer Review
            </h3>
            <div className="flex space-x-2">
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-500 cursor-pointer">
                <i className="fas fa-chevron-left text-xs"></i>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-500 cursor-pointer">
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Each issue systematically tracked until resolution
          </p>
        </div>
      </div>
    </div>
  );
};
export default App;
