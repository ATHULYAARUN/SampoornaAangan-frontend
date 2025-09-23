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
  Loader
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
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import reportsService from '../../services/reportsService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportsAnalytics = () => {
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
      setIsLoading(true);
      const [statsData, centersData, wardsData] = await Promise.all([
        reportsService.getDashboardStats(),
        reportsService.getAnganwadiCenters(filters),
        reportsService.getWards()
      ]);

      setDashboardStats(statsData.data);
      setAnganwadiCenters(centersData.data.centers);
      setWards(wardsData.data);
      
      // Generate chart data
      const charts = reportsService.generateChartData(statsData.data);
      setChartData(charts);

    } catch (error) {
      console.error('Error loading reports data:', error);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reports data...</p>
        </div>
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
            <div className="h-64">
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
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
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
              <TrendingUp className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-64">
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
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Age Group Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Age Group Distribution</h3>
              <Activity className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-64">
              <Pie
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
                }}
              />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Recent Activity (30 Days)</h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Baby className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-black">New Children</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {dashboardStats?.recentActivity.newChildren || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium text-black">Pregnant Women</span>
                </div>
                <span className="text-lg font-bold text-pink-600">
                  {dashboardStats?.recentActivity.newPregnantWomen || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-black">Adolescents</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  {dashboardStats?.recentActivity.newAdolescents || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Baby className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-black">Newborns</span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {dashboardStats?.recentActivity.newNewborns || 0}
                </span>
              </div>
            </div>
          </motion.div>
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
          
          <motion.button
            onClick={exportCentersData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <FileDown className="w-4 h-4" />
            <span>Export CSV</span>
          </motion.button>
        </div>
      </div>

      {/* Anganwadi Centers Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Anganwadi Centers Reports</h3>
          <p className="text-sm text-gray-600 mt-1">
            {anganwadiCenters.length} centers found
          </p>
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
                  className="hover:bg-gray-50"
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
                        className={`flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 ${
                          downloadingPDF === center.centerName ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {downloadingPDF === center.centerName ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        <span className="text-xs">PDF</span>
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