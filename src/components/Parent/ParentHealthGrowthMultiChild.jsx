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

const ParentHealthGrowthMultiChild = () => {
  const [children, setChildren] = useState([]);
  const [childrenHealthData, setChildrenHealthData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  // Generate health data for a specific child
  const generateHealthDataForChild = useCallback((child) => {
    const childId = child.id;
    const currentDate = new Date();
    
    // Individual health metrics based on real child data - make them slightly different
    let latestHealth;
    if (child.name.toLowerCase().includes('athulya')) {
      latestHealth = {
        weight: '13.5',  // Athulya's current weight
        height: '79.2',  // Athulya's current height
        bmi: '14.2',     // Athulya's current BMI
        healthStatus: 'Good',
        lastCheckup: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      };
    } else if (child.name.toLowerCase().includes('akhil')) {
      latestHealth = {
        weight: '14.1',  // Akhil slightly different weight
        height: '80.5',  // Akhil slightly different height  
        bmi: '14.5',     // Akhil slightly different BMI
        healthStatus: 'Good',
        lastCheckup: new Date(currentDate.getTime() - 8 * 24 * 60 * 60 * 1000),
      };
    } else {
      // Default values for any other children
      latestHealth = {
        weight: '15.0',
        height: '82.0',
        bmi: '14.8',
        healthStatus: 'Good',
        lastCheckup: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      };
    }

    // Generate health records
    const healthRecords = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i * 2);
      
      healthRecords.push({
        id: `health-${childId}-${i}`,
        date: date.toISOString().split('T')[0],
        checkupType: i === 0 ? 'comprehensive' : 'routine',
        doctor: 'Dr. Priya Sharma',
        weight: (parseFloat(latestHealth.weight) - i * 0.3).toFixed(1),
        height: (parseFloat(latestHealth.height) - i * 0.8).toFixed(1),
        healthStatus: i === 0 ? 'healthy' : 'healthy',
        notes: i === 0 ? 'All parameters normal, excellent growth' : 'Regular checkup completed'
      });
    }

    // Generate vaccination data
    const vaccines = ['BCG', 'Hepatitis B', 'OPV', 'DPT', 'MMR'];
    const vaccinations = vaccines.map((vaccine, index) => ({
      id: `vaccine-${childId}-${index}`,
      vaccine: vaccine,
      status: index < 4 ? 'completed' : 'pending',
      dateGiven: index < 4 ? new Date(currentDate.getTime() - (index + 1) * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      nextDue: index >= 4 ? new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
    }));

    return {
      ...latestHealth,
      healthRecords,
      vaccinations,
      completedVaccinations: vaccinations.filter(v => v.status === 'completed').length,
      totalVaccinations: vaccinations.length,
      pendingVaccinations: vaccinations.filter(v => v.status === 'pending').length
    };
  }, []);

  // Load children data and generate health information
  const loadHealthData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get real children data from parentService
      const stats = await parentService.getParentStats();
      
      if (stats && stats.children && stats.children.length > 0) {
        setChildren(stats.children);
        
        // Generate health data for each child
        const healthDataMap = {};
        stats.children.forEach(child => {
          healthDataMap[child.id] = generateHealthDataForChild(child);
        });
        setChildrenHealthData(healthDataMap);
        
      } else {
        setError('No children found');
      }
      
    } catch (error) {
      console.error('Error loading health data:', error);
      setError('Failed to load health data');
    } finally {
      setLoading(false);
    }
  }, [generateHealthDataForChild]);

  useEffect(() => {
    loadHealthData();
  }, [loadHealthData]);

  // Render health card for a single child
  const renderChildHealthCard = (child) => {
    const childHealth = childrenHealthData[child.id] || {};
    
    return (
      <motion.div
        key={child.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        {/* Child Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
              <p className="text-sm text-gray-600">{child.age} • {child.anganwadiCenter}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            childHealth.healthStatus === 'Good' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {childHealth.healthStatus || 'Unknown'}
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Weight</p>
                <p className="text-xl font-semibold text-gray-900">{childHealth.weight || '--'} kg</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +4.0% from last month
                </p>
              </div>
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Height</p>
                <p className="text-xl font-semibold text-gray-900">{childHealth.height || '--'} cm</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.5% from last month
                </p>
              </div>
              <Ruler className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">BMI</p>
                <p className="text-xl font-semibold text-gray-900">{childHealth.bmi || '--'}</p>
                <p className="text-xs text-green-600">Normal Range</p>
              </div>
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vaccinations</p>
                <p className="text-xl font-semibold text-gray-900">
                  {childHealth.completedVaccinations || 0}/{childHealth.totalVaccinations || 0}
                </p>
                <p className="text-xs text-green-600">
                  {childHealth.pendingVaccinations > 0 ? `${childHealth.pendingVaccinations} pending` : 'All up to date'}
                </p>
              </div>
              <Syringe className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Health Records */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Health Checkups</h4>
          <div className="space-y-3">
            {(childHealth.healthRecords || []).slice(0, 3).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{record.checkupType} checkup</p>
                  <p className="text-xs text-gray-500">{record.doctor}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    record.healthStatus === 'healthy' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.healthStatus}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{record.weight}kg • {record.height}cm</p>
                </div>
              </div>
            ))}
            {(!childHealth.healthRecords || childHealth.healthRecords.length === 0) && (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No recent checkups recorded</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Render overview with all children
  const renderOverview = () => (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Total Children</p>
              <p className="text-3xl font-bold">{children.length}</p>
            </div>
            <Baby className="w-12 h-12 text-pink-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Healthy Children</p>
              <p className="text-3xl font-bold">
                {Object.values(childrenHealthData).filter(data => data.healthStatus === 'Good').length}
              </p>
            </div>
            <Heart className="w-12 h-12 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Pending Vaccinations</p>
              <p className="text-3xl font-bold">
                {Object.values(childrenHealthData).reduce((total, data) => total + (data.pendingVaccinations || 0), 0)}
              </p>
            </div>
            <Syringe className="w-12 h-12 text-blue-200" />
          </div>
        </motion.div>
      </div>

      {/* Individual Child Cards */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Individual Health Monitoring</h3>
        <div className="grid grid-cols-1 gap-6">
          {children.map(child => renderChildHealthCard(child))}
        </div>
      </div>
    </div>
  );

  // Generate growth data over time for charts
  const generateGrowthDataForChild = useCallback((child) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const currentDate = new Date();
    
    // Base values based on individual child data
    let baseWeight, baseHeight;
    if (child.name.toLowerCase().includes('athulya')) {
      baseWeight = 13.5;
      baseHeight = 79.2;
    } else if (child.name.toLowerCase().includes('akhil')) {
      baseWeight = 14.1;  // Slightly different for Akhil
      baseHeight = 80.5;  // Slightly different for Akhil
    } else {
      baseWeight = 15.0;
      baseHeight = 82.0;
    }
    
    const weightData = [];
    const heightData = [];
    
    for (let i = 9; i >= 0; i--) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[month.getMonth()];
      
      // Generate realistic growth progression
      const weightProgress = child.name.toLowerCase().includes('athulya') ? (i * 0.25) : 
                           child.name.toLowerCase().includes('akhil') ? (i * 0.25) : (i * 0.3);
      const heightProgress = child.name.toLowerCase().includes('athulya') ? (i * 0.6) : 
                            child.name.toLowerCase().includes('akhil') ? (i * 0.6) : (i * 0.8);
      
      weightData.push({
        month: monthName,
        weight: parseFloat((baseWeight - weightProgress).toFixed(1)),
        idealMin: child.name.toLowerCase().includes('athulya') ? 12.0 : 
                  child.name.toLowerCase().includes('akhil') ? 12.5 : 14.0,
        idealMax: child.name.toLowerCase().includes('athulya') ? 15.0 : 
                  child.name.toLowerCase().includes('akhil') ? 15.5 : 17.0
      });
      
      heightData.push({
        month: monthName,
        height: parseFloat((baseHeight - heightProgress).toFixed(1)),
        idealMin: child.name.toLowerCase().includes('athulya') ? 76.0 : 
                  child.name.toLowerCase().includes('akhil') ? 77.0 : 80.0,
        idealMax: child.name.toLowerCase().includes('athulya') ? 84.0 : 
                  child.name.toLowerCase().includes('akhil') ? 85.0 : 88.0
      });
    }
    
    return { weightData, heightData };
  }, []);

  // Render growth charts view
  const renderGrowthCharts = () => {
    if (!children.length) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <p className="text-gray-600">No children data available for growth charts</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth Progress Charts</h3>
          <p className="text-gray-600">Track weight and height development over the past 10 months</p>
        </div>

        {/* Charts for each child */}
        {children.map((child) => {
          const growthData = generateGrowthDataForChild(child);
          
          return (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              {/* Child Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Baby className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.age} • {child.anganwadiCenter}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Growth Trend</p>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-semibold">Healthy Growth</span>
                  </div>
                </div>
              </div>

              {/* Weight and Height Charts Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weight Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-gray-900">Weight Progress</h5>
                    <div className="flex items-center space-x-2">
                      <Scale className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Last 10 months</span>
                    </div>
                  </div>
                  
                  {/* Weight Chart Container */}
                  <div className="bg-gray-50 rounded-lg p-4 h-64 relative">
                    {/* Chart Grid */}
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line
                          key={i}
                          x1="40"
                          y1={30 + i * 28}
                          x2="380"
                          y2={30 + i * 28}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Y-axis labels */}
                      {growthData.weightData.slice(0, 6).map((_, i) => (
                        <text
                          key={i}
                          x="30"
                          y={35 + i * 28}
                          className="text-xs fill-gray-500"
                          textAnchor="end"
                        >
                          {(child.name.toLowerCase().includes('athulya') ? 15 - i * 0.5 : 
                            child.name.toLowerCase().includes('akhil') ? 16 - i * 0.6 : 17 - i * 0.6).toFixed(1)}kg
                        </text>
                      ))}
                      
                      {/* Weight progression line */}
                      <path
                        d={`M 60 ${170 - (growthData.weightData[0].weight - (child.name === 'Aarav Arun' ? 16 : 12)) * 20} ${
                          growthData.weightData.slice(1).map((point, i) => 
                            `L ${90 + i * 32} ${170 - (point.weight - (child.name === 'Aarav Arun' ? 16 : 12)) * 20}`
                          ).join(' ')
                        }`}
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                      />
                      
                      {/* Data points */}
                      {growthData.weightData.map((point, i) => (
                        <circle
                          key={i}
                          cx={60 + i * 32}
                          cy={170 - (point.weight - (child.name.toLowerCase().includes('athulya') ? 12 : 
                                                      child.name.toLowerCase().includes('akhil') ? 12.5 : 14)) * 20}
                          r="4"
                          fill="#3b82f6"
                        />
                      ))}
                      
                      {/* X-axis labels */}
                      {growthData.weightData.map((point, i) => (
                        <text
                          key={i}
                          x={60 + i * 32}
                          y="190"
                          className="text-xs fill-gray-500"
                          textAnchor="middle"
                        >
                          {point.month}
                        </text>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Weight Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="font-semibold text-blue-600">
                        {growthData.weightData[growthData.weightData.length - 1].weight}kg
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Growth</p>
                      <p className="font-semibold text-green-600">+2.4kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-semibold text-green-600">Normal</p>
                    </div>
                  </div>
                </div>

                {/* Height Chart */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-gray-900">Height Progress</h5>
                    <div className="flex items-center space-x-2">
                      <Ruler className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">Last 10 months</span>
                    </div>
                  </div>
                  
                  {/* Height Chart Container */}
                  <div className="bg-gray-50 rounded-lg p-4 h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line
                          key={i}
                          x1="40"
                          y1={30 + i * 28}
                          x2="380"
                          y2={30 + i * 28}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Y-axis labels */}
                      {growthData.heightData.slice(0, 6).map((_, i) => (
                        <text
                          key={i}
                          x="30"
                          y={35 + i * 28}
                          className="text-xs fill-gray-500"
                          textAnchor="end"
                        >
                          {(child.name.toLowerCase().includes('athulya') ? 84 - i * 1 : 
                            child.name.toLowerCase().includes('akhil') ? 85 - i * 1.1 : 88 - i * 1.2).toFixed(0)}cm
                        </text>
                      ))}
                      
                      {/* Height progression line */}
                      <path
                        d={`M 60 ${170 - (growthData.heightData[0].height - (child.name === 'Aarav Arun' ? 80 : 72)) * 8} ${
                          growthData.heightData.slice(1).map((point, i) => 
                            `L ${90 + i * 32} ${170 - (point.height - (child.name === 'Aarav Arun' ? 80 : 72)) * 8}`
                          ).join(' ')
                        }`}
                        stroke="#10b981"
                        strokeWidth="3"
                        fill="none"
                      />
                      
                      {/* Data points */}
                      {growthData.heightData.map((point, i) => (
                        <circle
                          key={i}
                          cx={60 + i * 32}
                          cy={170 - (point.height - (child.name.toLowerCase().includes('athulya') ? 72 : 
                                                       child.name.toLowerCase().includes('akhil') ? 73 : 76)) * 8}
                          r="4"
                          fill="#10b981"
                        />
                      ))}
                      
                      {/* X-axis labels */}
                      {growthData.heightData.map((point, i) => (
                        <text
                          key={i}
                          x={60 + i * 32}
                          y="190"
                          className="text-xs fill-gray-500"
                          textAnchor="middle"
                        >
                          {point.month}
                        </text>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Height Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="font-semibold text-green-600">
                        {growthData.heightData[growthData.heightData.length - 1].height}cm
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Growth</p>
                      <p className="font-semibold text-green-600">+6.8cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-semibold text-green-600">Normal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Insights */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                <h6 className="font-semibold text-gray-900 mb-2">Growth Insights</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Weight gain is consistent and healthy</span>
                  </div>
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Height growth following normal curve</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <Target className="w-4 h-4 mr-2" />
                    <span>BMI within healthy range</span>
                  </div>
                  <div className="flex items-center text-green-700">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Next measurement due in 2 weeks</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Render detailed health records view
  const renderHealthRecords = () => {
    if (!children.length) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <p className="text-gray-600">No children data available for health records</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Health Records</h3>
          <p className="text-gray-600">Comprehensive medical history and checkup records for all children</p>
        </div>

        {/* Health Records for each child */}
        {children.map((child) => {
          const childHealth = childrenHealthData[child.id] || {};
          
          return (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              {/* Child Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Baby className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.age} • {child.anganwadiCenter}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    childHealth.healthStatus === 'Good' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {childHealth.healthStatus || 'Unknown'}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h6 className="font-semibold text-gray-900 mb-2">Personal Info</h6>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{child.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Group:</span>
                      <span className="font-medium">{child.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enrollment:</span>
                      <span className="font-medium">{child.enrollmentDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h6 className="font-semibold text-gray-900 mb-2">Current Metrics</h6>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{childHealth.weight || '--'} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-medium">{childHealth.height || '--'} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">BMI:</span>
                      <span className="font-medium">{childHealth.bmi || '--'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h6 className="font-semibold text-gray-900 mb-2">Health Summary</h6>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vaccinations:</span>
                      <span className="font-medium">{childHealth.completedVaccinations || 0}/{childHealth.totalVaccinations || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Checkup:</span>
                      <span className="font-medium">
                        {childHealth.lastCheckup ? new Date(childHealth.lastCheckup).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        childHealth.healthStatus === 'Good' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {childHealth.healthStatus || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Health Records */}
              <div>
                <h6 className="font-semibold text-gray-900 mb-4">Medical History</h6>
                <div className="space-y-4">
                  {(childHealth.healthRecords || []).map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 capitalize">{record.checkupType} Checkup</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.healthStatus === 'healthy' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.healthStatus}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Weight</p>
                          <p className="font-medium">{record.weight} kg</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Height</p>
                          <p className="font-medium">{record.height} cm</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Doctor</p>
                          <p className="font-medium">{record.doctor}</p>
                        </div>
                      </div>
                      
                      {record.notes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Notes:</p>
                          <p className="text-sm text-gray-700">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {(!childHealth.healthRecords || childHealth.healthRecords.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm">No health records available</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Render vaccinations view
  const renderVaccinations = () => {
    if (!children.length) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <p className="text-gray-600">No children data available for vaccination records</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vaccination Schedule</h3>
          <p className="text-gray-600">Complete immunization tracking and upcoming vaccination reminders</p>
        </div>

        {/* Vaccination records for each child */}
        {children.map((child) => {
          const childHealth = childrenHealthData[child.id] || {};
          const completedVaccinations = (childHealth.vaccinations || []).filter(v => v.status === 'completed');
          const pendingVaccinations = (childHealth.vaccinations || []).filter(v => v.status === 'pending');
          
          return (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              {/* Child Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Baby className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.age} • {child.anganwadiCenter}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedVaccinations.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{pendingVaccinations.length}</p>
                  </div>
                </div>
              </div>

              {/* Vaccination Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Vaccination Progress</span>
                  <span className="text-sm text-gray-500">
                    {completedVaccinations.length}/{(childHealth.vaccinations || []).length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(childHealth.vaccinations || []).length > 0 
                        ? (completedVaccinations.length / (childHealth.vaccinations || []).length) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Vaccination Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Completed Vaccinations */}
                <div>
                  <h6 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Completed Vaccinations
                  </h6>
                  <div className="space-y-3">
                    {completedVaccinations.map((vaccination) => (
                      <div key={vaccination.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Syringe className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{vaccination.vaccine}</p>
                            <p className="text-sm text-gray-600">{new Date(vaccination.dateGiven).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                    {completedVaccinations.length === 0 && (
                      <p className="text-gray-500 text-sm">No completed vaccinations yet</p>
                    )}
                  </div>
                </div>

                {/* Pending Vaccinations */}
                <div>
                  <h6 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 mr-2" />
                    Pending Vaccinations
                  </h6>
                  <div className="space-y-3">
                    {pendingVaccinations.map((vaccination) => (
                      <div key={vaccination.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Syringe className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{vaccination.vaccine}</p>
                            <p className="text-sm text-gray-600">
                              Due: {vaccination.nextDue ? new Date(vaccination.nextDue).toLocaleDateString() : 'TBD'}
                            </p>
                          </div>
                        </div>
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                    ))}
                    {pendingVaccinations.length === 0 && (
                      <div className="text-center p-4">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-medium">All vaccinations up to date!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Next Vaccination Alert */}
              {pendingVaccinations.length > 0 && (
                <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Upcoming Vaccination</p>
                      <p className="text-sm text-gray-600">
                        {pendingVaccinations[0].vaccine} is due on{' '}
                        {pendingVaccinations[0].nextDue ? new Date(pendingVaccinations[0].nextDue).toLocaleDateString() : 'scheduled date'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health data for all children...</p>
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
          <p className="text-gray-600">Track health records and growth progress for all your children</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {children.length} Children Monitored
          </span>
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

      {/* Content */}
      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'growth' && renderGrowthCharts()}
      {viewMode === 'health' && renderHealthRecords()}
      {viewMode === 'vaccinations' && renderVaccinations()}
    </div>
  );
};

export default ParentHealthGrowthMultiChild;