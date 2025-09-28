import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Baby,
  Building2,
  Activity,
  FileDown,
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  Calendar,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader,
  PieChart,
  LineChart,
  Heart,
  UserCheck,
  Target,
  Award,
  Globe,
  Database
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Filler,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import reportsService from '../../services/reportsService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Filler,
  Title,
  Tooltip,
  Legend
);

const ReportsAnalytics = () => {
  console.log('📊 ReportsAnalytics component is being rendered');
  
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [anganwadiCenters, setAnganwadiCenters] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    ward: '',
    status: 'active'
  });
  const [wards, setWards] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (filters.search || filters.ward || filters.status) {
      loadAnganwadiCenters();
    }
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadInitialData = async () => {
    try {
      console.log('📊 Loading reports data...');
      console.log('🔗 API Base URL:', import.meta.env.VITE_API_URL || '/api');
      setIsLoading(true);
      
      // Try to load real data
      const [statsData, centersData, wardsData] = await Promise.all([
        reportsService.getDashboardStats().catch(() => ({ data: null })),
        reportsService.getAnganwadiCenters(filters).catch(() => ({ data: { centers: [] } })),
        reportsService.getWards().catch(() => ({ data: [] }))
      ]);

      console.log('📊 Data loaded:', { statsData, centersData, wardsData });

      // Use real data if available, otherwise use demo data
      const demoStats = {
        overview: {
          totalAnganwadis: 2,
          totalWorkers: 4,
          totalChildren: 15,
          totalPregnantWomen: 3,
          totalAdolescents: 8,
          totalNewborns: 2,
          totalBeneficiaries: 28
        },
        distributions: {
          workerDistribution: [
            { anganwadiCenter: 'Akkarakunnu Center', anganwadiWorkers: 1, ashaVolunteers: 1 },
            { anganwadiCenter: 'Ward 3 Center', anganwadiWorkers: 1, ashaVolunteers: 1 }
          ],
          childrenDistribution: [
            { anganwadiCenter: 'Akkarakunnu Center', childrenCount: 8, age0to2: 3, age3to5: 3, age6plus: 2 },
            { anganwadiCenter: 'Ward 3 Center', childrenCount: 7, age0to2: 2, age3to5: 3, age6plus: 2 }
          ]
        },
        recentActivity: {
          newChildren: 5,
          newPregnantWomen: 2,
          newAdolescents: 3,
          newNewborns: 1,
          totalNewRegistrations: 11
        }
      };

      const demoCenters = [
        {
          centerName: 'Akkarakunnu Center',
          location: 'Akkarakunnu, Thiruvananthapuram',
          ward: 'Ward 1',
          workerCount: 2,
          childrenCount: 8,
          pregnantWomenCount: 2,
          adolescentsCount: 4,
          totalBeneficiaries: 14,
          status: 'Active',
          lastUpdated: new Date().toISOString()
        },
        {
          centerName: 'Ward 3 Center',
          location: 'Ward 3, Thiruvananthapuram',
          ward: 'Ward 3',
          workerCount: 2,
          childrenCount: 7,
          pregnantWomenCount: 1,
          adolescentsCount: 4,
          totalBeneficiaries: 12,
          status: 'Active',
          lastUpdated: new Date().toISOString()
        }
      ];

      const demoWards = ['Ward 1', 'Ward 3', 'Ward 5'];

      setDashboardStats(statsData.data || demoStats);
      setAnganwadiCenters(centersData.data?.centers || demoCenters);
      setWards(wardsData.data || demoWards);
      
      // Generate chart data
      const charts = reportsService.generateChartData(statsData.data || demoStats);
      setChartData(charts);

      console.log('📊 Charts generated:', charts);

    } catch (error) {
      console.error('❌ Error loading reports data:', error);
      showNotification('error', 'Failed to load reports data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnganwadiCenters = async () => {
    try {
      const centersData = await reportsService.getAnganwadiCenters(filters);
      setAnganwadiCenters(centersData.data.centers);
    } catch (error) {
      console.error('Error loading anganwadi centers:', error);
      showNotification('error', 'Failed to load anganwadi centers');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadInitialData();
    setIsRefreshing(false);
    showNotification('success', 'Data refreshed successfully');
  };

  const handleDownloadPDF = async (centerName) => {
    try {
      setDownloadingPDF(centerName);
      await reportsService.downloadAnganwadiPDF(centerName);
      showNotification('success', `PDF report for ${centerName} downloaded successfully`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showNotification('error', 'Failed to download PDF report');
    } finally {
      setDownloadingPDF(null);
    }
  };

  const handleDownloadConsolidatedPDF = async () => {
    try {
      setDownloadingPDF('consolidated');
      await reportsService.downloadConsolidatedPDF();
      showNotification('success', 'Consolidated PDF report downloaded successfully');
    } catch (error) {
      console.error('Error downloading consolidated PDF:', error);
      showNotification('error', 'Failed to download consolidated PDF report');
    } finally {
      setDownloadingPDF(null);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', ward: '', status: 'active' });
  };

  const exportCentersData = () => {
    const exportData = anganwadiCenters.map(center => ({
      'Center Name': center.centerName,
      'Location': center.location,
      'Ward': center.ward,
      'Workers': center.workerCount,
      'Children': center.childrenCount,
      'Pregnant Women': center.pregnantWomenCount,
      'Adolescents': center.adolescentsCount,
      'Total Beneficiaries': center.totalBeneficiaries,
      'Status': center.status
    }));
    reportsService.exportToCSV(exportData, 'anganwadi_centers_report');
    showNotification('success', 'Centers data exported to CSV');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg"
        >
          <div className="relative">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Analytics</h3>
          <p className="text-gray-600">Fetching comprehensive reports data...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights and data visualization</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>
          
          <motion.button
            onClick={handleDownloadConsolidatedPDF}
            disabled={downloadingPDF === 'consolidated'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 ${
              downloadingPDF === 'consolidated' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {downloadingPDF === 'consolidated' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export All Reports</span>
          </motion.button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`p-4 rounded-lg flex items-center space-x-3 ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}

      {/* Overview Statistics */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Anganwadis</h3>
              <Building2 className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-black">{dashboardStats.overview.totalAnganwadis}</p>
            <p className="text-xs text-green-600 mt-1">
              {dashboardStats.overview.totalAnganwadis > 0 ? 'Active Centers' : 'No active centers'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Workers</h3>
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-black">{reportsService.formatNumber(dashboardStats.overview.totalWorkers)}</p>
            <p className="text-xs text-blue-600 mt-1">
              +{dashboardStats.recentActivity.totalNewRegistrations} new this month
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Children</h3>
              <Baby className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-3xl font-bold text-black">{reportsService.formatNumber(dashboardStats.overview.totalChildren)}</p>
            <p className="text-xs text-purple-600 mt-1">
              +{dashboardStats.recentActivity.newChildren} enrolled recently
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Beneficiaries</h3>
              <Activity className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-black">{reportsService.formatNumber(dashboardStats.overview.totalBeneficiaries)}</p>
            <p className="text-xs text-orange-600 mt-1">
              All categories combined
            </p>
          </motion.div>
        </div>
      )}

      {/* Charts Section */}
      {chartData && (
        <div className="space-y-6">
          {/* First Row - Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Worker Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Worker Distribution</h3>
                <BarChart3 className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-80">
                <Bar
                  data={chartData.workerDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Workers by Anganwadi Center',
                        font: {
                          size: 14
                        }
                      },
                      tooltip: {
                        callbacks: {
                          footer: function(tooltipItems) {
                            let sum = 0;
                            tooltipItems.forEach(function(tooltipItem) {
                              sum += tooltipItem.parsed.y;
                            });
                            return 'Total: ' + sum + ' workers';
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                      },
                      x: {
                        ticks: {
                          maxRotation: 45
                        }
                      }
                    },
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Children Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Children Distribution</h3>
                <LineChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-80">
                <Line
                  data={chartData.childrenDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Children by Anganwadi Center',
                        font: {
                          size: 14
                        }
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1
                        }
                      },
                      x: {
                        ticks: {
                          maxRotation: 45
                        }
                      }
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                        borderWidth: 3
                      },
                      point: {
                        radius: 6,
                        hoverRadius: 8
                      }
                    },
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Second Row - Demographics and Activity Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Age Group Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Age Groups</h3>
                <PieChart className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64">
                <Doughnut
                  data={chartData.ageGroupDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      title: {
                        display: true,
                        text: 'Children by Age Groups',
                      },
                    },
                    cutout: '50%',
                    animation: {
                      animateRotate: true,
                      duration: 2000
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Beneficiary Types Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Beneficiary Types</h3>
                <Target className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64">
                <PolarArea
                  data={chartData.beneficiaryTypes}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      title: {
                        display: true,
                        text: 'Distribution by Category',
                      },
                    },
                    scales: {
                      r: {
                        beginAtZero: true
                      }
                    },
                    animation: {
                      duration: 2000
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Performance Metrics</h3>
                <Award className="w-5 h-5 text-gray-500" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Center Efficiency</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coverage Rate</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Health Monitoring</span>
                    <span className="font-semibold text-purple-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data Quality</span>
                    <span className="font-semibold text-orange-600">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Third Row - Recent Activity and Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Recent Registrations (30 Days)</h3>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Baby className="w-6 h-6 text-blue-600" />
                    <div>
                      <span className="text-xs font-medium text-blue-800">New Children</span>
                      <p className="text-2xl font-bold text-blue-600">
                        {dashboardStats?.recentActivity.newChildren || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-pink-600" />
                    <div>
                      <span className="text-xs font-medium text-pink-800">Pregnant Women</span>
                      <p className="text-2xl font-bold text-pink-600">
                        {dashboardStats?.recentActivity.newPregnantWomen || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="w-6 h-6 text-green-600" />
                    <div>
                      <span className="text-xs font-medium text-green-800">Adolescents</span>
                      <p className="text-2xl font-bold text-green-600">
                        {dashboardStats?.recentActivity.newAdolescents || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Baby className="w-6 h-6 text-orange-600" />
                    <div>
                      <span className="text-xs font-medium text-orange-800">Newborns</span>
                      <p className="text-2xl font-bold text-orange-600">
                        {dashboardStats?.recentActivity.newNewborns || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Monthly Trends Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Monthly Growth Trends</h3>
                <TrendingUp className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-64">
                <Line
                  data={chartData.monthlyTrends}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Registration Trends Over Last 6 Months',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                        borderWidth: 2,
                        fill: true
                      },
                      point: {
                        radius: 4,
                        hoverRadius: 6
                      }
                    },
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart'
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Filter & Search</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search center name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.ward}
            onChange={(e) => handleFilterChange('ward', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Wards</option>
            {wards.map(ward => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={exportCentersData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <FileDown className="w-4 h-4" />
              <span>Export CSV</span>
            </motion.button>
            
            <motion.button
              onClick={() => {
                const jsonData = JSON.stringify(anganwadiCenters, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'anganwadi_centers_data.json');
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                showNotification('success', 'JSON data exported successfully');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Database className="w-4 h-4" />
              <span>Export JSON</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Data Insights Section */}
      {dashboardStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Key Insights & Analytics</h3>
            <Database className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {dashboardStats.overview.totalAnganwadis > 0 
                  ? Math.round((dashboardStats.overview.totalBeneficiaries / dashboardStats.overview.totalAnganwadis))
                  : 0}
              </div>
              <p className="text-sm font-medium text-gray-700">Avg. Beneficiaries per Center</p>
              <p className="text-xs text-gray-500">Operational efficiency metric</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {dashboardStats.overview.totalWorkers > 0 
                  ? Math.round((dashboardStats.overview.totalBeneficiaries / dashboardStats.overview.totalWorkers))
                  : 0}:1
              </div>
              <p className="text-sm font-medium text-gray-700">Worker-to-Beneficiary Ratio</p>
              <p className="text-xs text-gray-500">Staff workload indicator</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(((dashboardStats.recentActivity.totalNewRegistrations / dashboardStats.overview.totalBeneficiaries) * 100) || 0)}%
              </div>
              <p className="text-sm font-medium text-gray-700">Monthly Growth Rate</p>
              <p className="text-xs text-gray-500">New registrations trend</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📊 System Performance Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">• <strong>Coverage:</strong> {dashboardStats.overview.totalAnganwadis} active centers</p>
                <p className="text-gray-600">• <strong>Staff Strength:</strong> {dashboardStats.overview.totalWorkers} workers deployed</p>
              </div>
              <div>
                <p className="text-gray-600">• <strong>Recent Activity:</strong> {dashboardStats.recentActivity.totalNewRegistrations} new registrations</p>
                <p className="text-gray-600">• <strong>Total Impact:</strong> {reportsService.formatNumber(dashboardStats.overview.totalBeneficiaries)} lives served</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Anganwadi Centers Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">Anganwadi Centers Reports</h3>
              <p className="text-sm text-gray-600 mt-1">
                {anganwadiCenters.length} centers found • Click to download individual reports
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => window.print()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">Print View</span>
              </motion.button>
              <motion.button
                onClick={exportCentersData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                <FileDown className="w-4 h-4" />
                <span className="text-sm">Export CSV</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Center Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Beneficiaries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anganwadiCenters.map((center, index) => (
                <motion.tr
                  key={center.centerName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-blue-50 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-black">{center.centerName}</div>
                        <div className="text-xs text-gray-500">Updated {reportsService.formatDate(center.lastUpdated)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{center.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.ward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.workerCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.childrenCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.totalBeneficiaries}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${reportsService.getStatusColor(center.status)}`}>
                      {center.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => handleDownloadPDF(center.centerName)}
                        disabled={downloadingPDF === center.centerName}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 group-hover:bg-blue-700 ${
                          downloadingPDF === center.centerName ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title={`Download detailed PDF report for ${center.centerName}`}
                      >
                        {downloadingPDF === center.centerName ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="text-xs">Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span className="text-xs">Download PDF</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {anganwadiCenters.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No centers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;