import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Scale, 
  Ruler, 
  Activity, 
  Calendar, 
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Baby,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Syringe,
  Eye,
  Download,
  Filter,
  BarChart3,
  LineChart,
  Target,
  Thermometer,
  Droplets,
  Zap
} from 'lucide-react';
import parentService from '../../services/parentService';

const ParentHealthGrowth = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('6months');
  const [viewMode, setViewMode] = useState('overview'); // overview, growth, health, vaccinations

  useEffect(() => {
    loadHealthData();
  }, [loadHealthData]);

  const loadHealthData = useCallback(async () => {
    try {
      setLoading(true);
      const stats = await parentService.getParentStats();
      
      if (stats && stats.children) {
        setChildren(stats.children);
        if (stats.children.length > 0) {
          setSelectedChild(stats.children[0]);
          generateMockHealthData(stats.children[0]);
        }
      }
    } catch (error) {
      console.error('Error loading health data:', error);
      setError('Failed to load health data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate comprehensive mock health data for demonstration
  const generateMockHealthData = (child) => {
    const currentDate = new Date();
    const healthRecords = [];
    const vaccinationRecords = [];
    const growthRecords = [];

    // Generate health records for the past 12 months
    for (let i = 12; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      
      // Health checkup data
      if (i % 2 === 0) { // Health checkups every 2 months
        healthRecords.push({
          id: `health-${i}`,
          date: date.toISOString().split('T')[0],
          weight: (12 + Math.random() * 8 + i * 0.3).toFixed(1),
          height: (85 + i * 2 + Math.random() * 3).toFixed(1),
          bmi: (14 + Math.random() * 2).toFixed(1),
          temperature: (98.6 + (Math.random() - 0.5) * 2).toFixed(1),
          heartRate: Math.floor(90 + Math.random() * 20),
          bloodPressure: `${Math.floor(80 + Math.random() * 10)}/${Math.floor(50 + Math.random() * 10)}`,
          healthStatus: Math.random() > 0.8 ? 'needs_attention' : 'healthy',
          notes: Math.random() > 0.7 ? 'Regular checkup completed. All parameters normal.' : 'Growth tracking in progress.',
          checkupType: i % 4 === 0 ? 'comprehensive' : 'routine',
          doctor: 'Dr. Priya Sharma',
          anganwadiCenter: child.anganwadiCenter || 'Akkarakkunnu Anganwadi'
        });
      }

      // Growth tracking data (monthly)
      growthRecords.push({
        id: `growth-${i}`,
        date: date.toISOString().split('T')[0],
        weight: (12 + Math.random() * 8 + i * 0.3).toFixed(1),
        height: (85 + i * 2 + Math.random() * 3).toFixed(1),
        headCircumference: (45 + i * 0.5 + Math.random() * 1).toFixed(1),
        chestCircumference: (50 + i * 0.7 + Math.random() * 1).toFixed(1),
        muac: (15 + Math.random() * 2).toFixed(1), // Mid-upper arm circumference
        nutritionStatus: Math.random() > 0.85 ? 'underweight' : Math.random() > 0.15 ? 'normal' : 'overweight',
        growthPercentile: Math.floor(25 + Math.random() * 50),
        developmentMilestones: {
          motor: Math.random() > 0.2,
          cognitive: Math.random() > 0.15,
          social: Math.random() > 0.1,
          language: Math.random() > 0.25
        }
      });
    }

    // Generate vaccination records
    const vaccines = [
      { name: 'BCG', scheduledAge: '0-2 months', doses: 1 },
      { name: 'Hepatitis B', scheduledAge: '0-6 months', doses: 3 },
      { name: 'OPV', scheduledAge: '2-18 months', doses: 4 },
      { name: 'DPT', scheduledAge: '2-18 months', doses: 3 },
      { name: 'Hib', scheduledAge: '2-18 months', doses: 3 },
      { name: 'PCV', scheduledAge: '2-15 months', doses: 3 },
      { name: 'Rotavirus', scheduledAge: '2-6 months', doses: 2 },
      { name: 'MMR', scheduledAge: '12-15 months', doses: 2 },
      { name: 'Varicella', scheduledAge: '12-15 months', doses: 1 },
      { name: 'Hepatitis A', scheduledAge: '12-18 months', doses: 2 }
    ];

    vaccines.forEach((vaccine, index) => {
      for (let dose = 1; dose <= vaccine.doses; dose++) {
        const scheduleDate = new Date();
        scheduleDate.setMonth(currentDate.getMonth() - (12 - index * 2 - dose));
        
        const isCompleted = Math.random() > 0.1; // 90% completion rate
        const isOverdue = !isCompleted && scheduleDate < currentDate;
        
        vaccinationRecords.push({
          id: `vaccine-${index}-${dose}`,
          vaccineName: `${vaccine.name} (Dose ${dose})`,
          scheduledDate: scheduleDate.toISOString().split('T')[0],
          givenDate: isCompleted ? scheduleDate.toISOString().split('T')[0] : null,
          status: isCompleted ? 'completed' : isOverdue ? 'overdue' : 'pending',
          batchNumber: isCompleted ? `BAT${Math.floor(Math.random() * 10000)}` : null,
          administeredBy: isCompleted ? 'ANM Nurse' : null,
          site: isCompleted ? ['Left arm', 'Right arm', 'Left thigh', 'Right thigh'][Math.floor(Math.random() * 4)] : null,
          reactions: isCompleted && Math.random() > 0.8 ? 'Mild fever for 1 day' : 'None reported',
          nextDue: dose < vaccine.doses ? new Date(scheduleDate.getTime() + 60*24*60*60*1000).toISOString().split('T')[0] : null
        });
      }
    });

    setHealthData(healthRecords);
    setVaccinations(vaccinationRecords);
    setGrowthData(growthRecords);
  };

  const calculateGrowthTrend = (data, metric) => {
    if (data.length < 2) return { trend: 'stable', percentage: 0 };
    
    const recent = parseFloat(data[data.length - 1][metric]);
    const previous = parseFloat(data[data.length - 2][metric]);
    const change = ((recent - previous) / previous) * 100;
    
    return {
      trend: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
      percentage: Math.abs(change).toFixed(1)
    };
  };

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'needs_attention': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVaccinationStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filterDataByTime = (data) => {
    const cutoffDate = new Date();
    switch (timeFilter) {
      case '3months':
        cutoffDate.setMonth(cutoffDate.getMonth() - 3);
        break;
      case '6months':
        cutoffDate.setMonth(cutoffDate.getMonth() - 6);
        break;
      case '1year':
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
        break;
      default:
        return data;
    }
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };

  const renderOverview = () => {
    if (!selectedChild) return null;

    const latestHealth = healthData[healthData.length - 1];
    const latestGrowth = growthData[growthData.length - 1];
    const pendingVaccinations = vaccinations.filter(v => v.status === 'pending' || v.status === 'overdue').length;
    const completedVaccinations = vaccinations.filter(v => v.status === 'completed').length;

    const weightTrend = calculateGrowthTrend(growthData, 'weight');
    const heightTrend = calculateGrowthTrend(growthData, 'height');

    return (
      <div className="space-y-6">
        {/* Current Health Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Weight</p>
                <p className="text-2xl font-bold text-gray-900">{latestGrowth?.weight || 'N/A'} kg</p>
                <div className="flex items-center mt-1">
                  {weightTrend.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : weightTrend.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className={`text-sm ${weightTrend.trend === 'up' ? 'text-green-600' : weightTrend.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {weightTrend.percentage}% from last month
                  </span>
                </div>
              </div>
              <Scale className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Height</p>
                <p className="text-2xl font-bold text-gray-900">{latestGrowth?.height || 'N/A'} cm</p>
                <div className="flex items-center mt-1">
                  {heightTrend.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : heightTrend.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className={`text-sm ${heightTrend.trend === 'up' ? 'text-green-600' : heightTrend.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {heightTrend.percentage}% from last month
                  </span>
                </div>
              </div>
              <Ruler className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Status</p>
                <p className="text-2xl font-bold text-gray-900">
                  {latestHealth?.healthStatus === 'healthy' ? 'Good' : 
                   latestHealth?.healthStatus === 'needs_attention' ? 'Fair' : 'Poor'}
                </p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getHealthStatusColor(latestHealth?.healthStatus)}`}>
                  {latestHealth?.healthStatus === 'healthy' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                   latestHealth?.healthStatus === 'needs_attention' ? <AlertTriangle className="w-3 h-3 mr-1" /> : 
                   <AlertTriangle className="w-3 h-3 mr-1" />}
                  {latestHealth?.healthStatus || 'Unknown'}
                </div>
              </div>
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vaccinations</p>
                <p className="text-2xl font-bold text-gray-900">{completedVaccinations}/{vaccinations.length}</p>
                <div className="flex items-center mt-1">
                  {pendingVaccinations > 0 ? (
                    <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  <span className={`text-sm ${pendingVaccinations > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {pendingVaccinations > 0 ? `${pendingVaccinations} pending` : 'All up-to-date'}
                  </span>
                </div>
              </div>
              <Syringe className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Recent Health Records */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Health Checkups</h3>
              <Stethoscope className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {healthData.slice(-3).reverse().map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{record.checkupType} checkup</p>
                    <p className="text-xs text-gray-500">{record.doctor}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(record.healthStatus)}`}>
                      {record.healthStatus}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{record.weight}kg • {record.height}cm</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setViewMode('health')}
              className="w-full mt-4 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View All Health Records
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Vaccinations</h3>
              <Syringe className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {vaccinations
                .filter(v => v.status === 'pending' || v.status === 'overdue')
                .slice(0, 3)
                .map((vaccination) => (
                <div key={vaccination.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{vaccination.vaccineName}</p>
                    <p className="text-sm text-gray-600">Due: {new Date(vaccination.scheduledDate).toLocaleDateString()}</p>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVaccinationStatusColor(vaccination.status)}`}>
                    {vaccination.status}
                  </div>
                </div>
              ))}
              {vaccinations.filter(v => v.status === 'pending' || v.status === 'overdue').length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <p>All vaccinations up-to-date!</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setViewMode('vaccinations')}
              className="w-full mt-4 bg-purple-50 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors"
            >
              View Vaccination Schedule
            </button>
          </motion.div>
        </div>

        {/* Nutrition Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Nutrition & Growth Status</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{latestGrowth?.growthPercentile || 'N/A'}th</p>
              <p className="text-sm text-gray-600">Growth Percentile</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{latestGrowth?.bmi || latestHealth?.bmi || 'N/A'}</p>
              <p className="text-sm text-gray-600">BMI</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-600 capitalize">{latestGrowth?.nutritionStatus || 'Normal'}</p>
              <p className="text-sm text-gray-600">Nutrition Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderGrowthCharts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Growth Charts</h3>
        <div className="flex items-center space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Weight & Height Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Weight Progress</h4>
            <Scale className="w-5 h-5 text-blue-500" />
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive weight chart</p>
              <p className="text-sm text-gray-500">Showing {filterDataByTime(growthData).length} data points</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="font-semibold">{growthData[growthData.length - 1]?.weight || 'N/A'} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average</p>
              <p className="font-semibold">
                {growthData.length > 0 ? (growthData.reduce((sum, item) => sum + parseFloat(item.weight), 0) / growthData.length).toFixed(1) : 'N/A'} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="font-semibold text-green-600">+{calculateGrowthTrend(growthData, 'weight').percentage}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Height Progress</h4>
            <Ruler className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive height chart</p>
              <p className="text-sm text-gray-500">Showing {filterDataByTime(growthData).length} measurements</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Current</p>
              <p className="font-semibold">{growthData[growthData.length - 1]?.height || 'N/A'} cm</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average</p>
              <p className="font-semibold">
                {growthData.length > 0 ? (growthData.reduce((sum, item) => sum + parseFloat(item.height), 0) / growthData.length).toFixed(1) : 'N/A'} cm
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="font-semibold text-green-600">+{calculateGrowthTrend(growthData, 'height').percentage}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Development Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">Development Milestones</h4>
          <Award className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {growthData[growthData.length - 1]?.developmentMilestones && 
            Object.entries(growthData[growthData.length - 1].developmentMilestones).map(([category, achieved]) => (
            <div key={category} className={`p-4 rounded-lg border-2 ${achieved ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-center mb-2">
                {achieved ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Clock className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-center font-medium text-gray-900 capitalize">{category}</p>
              <p className="text-center text-sm text-gray-600">
                {achieved ? 'Achieved' : 'In Progress'}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderHealthRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Health Records</h3>
        <div className="flex items-center space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filterDataByTime(healthData).reverse().map((record) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {record.checkupType === 'comprehensive' ? 'Comprehensive' : 'Routine'} Health Checkup
                </h4>
                <p className="text-sm text-gray-600">
                  {new Date(record.date).toLocaleDateString()} • {record.doctor}
                </p>
                <p className="text-sm text-gray-500">{record.anganwadiCenter}</p>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(record.healthStatus)}`}>
                {record.healthStatus === 'healthy' ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
                {record.healthStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Scale className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-semibold">{record.weight} kg</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Ruler className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Height</p>
                <p className="font-semibold">{record.height} cm</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">BMI</p>
                <p className="font-semibold">{record.bmi}</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-semibold">{record.temperature}°F</p>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-lg">
                <Heart className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="font-semibold">{record.heartRate} bpm</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <Droplets className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-sm text-gray-600">BP</p>
                <p className="font-semibold">{record.bloodPressure}</p>
              </div>
            </div>

            {record.notes && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{record.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderVaccinations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Vaccination Schedule</h3>
        <div className="flex items-center space-x-2">
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <Download className="w-4 h-4 mr-1" />
            Export Schedule
          </button>
        </div>
      </div>

      {/* Vaccination Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h4 className="text-lg font-medium text-gray-900 mb-4">Vaccination Progress</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">
              {vaccinations.filter(v => v.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">
              {vaccinations.filter(v => v.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">
              {vaccinations.filter(v => v.status === 'overdue').length}
            </p>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </motion.div>

      {/* Vaccination Records */}
      <div className="grid gap-4">
        {vaccinations.map((vaccination) => (
          <motion.div
            key={vaccination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{vaccination.vaccineName}</h4>
                <p className="text-sm text-gray-600">
                  Scheduled: {new Date(vaccination.scheduledDate).toLocaleDateString()}
                </p>
                {vaccination.givenDate && (
                  <p className="text-sm text-gray-600">
                    Given: {new Date(vaccination.givenDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getVaccinationStatusColor(vaccination.status)}`}>
                {vaccination.status === 'completed' ? <CheckCircle className="w-4 h-4 mr-1" /> : 
                 vaccination.status === 'overdue' ? <AlertTriangle className="w-4 h-4 mr-1" /> : 
                 <Clock className="w-4 h-4 mr-1" />}
                {vaccination.status}
              </div>
            </div>

            {vaccination.status === 'completed' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Batch Number</p>
                  <p className="font-medium">{vaccination.batchNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Administered By</p>
                  <p className="font-medium">{vaccination.administeredBy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Site</p>
                  <p className="font-medium">{vaccination.site}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Reactions</p>
                  <p className="font-medium">{vaccination.reactions}</p>
                </div>
              </div>
            )}

            {vaccination.nextDue && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Next dose due: {new Date(vaccination.nextDue).toLocaleDateString()}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health & Growth Monitoring</h2>
          <p className="text-gray-600">Track your child's health records, growth progress, and vaccinations</p>
        </div>
        <div className="flex items-center space-x-2">
          {children.length > 1 && (
            <select
              value={selectedChild?.id || ''}
              onChange={(e) => {
                const child = children.find(c => c.id === e.target.value);
                setSelectedChild(child);
                if (child) generateMockHealthData(child);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'growth', label: 'Growth Charts', icon: TrendingUp },
            { id: 'health', label: 'Health Records', icon: Stethoscope },
            { id: 'vaccinations', label: 'Vaccinations', icon: Syringe }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                viewMode === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on selected view */}
      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'growth' && renderGrowthCharts()}
      {viewMode === 'health' && renderHealthRecords()}
      {viewMode === 'vaccinations' && renderVaccinations()}
    </div>
  );
};

export default ParentHealthGrowth;