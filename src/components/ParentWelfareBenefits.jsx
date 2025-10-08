import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  DollarSign, 
  Award, 
  FileText, 
  Download,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  PieChart,
  Filter,
  Search
} from 'lucide-react';
import parentService from '../services/parentService';
import welfareSchemesService from '../services/welfareSchemesService';
import { testAPIConnection } from '../test/apiTest';

const ParentWelfareBenefits = () => {
  const [children, setChildren] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChild, setSelectedChild] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Loading welfare benefits data...');
      console.log('🔗 Environment check:', {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        NODE_ENV: import.meta.env.NODE_ENV,
        DEV: import.meta.env.DEV
      });
      
      // Test API connection first
      console.log('🧪 Testing API connection...');
      const apiTest = await testAPIConnection();
      if (!apiTest) {
        throw new Error('API connection test failed');
      }
      
      // Load children data
      console.log('👶 Loading children data...');
      const childrenData = await parentService.getChildren();
      console.log('👶 Loaded children:', childrenData);
      setChildren(childrenData);
      
      if (childrenData.length > 0) {
        setSelectedChild(childrenData[0]);
      }
      
      // Load welfare schemes
      console.log('📋 Loading welfare schemes...');
      const schemesData = await welfareSchemesService.getAllSchemes();
      console.log('📋 Loaded schemes:', schemesData);
      setSchemes(schemesData.schemes || []);
      
      // Load enrollments
      console.log('📝 Loading enrollments...');
      const enrollmentsData = await welfareSchemesService.getMyEnrollments();
      console.log('📝 Loaded enrollments:', enrollmentsData);
      setEnrollments(enrollmentsData.enrollments || []);
      
      console.log('✅ All welfare benefits data loaded successfully');
      
    } catch (error) {
      console.error('❌ Error loading welfare benefits data:', error);
      setError(`Failed to load welfare benefits data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle scheme enrollment
  const handleEnrollment = async (schemeId) => {
    if (!selectedChild) {
      alert('Please select a child first');
      return;
    }

    try {
      setEnrolling(true);
      console.log('📝 Enrolling child in scheme:', { childId: selectedChild._id, schemeId });
      
      const result = await welfareSchemesService.enrollInScheme(selectedChild._id, schemeId);
      
      if (result.success) {
        alert(`Successfully enrolled ${selectedChild.name} in the welfare scheme!`);
        // Reload enrollments
        const enrollmentsData = await welfareSchemesService.getMyEnrollments();
        setEnrollments(enrollmentsData.enrollments || []);
      }
    } catch (error) {
      console.error('❌ Enrollment failed:', error);
      alert('Enrollment failed. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // Check if child is enrolled in a scheme
  const isEnrolled = (schemeId) => {
    if (!selectedChild) return false;
    return enrollments.some(enrollment => 
      enrollment.childId === selectedChild._id && 
      enrollment.schemeId === schemeId
    );
  };

  // Get enrollment status for a scheme
  const getEnrollmentStatus = (schemeId) => {
    if (!selectedChild) return null;
    return enrollments.find(enrollment => 
      enrollment.childId === selectedChild._id && 
      enrollment.schemeId === schemeId
    );
  };

  // Filter schemes based on active tab and search
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeTab === 'all') return true;
    if (activeTab === 'boys') return scheme.eligibility.gender === 'male' || scheme.eligibility.gender === 'both';
    if (activeTab === 'girls') return scheme.eligibility.gender === 'female' || scheme.eligibility.gender === 'both';
    if (activeTab === 'enrolled') return isEnrolled(scheme._id);
    
    return true;
  });

  // Calculate statistics
  const stats = {
    totalSchemes: schemes.length,
    enrolledSchemes: enrollments.filter(e => selectedChild && e.childId === selectedChild._id).length,
    availableSchemes: selectedChild ? schemes.filter(s => 
      (s.eligibility.gender === selectedChild.gender || s.eligibility.gender === 'both') &&
      !isEnrolled(s._id)
    ).length : 0,
    totalBenefits: enrollments.filter(e => selectedChild && e.childId === selectedChild._id).reduce((sum, e) => {
      const scheme = schemes.find(s => s._id === e.schemeId);
      return sum + (scheme?.benefits?.amount || 0);
    }, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading welfare benefits...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={loadData}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">Welfare Benefits</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Track all welfare scheme benefits, allowances, and support received for your family
          </p>
        </motion.div>

        {/* Child Selection */}
        {children.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Child</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
                <motion.button
                  key={child._id}
                  onClick={() => setSelectedChild(child)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedChild?._id === child._id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      child.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                    }`}>
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{child.name}</p>
                      <p className="text-sm text-gray-600">Age: {child.age}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Statistics Cards */}
        {selectedChild && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Schemes</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalSchemes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrolled</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.enrolledSchemes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.availableSchemes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Benefits</p>
                  <p className="text-2xl font-bold text-gray-800">₹{stats.totalBenefits.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 flex-1 max-w-md">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none flex-1"
              />
            </div>

            <div className="flex gap-2">
              {['all', 'boys', 'girls', 'enrolled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSchemes.map((scheme) => {
              const enrollmentStatus = getEnrollmentStatus(scheme._id);
              const enrolled = isEnrolled(scheme._id);

              return (
                <motion.div
                  key={scheme._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        scheme.category === 'nutrition' ? 'bg-green-100' :
                        scheme.category === 'health' ? 'bg-red-100' :
                        scheme.category === 'education' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        <Award className={`h-6 w-6 ${
                          scheme.category === 'nutrition' ? 'text-green-600' :
                          scheme.category === 'health' ? 'text-red-600' :
                          scheme.category === 'education' ? 'text-blue-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{scheme.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{scheme.category}</p>
                      </div>
                    </div>
                    
                    {enrolled && (
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                        Enrolled
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        ₹{scheme.benefits?.amount?.toLocaleString() || 'N/A'} per month
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600 capitalize">
                        For {scheme.eligibility?.gender || 'all'} children
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">
                        Age {scheme.eligibility?.minAge}-{scheme.eligibility?.maxAge} years
                      </span>
                    </div>
                  </div>

                  {enrollmentStatus && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Application: {enrollmentStatus.applicationNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600 capitalize">
                          Status: {enrollmentStatus.status}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!enrolled && selectedChild && (
                      <button
                        onClick={() => handleEnrollment(scheme._id)}
                        disabled={enrolling}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm font-medium"
                      >
                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                      </button>
                    )}
                    
                    <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSchemes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'No welfare schemes available at the moment'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ParentWelfareBenefits;