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
  Download,
  BarChart3,
  LineChart,
  Target,
  Thermometer,
  Droplets
} from 'lucide-react';
import parentService from '../../services/parentService';

const ParentHealthGrowth = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [childrenHealthData, setChildrenHealthData] = useState({}); // Store health data for all children
  const [childrenVaccinations, setChildrenVaccinations] = useState({}); // Store vaccinations for all children
  const [childrenGrowthData, setChildrenGrowthData] = useState({}); // Store growth data for all children
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('6months');
  const [viewMode, setViewMode] = useState('overview');

  // Generate mock health data for demonstration
  const generateMockHealthData = useCallback((child) => {
    try {
      const currentDate = new Date();
      const healthRecords = [];
      const vaccinationRecords = [];
      const growthRecords = [];

      // Generate health records for the past 12 months
      for (let i = 12; i >= 0; i--) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        
        // Health checkup data (every 2 months)
        if (i % 2 === 0) {
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
            notes: 'Regular checkup completed. All parameters normal.',
            checkupType: i % 4 === 0 ? 'comprehensive' : 'routine',
            doctor: 'Dr. Priya Sharma',
            anganwadiCenter: child?.anganwadiCenter || 'Akkarakkunnu Anganwadi'
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
          muac: (15 + Math.random() * 2).toFixed(1),
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
        { name: 'MMR', scheduledAge: '12-15 months', doses: 2 }
      ];

      vaccines.forEach((vaccine, index) => {
        for (let dose = 1; dose <= vaccine.doses; dose++) {
          const scheduleDate = new Date();
          scheduleDate.setMonth(currentDate.getMonth() - (12 - index * 2 - dose));
          
          const isCompleted = Math.random() > 0.1;
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
            reactions: isCompleted && Math.random() > 0.8 ? 'Mild fever for 1 day' : 'None reported'
          });
        }
      });

      setHealthData(healthRecords);
      setVaccinations(vaccinationRecords);
      setGrowthData(growthRecords);
    } catch (error) {
      console.error('Error generating mock health data:', error);
      setError('Error generating health data');
    }
  }, []);

  const loadHealthData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get real children data from parentService
      const stats = await parentService.getParentStats();
      
      if (stats && stats.children && stats.children.length > 0) {
        setChildren(stats.children);
        setSelectedChild(stats.children[0]);
        
        // Generate mock health data for all children
        stats.children.forEach(child => {
          generateMockHealthData(child);
        });
      } else {
        // Fallback to demo data if no real children found
        const mockChildren = [{
          id: 'demo-child-1',
          name: 'Demo Child',
          age: '4 years old',
          anganwadiCenter: 'Akkarakkunnu Anganwadi',
          healthStatus: 'healthy',
          vaccinationStatus: 'up-to-date'
        }];
        
        setChildren(mockChildren);
        setSelectedChild(mockChildren[0]);
        generateMockHealthData(mockChildren[0]);
      }
      
    } catch (error) {
      console.error('Error loading health data:', error);
      setError('Failed to load health data. Showing demo data.');
      
      // Fallback to demo data on error
      const mockChildren = [{
        id: 'demo-child-1',
        name: 'Demo Child',
        age: '4 years old',
        anganwadiCenter: 'Akkarakkunnu Anganwadi',
        healthStatus: 'healthy',
        vaccinationStatus: 'up-to-date'
      }];
      
      setChildren(mockChildren);
      setSelectedChild(mockChildren[0]);
      generateMockHealthData(mockChildren[0]);
    } finally {
      setLoading(false);
    }
  }, [generateMockHealthData]);

  useEffect(() => {
    loadHealthData();
  }, [loadHealthData]);

  const calculateGrowthTrend = (data, metric) => {
    if (!data || data.length < 2) return { trend: 'stable', percentage: 0 };
    
    const recent = parseFloat(data[data.length - 1][metric] || 0);
    const previous = parseFloat(data[data.length - 2][metric] || 0);
    const change = previous > 0 ? ((recent - previous) / previous) * 100 : 0;
    
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

  const renderOverview = () => {
    if (!selectedChild) return null;

    const latestHealth = healthData[healthData.length - 1] || {};
    const latestGrowth = growthData[growthData.length - 1] || {};
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
                   latestHealth?.healthStatus === 'needs_attention' ? 'Fair' : 'Good'}
                </p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getHealthStatusColor(latestHealth?.healthStatus || 'healthy')}`}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {latestHealth?.healthStatus || 'healthy'}
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
              {healthData.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <Stethoscope className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p>No health records available</p>
                </div>
              )}
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
              <p className="text-2xl font-bold text-green-600">{latestGrowth?.growthPercentile || '75'}th</p>
              <p className="text-sm text-gray-600">Growth Percentile</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{latestGrowth?.bmi || latestHealth?.bmi || '16.2'}</p>
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

  const renderPlaceholderView = (title, description) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="text-center py-12">
        <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500 mt-2">Advanced charts and detailed analytics coming soon!</p>
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          <div>
            <p className="text-yellow-700 font-medium">Demo Mode</p>
            <p className="text-yellow-600 text-sm">Showing demonstration data. {error}</p>
          </div>
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
      {viewMode === 'growth' && renderPlaceholderView('Growth Charts', 'Interactive growth charts showing weight and height progress over time')}
      {viewMode === 'health' && renderPlaceholderView('Health Records', 'Comprehensive health checkup history and medical records')}
      {viewMode === 'vaccinations' && renderPlaceholderView('Vaccination Schedule', 'Complete immunization tracking and upcoming vaccination reminders')}
    </div>
  );
};

export default ParentHealthGrowth;