import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import { BarChart3, TrendingUp, PieChart, Target } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const HealthChartsWorking = ({ filters = { center: 'all', category: 'all' } }) => {
  // Dynamic chart data based on filters
  const getChartData = () => {
    // Category-specific chart data
    if (filters.category === 'child') {
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Child Malnutrition Cases',
              data: [8, 9, 12, 10, 8, 7],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Child Anemia Cases',
              data: [12, 15, 18, 16, 14, 18],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Growth Monitoring Coverage %',
              data: [85, 87, 89, 90, 89, 89],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: filters.center === 'all' ? ['Ward 9 Child Health'] : 
                 filters.center === 'akkarakunnu' ? ['Akkarakunnu - Child Health'] : 
                 ['Veliyanoor - Child Health'],
          datasets: [
            {
              label: 'Child Immunization Coverage %',
              data: filters.center === 'all' ? [92] : 
                   filters.center === 'akkarakunnu' ? [96] : [88],
              backgroundColor: ['rgba(16, 185, 129, 0.8)'],
              borderColor: ['rgb(16, 185, 129)'],
              borderWidth: 2,
            }
          ]
        }
      };
    } else if (filters.category === 'pregnancy') {
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'High Risk Pregnancies',
              data: [5, 7, 8, 6, 4, 5],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Maternal Anemia Cases',
              data: [8, 10, 12, 11, 9, 16],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Maternal Compliance %',
              data: [75, 78, 80, 82, 81, 78],
              borderColor: 'rgb(139, 92, 246)',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: filters.center === 'all' ? ['Ward 9 Maternal Health'] : 
                 filters.center === 'akkarakunnu' ? ['Akkarakunnu - Maternal'] : 
                 ['Veliyanoor - Maternal'],
          datasets: [
            {
              label: 'Maternal Compliance %',
              data: filters.center === 'all' ? [78] : 
                   filters.center === 'akkarakunnu' ? [85] : [71],
              backgroundColor: ['rgba(139, 92, 246, 0.8)'],
              borderColor: ['rgb(139, 92, 246)'],
              borderWidth: 2,
            }
          ]
        }
      };
    } else if (filters.category === 'adolescent') {
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Adolescent Anemia Cases',
              data: [3, 4, 5, 6, 5, 8],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Adolescent Immunization %',
              data: [78, 80, 82, 85, 85, 85],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Nutritional Assessment %',
              data: [70, 72, 75, 78, 76, 72],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: filters.center === 'all' ? ['Ward 9 Adolescent Health'] : 
                 filters.center === 'akkarakunnu' ? ['Akkarakunnu - Adolescent'] : 
                 ['Veliyanoor - Adolescent'],
          datasets: [
            {
              label: 'Adolescent Health Coverage %',
              data: filters.center === 'all' ? [85] : 
                   filters.center === 'akkarakunnu' ? [88] : [82],
              backgroundColor: ['rgba(59, 130, 246, 0.8)'],
              borderColor: ['rgb(59, 130, 246)'],
              borderWidth: 2,
            }
          ]
        }
      };
    } else if (filters.center === 'akkarakunnu') {
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Malnutrition Cases - Akkarakunnu',
              data: [8, 10, 12, 9, 7, 6],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Anemia Cases - Akkarakunnu',
              data: [15, 18, 20, 17, 16, 18],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Growth Monitoring % - Akkarakunnu',
              data: [90, 92, 94, 95, 94, 94],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: ['Akkarakunnu Center'],
          datasets: [
            {
              label: 'Immunization Coverage %',
              data: [94],
              backgroundColor: ['rgba(16, 185, 129, 0.8)'],
              borderColor: ['rgb(16, 185, 129)'],
              borderWidth: 2,
            }
          ]
        }
      };
    } else if (filters.center === 'veliyanoor') {
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Malnutrition Cases - Veliyanoor',
              data: [7, 8, 10, 10, 9, 8],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Anemia Cases - Veliyanoor',
              data: [13, 14, 15, 14, 13, 16],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Growth Monitoring % - Veliyanoor',
              data: [74, 78, 82, 84, 84, 84],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: ['Veliyanoor Center'],
          datasets: [
            {
              label: 'Immunization Coverage %',
              data: [88],
              backgroundColor: ['rgba(139, 92, 246, 0.8)'],
              borderColor: ['rgb(139, 92, 246)'],
              borderWidth: 2,
            }
          ]
        }
      };
    } else {
      // Default data for 'all' centers
      return {
        healthTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Malnutrition Cases',
              data: [15, 18, 22, 19, 16, 14],
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Anemia Cases',
              data: [28, 32, 35, 31, 29, 34],
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4,
            },
            {
              label: 'Growth Monitoring %',
              data: [82, 85, 87, 89, 88, 89],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4,
            }
          ]
        },
        immunization: {
          labels: ['Ward 9 Overall', 'Akkarakunnu Center', 'Veliyanoor Center'],
          datasets: [
            {
              label: 'Immunization Coverage %',
              data: [91, 94, 88],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(139, 92, 246, 0.8)',
              ],
              borderColor: [
                'rgb(59, 130, 246)',
                'rgb(16, 185, 129)',
                'rgb(139, 92, 246)',
              ],
              borderWidth: 2,
            }
          ]
        }
      };
    }
  };

  const chartData = getChartData();
  const healthTrendsData = chartData.healthTrends;
  const immunizationData = chartData.immunization;

  const nutritionData = {
    labels: ['Normal', 'Underweight', 'Severe'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const radarData = {
    labels: ['Nutrition', 'Immunization', 'Growth', 'Anemia Prevention', 'Maternal Care', 'Hygiene'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 92, 89, 76, 88, 82],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(99, 102, 241)',
      },
      {
        label: 'Target',
        data: [95, 95, 95, 90, 95, 90],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(34, 197, 94)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)',
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Health Trends Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            {filters.category === 'child' ? 'Child Health Trends' :
             filters.category === 'pregnancy' ? 'Maternal Health Trends' :
             filters.category === 'adolescent' ? 'Adolescent Health Trends' :
             `Health Trends - ${filters.center === 'all' ? 'Ward 9' : 
              filters.center === 'akkarakunnu' ? 'Akkarakunnu Center' : 
              'Veliyanoor Center'}`}
          </h3>
          <div className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</div>
        </div>
        <div className="h-64">
          <Line data={healthTrendsData} options={chartOptions} />
        </div>
      </div>

      {/* Nutrition Distribution Pie Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-500" />
            Nutrition Distribution
          </h3>
          <div className="text-xs text-gray-500">Total: 100%</div>
        </div>
        <div className="h-64">
          <Pie data={nutritionData} options={pieOptions} />
        </div>
      </div>

      {/* Immunization Coverage Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            {filters.category === 'child' ? 'Child Health Coverage' :
             filters.category === 'pregnancy' ? 'Maternal Health Compliance' :
             filters.category === 'adolescent' ? 'Adolescent Health Coverage' :
             `Immunization Coverage - ${filters.center === 'all' ? 'Ward 9' : 
              filters.center === 'akkarakunnu' ? 'Akkarakunnu Center' : 
              'Veliyanoor Center'}`}
          </h3>
          <div className="text-xs text-gray-500">Target: 95%</div>
        </div>
        <div className="h-64">
          <Bar data={immunizationData} options={chartOptions} />
        </div>
      </div>

      {/* Performance Radar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Overall Performance Radar
          </h3>
          <div className="text-xs text-gray-500">vs Targets</div>
        </div>
        <div className="h-64">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>
    </div>
  );
};

export default HealthChartsWorking;