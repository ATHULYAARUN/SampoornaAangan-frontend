import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Filter, 
  Calendar,
  MapPin,
  Bell,
  Eye,
  BarChart3,
  PieChart,
  Users,
  Baby,
  Syringe,
  Stethoscope,
  Target,
  Brain,
  FileText,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

import HealthSummaryCards from './health/HealthSummaryCards';
import HealthCharts from './health/HealthCharts';
import AlertsPanel from './health/AlertsPanel';
import HealthActivityLogs from './health/HealthActivityLogs';
import AIInsightsBox from './health/AIInsightsBox';
import HealthReportsModal from './health/HealthReportsModal';

const HealthMonitoring = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    ward: 'all',
    center: 'all',
    category: 'all'
  });
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ml'
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample filter options
  const filterOptions = {
    wards: [
      { value: 'all', label: 'All Wards' },
      { value: 'ward1', label: 'Ward 1' },
      { value: 'ward2', label: 'Ward 2' },
      { value: 'ward3', label: 'Ward 3' },
      { value: 'ward5', label: 'Ward 5' }
    ],
    centers: [
      { value: 'all', label: 'All Centers' },
      { value: 'akkarakunnu', label: 'Akkarakunnu Center' },
      { value: 'ward3', label: 'Ward 3 Center' },
      { value: 'ward5', label: 'Ward 5 Center' }
    ],
    categories: [
      { value: 'all', label: 'All Categories' },
      { value: 'child', label: 'Child Health' },
      { value: 'pregnancy', label: 'Pregnancy' },
      { value: 'adolescent', label: 'Adolescent' }
    ]
  };

  // Simulate real-time data fetching
  useEffect(() => {
    const fetchHealthData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock health data - in production, this would come from your backend
        const mockData = {
          summary: {
            highRiskPregnancies: 12,
            anemiaCases: 34,
            growthMonitoring: 89,
            immunizationCoverage: 92,
            nutritionStatus: {
              normal: 65,
              underweight: 25,
              severe: 10
            },
            maternalCompliance: 78
          },
          trends: {
            malnutrition: [15, 18, 22, 19, 16, 14],
            anemia: [28, 32, 35, 31, 29, 34],
            growth: [82, 85, 87, 89, 88, 89]
          },
          alerts: [
            {
              id: 1,
              type: 'high-risk',
              center: 'Akkarakunnu Center',
              description: 'High-risk pregnancy detected - requires immediate attention',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              status: 'pending'
            },
            {
              id: 2,
              type: 'growth',
              center: 'Ward 3 Center',
              description: 'Child growth deviation >20% detected',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
              status: 'in-progress'
            },
            {
              id: 3,
              type: 'vaccination',
              center: 'Ward 5 Center',
              description: 'Missed vaccination detected for 3 children',
              timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
              status: 'pending'
            }
          ],
          activities: [
            {
              id: 1,
              center: 'Akkarakunnu Center',
              activity: 'Monthly health checkup completed',
              children: 25,
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              status: 'completed'
            },
            {
              id: 2,
              center: 'Ward 3 Center',
              activity: 'Vaccination drive conducted',
              children: 18,
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
              status: 'completed'
            },
            {
              id: 3,
              center: 'Ward 5 Center',
              activity: 'Nutrition assessment done',
              children: 32,
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              status: 'completed'
            }
          ],
          predictions: {
            malnutritionRisk: {
              count: 3,
              confidence: 78,
              recommendation: 'Review growth data for early intervention'
            },
            anemiaRisk: {
              count: 5,
              confidence: 82,
              location: 'Ward 3',
              recommendation: 'Increase iron supplementation program'
            },
            pregnancyComplications: {
              count: 2,
              confidence: 85,
              recommendation: 'Enhanced monitoring for high-risk cases'
            }
          }
        };

        setHealthData(mockData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchHealthData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [filters]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const getTranslation = (key) => {
    const translations = {
      en: {
        title: 'Health Monitoring & Alerts',
        subtitle: 'Track and manage real-time health indicators for children, mothers, and adolescents across all centers.',
        lastUpdated: 'Last Updated',
        refreshData: 'Refresh Data',
        downloadReport: 'Download Health Report',
        language: 'Language',
        filters: 'Filters',
        ward: 'Ward',
        center: 'Anganwadi Center',
        category: 'Health Category'
      },
      ml: {
        title: 'ആരോഗ്യ നിരീക്ഷണവും മുന്നറിയിപ്പുകളും',
        subtitle: 'എല്ലാ കേന്द്രങ്ങളിലെയും കുട്ടികൾ, അമ്മമാർ, കൗമാരക്കാരുടെ തത്സമയ ആരോഗ്യ സൂചകങ്ങൾ ട്രാക്ക് ചെയ്യുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക.',
        lastUpdated: 'അവസാനം അപ്ഡേറ്റ് ചെയ്തത്',
        refreshData: 'ഡാറ്റ പുതുക്കുക',
        downloadReport: 'ആരോഗ്യ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
        language: 'ഭാഷ',
        filters: 'ഫിൽട്ടറുകൾ',
        ward: 'വാർഡ്',
        center: 'അങ്കൺവാടി കേന്ദ്രം',
        category: 'ആരോഗ്യ വിഭാഗം'
      }
    };
    return translations[language][key] || key;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading health monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTranslation('title')}
            </h1>
            <p className="text-gray-600">
              {getTranslation('subtitle')}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">
                {getTranslation('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">{getTranslation('language')}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filters.ward}
                onChange={(e) => handleFilterChange('ward', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filterOptions.wards.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.center}
                onChange={(e) => handleFilterChange('center', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filterOptions.centers.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filterOptions.categories.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{getTranslation('refreshData')}</span>
            </motion.button>

            <motion.button
              onClick={() => setShowReportsModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{getTranslation('downloadReport')}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsightsBox 
        predictions={healthData?.predictions} 
        language={language} 
      />

      {/* Health Summary Cards */}
      <HealthSummaryCards 
        data={healthData?.summary} 
        language={language}
      />

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <HealthCharts 
          data={healthData?.trends} 
          language={language}
        />
        
        <AlertsPanel 
          alerts={healthData?.alerts} 
          language={language}
        />
      </div>

      {/* Recent Health Activities */}
      <HealthActivityLogs 
        activities={healthData?.activities} 
        language={language}
      />

      {/* Reports Modal */}
      {showReportsModal && (
        <HealthReportsModal
          onClose={() => setShowReportsModal(false)}
          language={language}
        />
      )}
    </div>
  );
};

export default HealthMonitoring;