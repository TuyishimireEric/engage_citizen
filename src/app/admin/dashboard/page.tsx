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

    // Enhanced dark theme configuration
    const darkTheme = {
      backgroundColor: 'transparent',
      textStyle: {
        color: '#e5e7eb', // gray-200
        fontFamily: 'system-ui, -apple-system, sans-serif'
      },
      title: {
        textStyle: {
          color: '#f9fafb' // gray-50
        }
      },
      legend: {
        textStyle: {
          color: '#d1d5db' // gray-300
        }
      },
      grid: {
        borderColor: '#374151' // gray-700
      },
      categoryAxis: {
        axisLine: {
          lineStyle: {
            color: '#4b5563' // gray-600
          }
        },
        axisTick: {
          lineStyle: {
            color: '#4b5563'
          }
        },
        axisLabel: {
          color: '#9ca3af' // gray-400
        },
        splitLine: {
          lineStyle: {
            color: '#374151'
          }
        }
      },
      valueAxis: {
        axisLine: {
          lineStyle: {
            color: '#4b5563'
          }
        },
        axisTick: {
          lineStyle: {
            color: '#4b5563'
          }
        },
        axisLabel: {
          color: '#9ca3af'
        },
        splitLine: {
          lineStyle: {
            color: '#374151'
          }
        }
      }
    };

    // Light theme configuration
    const lightTheme = {
      backgroundColor: 'transparent',
      textStyle: {
        color: '#374151', // gray-700
        fontFamily: 'system-ui, -apple-system, sans-serif'
      },
      title: {
        textStyle: {
          color: '#111827' // gray-900
        }
      },
      legend: {
        textStyle: {
          color: '#4b5563' // gray-600
        }
      },
      grid: {
        borderColor: '#e5e7eb' // gray-200
      },
      categoryAxis: {
        axisLine: {
          lineStyle: {
            color: '#d1d5db' // gray-300
          }
        },
        axisTick: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisLabel: {
          color: '#6b7280' // gray-500
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6' // gray-100
          }
        }
      },
      valueAxis: {
        axisLine: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisTick: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisLabel: {
          color: '#6b7280'
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6'
          }
        }
      }
    };

    const currentTheme = isDark ? darkTheme : lightTheme;

    // === Line Chart ===
    const lineChartDom = document.getElementById("trend-chart");
    if (lineChartDom) {
      const lineChart = echarts.init(lineChartDom);
      
      // Apply theme
      lineChart.setOption(currentTheme);

      const dates = Object.keys(data.submittedByDate);
      const counts = Object.values(data.submittedByDate);

      const lineOption = {
        tooltip: { 
          trigger: "axis",
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
          textStyle: {
            color: isDark ? '#f9fafb' : '#111827'
          }
        },
        grid: {
          left: "3%", 
          right: "4%", 
          bottom: "3%", 
          top: "10%", 
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
          axisLine: {
            lineStyle: {
              color: isDark ? '#4b5563' : '#d1d5db'
            }
          },
          axisLabel: {
            color: isDark ? '#9ca3af' : '#6b7280'
          }
        },
        yAxis: {
          type: "value",
          splitLine: { 
            lineStyle: { 
              type: "dashed",
              color: isDark ? '#374151' : '#f3f4f6'
            } 
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#4b5563' : '#d1d5db'
            }
          },
          axisLabel: {
            color: isDark ? '#9ca3af' : '#6b7280'
          }
        },
        series: [
          {
            name: "Complaints",
            type: "line",
            smooth: true,
            data: counts,
            itemStyle: { 
              color: isDark ? "#60a5fa" : "#3b82f6" // blue-400 : blue-500
            },
            lineStyle: { 
              width: 3,
              color: isDark ? "#60a5fa" : "#3b82f6"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: isDark ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.3)" },
                  { offset: 1, color: isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)" },
                ],
              },
            },
            symbol: "circle",
            symbolSize: 8,
          },
        ],
        animation: true,
        animationDuration: 1000,
      };
      lineChart.setOption(lineOption);
    }

    // === Bar Chart ===
    const barChartDom = document.getElementById("distribution-chart");
    if (barChartDom) {
      const barChart = echarts.init(barChartDom);
      
      // Apply theme
      barChart.setOption(currentTheme);

      const categoryTotal = data.categories.map((cat) => cat.total);
      const categoryResolved = data.categories.map((cat) => cat.resolved);
      
      // Get actual category names instead of "Category 1, Category 2"
      const categoryNames = data.categories.map((cat) => {
        // If the category has a name property, use it; otherwise use the id
        return cat.name || cat.id || `Category ${cat.id}`;
      });

      const barOption = {
        tooltip: { 
          trigger: "axis", 
          axisPointer: { type: "shadow" },
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
          textStyle: {
            color: isDark ? '#f9fafb' : '#111827'
          }
        },
        legend: {
          data: ["Total", "Resolved"],
          right: 0,
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: isDark ? '#d1d5db' : '#4b5563'
          }
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
          data: categoryNames,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: isDark ? '#9ca3af' : '#6b7280',
            interval: 0,
            rotate: categoryNames.some(name => name.length > 10) ? 45 : 0
          }
        },
        yAxis: {
          type: "value",
          splitLine: { 
            lineStyle: { 
              type: "dashed",
              color: isDark ? '#374151' : '#f3f4f6'
            } 
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#4b5563' : '#d1d5db'
            }
          },
          axisLabel: {
            color: isDark ? '#9ca3af' : '#6b7280'
          }
        },
        series: [
          {
            name: "Total",
            data: categoryTotal,
            type: "bar",
            barWidth: "35%",
            itemStyle: { 
              color: isDark ? "#fbbf24" : "#f59e0b", // amber-400 : amber-500
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: isDark ? "#fcd34d" : "#d97706"
              }
            }
          },
          {
            name: "Resolved",
            data: categoryResolved,
            type: "bar",
            barWidth: "35%",
            itemStyle: { 
              color: isDark ? "#34d399" : "#10b981", // emerald-400 : emerald-500
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: isDark ? "#6ee7b7" : "#059669"
              }
            }
          },
        ],
        animation: true,
        animationDuration: 1000,
        animationDelay: (idx: number) => idx * 100,
      };
      barChart.setOption(barOption);
    }

    // Resize on window change
    const handleResize = () => {
      echarts.getInstanceByDom(lineChartDom!)?.resize();
      echarts.getInstanceByDom(barChartDom!)?.resize();
    };

    // Theme change listener
    const handleThemeChange = () => {
      // Re-initialize charts with new theme
      if (lineChartDom && barChartDom) {
        echarts.getInstanceByDom(lineChartDom!)?.dispose();
        echarts.getInstanceByDom(barChartDom!)?.dispose();
        // Trigger re-render by updating the effect dependencies
        setTimeout(() => {
          // This will cause the effect to re-run with the new theme
        }, 100);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener('change', handleThemeChange);
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
            color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
            icon: "fas fa-clipboard-list",
          },
          {
            title: "Processing Status",
            count: data.stats.totalInProgress,
            color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
            icon: "fas fa-sync-alt",
          },
          {
            title: "Resolved Cases",
            count: data.stats.totalResolved,
            color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            icon: "fas fa-check-circle",
          },
          {
            title: "Closed Cases",
            count: data.stats.totalClosed,
            color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
            icon: "fas fa-clock",
          },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Category Distribution
            </h3>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <div id="distribution-chart" className="w-full h-64" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Complaint Trend
            </h3>
            <button className="flex items-center text-blue-500 dark:text-blue-400 text-sm font-medium cursor-pointer rounded-md hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
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