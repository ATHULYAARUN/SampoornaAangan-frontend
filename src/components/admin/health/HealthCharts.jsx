import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
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
  Title,
  Tooltip,
  Legend
);

const HealthCharts = ({ data, language }) => {
  const getTranslation = (key) => {
    const translations = {
      en: {
        monthlyTrends: 'Monthly Health Trends',
        wardComparison: 'Health Status by Ward',
        nutritionDistribution: 'Nutrition Status Distribution',
        performanceRadar: 'Multi-dimensional Health Performance',
        malnutrition: 'Malnutrition Cases',
        anemia: 'Anemia Cases',
        growth: 'Growth Tracking (%)',
        ward: 'Ward',
        cases: 'Cases',
        normal: 'Normal',
        underweight: 'Underweight',
        severe: 'Severe Malnutrition',
        immunization: 'Immunization',
        maternal: 'Maternal Health',
        nutrition: 'Nutrition',
        sanitation: 'Sanitation'
      },
      ml: {
        monthlyTrends: 'മാസിക ആരോഗ്യ പ്രവണതകൾ',
        wardComparison: 'വാർഡ് അനുസരിച്ച് ആരോഗ്യ നില',
        nutritionDistribution: 'പോഷകാഹാര നില വിതരണം',
        performanceRadar: 'ബഹുമാന ആരോഗ്യ പ്രകടനം',
        malnutrition: 'പോഷകാഹാരക്കുറവ് കേസുകൾ',
        anemia: 'അനീമിയ കേസുകൾ',
        growth: 'വളർച്ചാ ട്രാക്കിംഗ് (%)',
        ward: 'വാർഡ്',
        cases: 'കേസുകൾ',
        normal: 'സാധാരണ',
        underweight: 'ഭാരക്കുറവ്',
        severe: 'ഗുരുതര പോഷകാഹാരക്കുറവ്',
        immunization: 'പ്രതിരോധ കുത്തിവയ്പ്പ്',
        maternal: 'മാതൃ ആരോഗ്യം',
        nutrition: 'പോഷകാഹാരം',
        sanitation: 'ശുചിത്വം'
      }
    };
    return translations[language][key] || key;
  };

  // Line Chart Data - Monthly Trends
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: getTranslation('malnutrition'),
        data: data?.malnutrition || [15, 18, 22, 19, 16, 14],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: getTranslation('anemia'),
        data: data?.anemia || [28, 32, 35, 31, 29, 34],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: getTranslation('growth'),
        data: data?.growth || [82, 85, 87, 89, 88, 89],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Bar Chart Data - Ward Comparison
  const barChartData = {
    labels: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'],
    datasets: [
      {
        label: getTranslation('malnutrition'),
        data: [12, 19, 15, 8, 22],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      },
      {
        label: getTranslation('anemia'),
        data: [28, 35, 31, 25, 38],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 1
      }
    ]
  };

  // Pie Chart Data - Nutrition Distribution
  const pieChartData = {
    labels: [getTranslation('normal'), getTranslation('underweight'), getTranslation('severe')],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2
      }
    ]
  };

  // Radar Chart Data - Multi-dimensional Performance
  const radarChartData = {
    labels: [
      getTranslation('immunization'),
      getTranslation('maternal'),
      getTranslation('nutrition'),
      getTranslation('growth'),
      getTranslation('sanitation')
    ],
    datasets: [
      {
        label: 'Ward 1',
        data: [92, 78, 85, 89, 82],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      },
      {
        label: 'Ward 3',
        data: [88, 72, 79, 85, 79],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(168, 85, 247)'
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
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
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
        bodyColor: 'white'
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Line Chart - Monthly Trends */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {getTranslation('monthlyTrends')}
            </h3>
          </div>
          <div className="text-sm text-gray-500">Last 6 months</div>
        </div>
        <div className="h-64">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      {/* Bar Chart and Pie Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {getTranslation('wardComparison')}
            </h3>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {getTranslation('nutritionDistribution')}
            </h3>
          </div>
          <div className="h-64">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Radar Chart - Performance Overview */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {getTranslation('performanceRadar')}
            </h3>
          </div>
          <div className="text-sm text-gray-500">Cross-center comparison</div>
        </div>
        <div className="h-80">
          <Radar data={radarChartData} options={radarOptions} />
        </div>
      </div>
    </div>
  );
};

export default HealthCharts;