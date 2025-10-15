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

import HealthChartsWorking from './health/HealthChartsWorking';

const HealthMonitoringSimple = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    ward: 'ward9',
    center: 'all',
    category: 'all'
  });
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - different data for different centers and categories
  const getAllHealthData = () => {
    const baseData = {
      all: {
        all: {
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
          alerts: [
            {
              id: 1,
              type: 'critical',
              title: 'High Risk Pregnancy Detected',
              center: 'Akkarakunnu Center',
              time: '10 minutes ago',
              status: 'pending',
              category: 'pregnancy'
            },
            {
              id: 2,
              type: 'warning',
              title: 'Immunization Due',
              center: 'Veliyanoor Center',
              time: '1 hour ago',
              status: 'pending',
              category: 'child'
            },
            {
              id: 3,
              type: 'info',
              title: 'Growth Monitoring Scheduled',
              center: 'Akkarakunnu Center',
              time: '2 hours ago',
              status: 'resolved',
              category: 'child'
            },
            {
              id: 4,
              type: 'warning',
              title: 'Adolescent Health Check',
              center: 'Veliyanoor Center',
              time: '3 hours ago',
              status: 'pending',
              category: 'adolescent'
            }
          ]
        },
        child: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 18,
            growthMonitoring: 89,
            immunizationCoverage: 92,
            nutritionStatus: {
              normal: 65,
              underweight: 25,
              severe: 10
            },
            maternalCompliance: 0
          },
          alerts: [
            {
              id: 2,
              type: 'warning',
              title: 'Immunization Due',
              center: 'Veliyanoor Center',
              time: '1 hour ago',
              status: 'pending',
              category: 'child'
            },
            {
              id: 3,
              type: 'info',
              title: 'Growth Monitoring Scheduled',
              center: 'Akkarakunnu Center',
              time: '2 hours ago',
              status: 'resolved',
              category: 'child'
            }
          ]
        },
        pregnancy: {
          summary: {
            highRiskPregnancies: 12,
            anemiaCases: 16,
            growthMonitoring: 0,
            immunizationCoverage: 0,
            nutritionStatus: {
              normal: 0,
              underweight: 0,
              severe: 0
            },
            maternalCompliance: 78
          },
          alerts: [
            {
              id: 1,
              type: 'critical',
              title: 'High Risk Pregnancy Detected',
              center: 'Akkarakunnu Center',
              time: '10 minutes ago',
              status: 'pending',
              category: 'pregnancy'
            }
          ]
        },
        adolescent: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 8,
            growthMonitoring: 0,
            immunizationCoverage: 85,
            nutritionStatus: {
              normal: 72,
              underweight: 20,
              severe: 8
            },
            maternalCompliance: 0
          },
          alerts: [
            {
              id: 4,
              type: 'warning',
              title: 'Adolescent Health Check',
              center: 'Veliyanoor Center',
              time: '3 hours ago',
              status: 'pending',
              category: 'adolescent'
            }
          ]
        }
      },
      akkarakunnu: {
        all: {
          summary: {
            highRiskPregnancies: 7,
            anemiaCases: 18,
            growthMonitoring: 94,
            immunizationCoverage: 96,
            nutritionStatus: {
              normal: 72,
              underweight: 20,
              severe: 8
            },
            maternalCompliance: 85
          },
          alerts: [
            {
              id: 1,
              type: 'critical',
              title: 'High Risk Pregnancy Detected',
              center: 'Akkarakunnu Center',
              time: '10 minutes ago',
              status: 'pending',
              category: 'pregnancy'
            },
            {
              id: 3,
              type: 'info',
              title: 'Growth Monitoring Scheduled',
              center: 'Akkarakunnu Center',
              time: '2 hours ago',
              status: 'resolved',
              category: 'child'
            }
          ]
        },
        child: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 9,
            growthMonitoring: 94,
            immunizationCoverage: 96,
            nutritionStatus: {
              normal: 72,
              underweight: 20,
              severe: 8
            },
            maternalCompliance: 0
          },
          alerts: [
            {
              id: 3,
              type: 'info',
              title: 'Growth Monitoring Scheduled',
              center: 'Akkarakunnu Center',
              time: '2 hours ago',
              status: 'resolved',
              category: 'child'
            }
          ]
        },
        pregnancy: {
          summary: {
            highRiskPregnancies: 7,
            anemiaCases: 9,
            growthMonitoring: 0,
            immunizationCoverage: 0,
            nutritionStatus: {
              normal: 0,
              underweight: 0,
              severe: 0
            },
            maternalCompliance: 85
          },
          alerts: [
            {
              id: 1,
              type: 'critical',
              title: 'High Risk Pregnancy Detected',
              center: 'Akkarakunnu Center',
              time: '10 minutes ago',
              status: 'pending',
              category: 'pregnancy'
            }
          ]
        },
        adolescent: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 0,
            growthMonitoring: 0,
            immunizationCoverage: 88,
            nutritionStatus: {
              normal: 80,
              underweight: 15,
              severe: 5
            },
            maternalCompliance: 0
          },
          alerts: []
        }
      },
      veliyanoor: {
        all: {
          summary: {
            highRiskPregnancies: 5,
            anemiaCases: 16,
            growthMonitoring: 84,
            immunizationCoverage: 88,
            nutritionStatus: {
              normal: 58,
              underweight: 30,
              severe: 12
            },
            maternalCompliance: 71
          },
          alerts: [
            {
              id: 2,
              type: 'warning',
              title: 'Immunization Due',
              center: 'Veliyanoor Center',
              time: '1 hour ago',
              status: 'pending',
              category: 'child'
            },
            {
              id: 4,
              type: 'warning',
              title: 'Adolescent Health Check',
              center: 'Veliyanoor Center',
              time: '3 hours ago',
              status: 'pending',
              category: 'adolescent'
            }
          ]
        },
        child: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 9,
            growthMonitoring: 84,
            immunizationCoverage: 88,
            nutritionStatus: {
              normal: 58,
              underweight: 30,
              severe: 12
            },
            maternalCompliance: 0
          },
          alerts: [
            {
              id: 2,
              type: 'warning',
              title: 'Immunization Due',
              center: 'Veliyanoor Center',
              time: '1 hour ago',
              status: 'pending',
              category: 'child'
            }
          ]
        },
        pregnancy: {
          summary: {
            highRiskPregnancies: 5,
            anemiaCases: 7,
            growthMonitoring: 0,
            immunizationCoverage: 0,
            nutritionStatus: {
              normal: 0,
              underweight: 0,
              severe: 0
            },
            maternalCompliance: 71
          },
          alerts: []
        },
        adolescent: {
          summary: {
            highRiskPregnancies: 0,
            anemiaCases: 8,
            growthMonitoring: 0,
            immunizationCoverage: 82,
            nutritionStatus: {
              normal: 65,
              underweight: 25,
              severe: 10
            },
            maternalCompliance: 0
          },
          alerts: [
            {
              id: 4,
              type: 'warning',
              title: 'Adolescent Health Check',
              center: 'Veliyanoor Center',
              time: '3 hours ago',
              status: 'pending',
              category: 'adolescent'
            }
          ]
        }
      }
    };

    return baseData;
  };

  // Simulate data loading
  useEffect(() => {
    console.log('🏥 HealthMonitoringSimple: Component mounted');
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('✅ Health data loaded successfully');
      } catch (error) {
        console.error('❌ Error loading health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Update data when filters change
  useEffect(() => {
    // Filter data based on selected filters
    const getFilteredHealthData = () => {
      const allData = getAllHealthData();
      let filteredData;

      // Get data based on center filter
      const centerKey = filters.center === 'all' ? 'all' : filters.center;
      const categoryKey = filters.category === 'all' ? 'all' : filters.category;

      // Navigate to the correct data structure
      if (allData[centerKey] && allData[centerKey][categoryKey]) {
        filteredData = allData[centerKey][categoryKey];
      } else {
        // Fallback to all data if specific combination doesn't exist
        filteredData = allData.all.all;
      }

      return filteredData;
    };

    const filteredData = getFilteredHealthData();
    setHealthData(filteredData);
    setLastUpdated(new Date());
    console.log('🔄 Data filtered based on:', filters);
    console.log('📊 Filtered data:', filteredData);
  }, [filters]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading health monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              Health Monitoring Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time health insights and monitoring across all Anganwadi centers
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
              <select 
                value={filters.ward}
                onChange={(e) => setFilters(prev => ({...prev, ward: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ward9">Ward 9</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Center</label>
              <select 
                value={filters.center}
                onChange={(e) => setFilters(prev => ({...prev, center: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Centers</option>
                <option value="akkarakunnu">Akkarakunnu Center</option>
                <option value="veliyanoor">Veliyanoor Center</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="child">Child Health</option>
                <option value="pregnancy">Pregnancy</option>
                <option value="adolescent">Adolescent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">High Risk Pregnancies</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600 mb-2">{healthData?.summary?.highRiskPregnancies || 0}</div>
            <div className="text-xs text-gray-500">Requiring immediate attention</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Anemia Cases</h3>
              <Activity className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-2">{healthData?.summary?.anemiaCases || 0}</div>
            <div className="text-xs text-gray-500">Under treatment</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Growth Monitoring</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">{healthData?.summary?.growthMonitoring || 0}%</div>
            <div className="text-xs text-gray-500">Coverage rate</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Immunization</h3>
              <Syringe className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">{healthData?.summary?.immunizationCoverage || 0}%</div>
            <div className="text-xs text-gray-500">Coverage rate</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Normal Nutrition</h3>
              <Baby className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">{healthData?.summary?.nutritionStatus?.normal || 0}%</div>
            <div className="text-xs text-gray-500">Children with normal nutrition</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Maternal Compliance</h3>
              <Heart className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">{healthData?.summary?.maternalCompliance || 0}%</div>
            <div className="text-xs text-gray-500">Following guidelines</div>
          </div>
        </div>

        {/* Charts Section - Real Chart.js Components */}
        <div className="mb-8">
          <HealthChartsWorking filters={filters} />
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500" />
              Recent Health Alerts
            </h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {healthData?.alerts?.length || 0} Active
            </span>
          </div>

          <div className="space-y-4">
            {healthData?.alerts?.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.type === 'critical' ? 'bg-red-500' : 
                    alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {alert.center}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {alert.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No active alerts</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6" />
            <h3 className="text-lg font-semibold">AI Health Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Malnutrition Prediction</h4>
              <p className="text-sm opacity-90">Expected 15% increase in cases next month</p>
              <div className="text-xs mt-2 opacity-75">Confidence: 87%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Immunization Focus</h4>
              <p className="text-sm opacity-90">Ward 3 needs immediate attention</p>
              <div className="text-xs mt-2 opacity-75">Confidence: 92%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Resource Allocation</h4>
              <p className="text-sm opacity-90">Increase anemia screening in Ward 5</p>
              <div className="text-xs mt-2 opacity-75">Confidence: 81%</div>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Component Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Component loaded successfully</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Mock data displayed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>All sections rendering</span>
              </div>
            </div>
            <div className="text-blue-700">
              <div>Last updated: {lastUpdated.toLocaleString()}</div>
              <div>Component: HealthMonitoringSimple</div>
              <div>Status: Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoringSimple;