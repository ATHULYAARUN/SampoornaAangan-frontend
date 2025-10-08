import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  DollarSign, 
  Award, 
  Users,
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
  X,
  FileText,
  Phone,
  MapPin,
  Clock,
  IndianRupee
} from 'lucide-react';

const WelfareBenefitsSimple = () => {
  const [schemes, setSchemes] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [applying, setApplying] = useState(false);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🧪 Testing direct API calls...');
      console.log('🔗 Schemes API URL: http://localhost:5005/api/schemes');
      console.log('🔗 Enrollments API URL: http://localhost:5005/api/schemes/enrollments');
      
      // Fetch schemes
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const schemesResponse = await fetch(`${API_BASE_URL}/schemes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Schemes Response status:', schemesResponse.status);
      console.log('📊 Schemes Response headers:', schemesResponse.headers.get('content-type'));
      
      if (!schemesResponse.ok) {
        const errorText = await schemesResponse.text();
        console.error('❌ Schemes API Error:', errorText);
        throw new Error(`HTTP ${schemesResponse.status}: ${errorText}`);
      }
      
      const responseText = await schemesResponse.text();
      console.log('📋 Raw response:', responseText.substring(0, 200) + '...');
      
      let schemesResult;
      try {
        schemesResult = JSON.parse(responseText);
        console.log('✅ Schemes API Response:', schemesResult);
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        console.error('❌ Response was:', responseText);
        throw new Error('Server returned invalid JSON response');
      }
      
      // Fetch enrollments
      const enrollmentsResponse = await fetch(`${API_BASE_URL}/schemes/enrollments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Enrollments Response status:', enrollmentsResponse.status);
      console.log('📊 Enrollments Response headers:', enrollmentsResponse.headers.get('content-type'));
      
      let enrollmentsResult = { data: [] };
      if (enrollmentsResponse.ok) {
        const enrollmentsText = await enrollmentsResponse.text();
        console.log('📋 Raw enrollments response:', enrollmentsText.substring(0, 200) + '...');
        
        try {
          enrollmentsResult = JSON.parse(enrollmentsText);
          console.log('✅ Enrollments API Response:', enrollmentsResult);
        } catch (parseError) {
          console.error('❌ Enrollments JSON Parse Error:', parseError);
          console.warn('⚠️ Using default empty enrollments array');
        }
      } else {
        console.warn('⚠️ Could not fetch enrollments, continuing without enrollment data');
      }
      
      setSchemes(schemesResult.data.schemes || []);
      setEnrollments(enrollmentsResult.data.enrollments || []);
      
    } catch (error) {
      console.error('❌ Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if a scheme is enrolled by this user
  const getEnrollmentStatus = (schemeId) => {
    const enrollment = enrollments.find(e => e.schemeId === schemeId);
    return enrollment ? enrollment.status : null;
  };

  // Get enrollment badge color based on status
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'applied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'enrolled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && showDetails) {
        handleCloseDetails();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showDetails]);

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedScheme(null);
  };

  const handleDownloadSchemeInfo = (scheme) => {
    // Create a simple text file with scheme information
    const schemeInfo = `
${scheme.name}
${'='.repeat(scheme.name.length)}

Category: ${scheme.category}
Description: ${scheme.description}

Benefits:
- Amount: ₹${scheme.benefits?.amount?.toLocaleString()} per ${scheme.benefits?.frequency}
- Description: ${scheme.benefits?.description}

Eligibility:
- Age: ${scheme.eligibility?.minAge}-${scheme.eligibility?.maxAge} years
- Gender: ${scheme.eligibility?.gender}
- Income: ${scheme.eligibility?.income || 'All categories'}

Required Documents:
${scheme.documents?.map(doc => `- ${doc}`).join('\n')}

How to Apply:
1. Visit your nearest Anganwadi Center
2. Submit the required documents
3. Fill out the application form
4. Receive confirmation within 7-10 working days

Contact:
- Helpline: 1800-XXX-XXXX
- Local Office: Anganwadi Center

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download file
    const blob = new Blob([schemeInfo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '_')}_Info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleApplyNow = async (scheme) => {
    // Check if already applied
    const enrollmentStatus = getEnrollmentStatus(scheme._id);
    if (enrollmentStatus) {
      alert(`You have already ${enrollmentStatus} for this scheme.`);
      return;
    }

    // Confirm application
    const confirmed = window.confirm(
      `Do you want to apply for "${scheme.name}"?\n\nThis will generate an application number and you will need to visit your nearest Anganwadi Center with the required documents.`
    );
    
    if (!confirmed) return;

    try {
      setApplying(true);
      
      // Call the enrollment API
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
      const response = await fetch(`${API_BASE_URL}/schemes/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          childId: 'demo-child-id', // In real app, get from selected child
          schemeId: scheme._id, // Use _id instead of id for MongoDB
          parentName: 'Demo Parent', // In real app, get from auth context
          childName: 'Demo Child' // In real app, get from selected child
        })
      });

      console.log('📊 Enroll Response status:', response.status);
      console.log('📊 Enroll Response headers:', response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Enrollment API Error:', errorText);
        throw new Error(`Failed to submit application: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('📋 Raw enrollment response:', responseText.substring(0, 200) + '...');
      
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Enrollment API Response:', result);
      } catch (parseError) {
        console.error('❌ Enrollment JSON Parse Error:', parseError);
        console.error('❌ Response was:', responseText);
        throw new Error('Server returned invalid JSON response for enrollment');
      }
      
      alert(
        `Application Submitted Successfully!\n\nApplication Number: ${result.data.enrollment.applicationNumber}\n\nNext Steps:\n1. Visit your nearest Anganwadi Center\n2. Submit required documents\n3. Complete the application form\n\nYou will receive confirmation within 7-10 working days.`
      );
      
      // Reload data to show updated enrollment status
      await loadSchemes();
      setShowDetails(false);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(`Error submitting application: ${error.message}`);
    } finally {
      setApplying(false);
    }
  };

  const renderSchemeDetailsModal = () => {
    if (!selectedScheme || !showDetails) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseDetails}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${
                  selectedScheme.category === 'nutrition' ? 'bg-green-100' :
                  selectedScheme.category === 'health' ? 'bg-red-100' :
                  selectedScheme.category === 'education' ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  <Award className={`h-8 w-8 ${
                    selectedScheme.category === 'nutrition' ? 'text-green-600' :
                    selectedScheme.category === 'health' ? 'text-red-600' :
                    selectedScheme.category === 'education' ? 'text-blue-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedScheme.name}</h2>
                  <p className="text-gray-600 capitalize">{selectedScheme.category} Scheme</p>
                </div>
              </div>
              <button
                onClick={handleCloseDetails}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedScheme.description}</p>
            </div>

            {/* Benefits Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold text-green-700">
                    ₹{selectedScheme.benefits?.amount?.toLocaleString()} per {selectedScheme.benefits?.frequency}
                  </span>
                </div>
                <p className="text-gray-700">{selectedScheme.benefits?.description}</p>
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Age Range</span>
                  </div>
                  <p className="text-blue-700">
                    {selectedScheme.eligibility?.minAge} - {selectedScheme.eligibility?.maxAge} years
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Gender</span>
                  </div>
                  <p className="text-purple-700 capitalize">
                    {selectedScheme.eligibility?.gender === 'both' ? 'All Children' : selectedScheme.eligibility?.gender + ' Children'}
                  </p>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedScheme.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Apply</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
                    <p className="text-gray-700">Visit your nearest Anganwadi Center</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
                    <p className="text-gray-700">Submit the required documents</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
                    <p className="text-gray-700">Fill out the application form</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">4</div>
                    <p className="text-gray-700">Receive confirmation within 7-10 working days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Helpline</p>
                    <p className="text-blue-700">1800-XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Local Office</p>
                    <p className="text-green-700">Anganwadi Center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleApplyNow(selectedScheme)}
                disabled={applying || getEnrollmentStatus(selectedScheme._id)}
                className={`flex-1 py-3 px-6 rounded-lg transition-colors font-medium ${
                  getEnrollmentStatus(selectedScheme._id) 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : applying 
                    ? 'bg-purple-400 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {applying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline mr-2"></div>
                    Applying...
                  </>
                ) : getEnrollmentStatus(selectedScheme._id) ? (
                  <>
                    <Clock className="h-5 w-5 inline mr-2" />
                    {getEnrollmentStatus(selectedScheme._id) === 'pending' ? 'Approval Pending' :
                     getEnrollmentStatus(selectedScheme._id) === 'approved' ? 'Approved' :
                     getEnrollmentStatus(selectedScheme._id) === 'enrolled' ? 'Enrolled' :
                     'Already ' + getEnrollmentStatus(selectedScheme._id)}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 inline mr-2" />
                    Apply Now
                  </>
                )}
              </button>
              <button 
                onClick={() => handleDownloadSchemeInfo(selectedScheme)}
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Download className="h-5 w-5 inline mr-2" />
                Download Info
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
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
              onClick={loadSchemes}
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
            Government welfare scheme benefits for children aged 3-6 years
          </p>
          <p className="text-sm text-purple-600 mt-2">
            Found {schemes.length} available schemes
          </p>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <motion.div
              key={scheme._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
                
                {/* Enrollment Status Badge */}
                {getEnrollmentStatus(scheme._id) && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(getEnrollmentStatus(scheme._id))}`}>
                    {getEnrollmentStatus(scheme._id).toUpperCase()}
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

              <div className="flex gap-2">
                {getEnrollmentStatus(scheme._id) ? (
                  // Show enrollment status button if already enrolled
                  <button 
                    className={`flex-1 py-2 px-4 rounded-lg cursor-not-allowed text-sm font-medium flex items-center justify-center ${
                      getEnrollmentStatus(scheme._id) === 'pending' 
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                        : getEnrollmentStatus(scheme._id) === 'approved'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : getEnrollmentStatus(scheme._id) === 'enrolled'
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                    disabled
                  >
                    {getEnrollmentStatus(scheme._id) === 'pending' ? (
                      <>
                        <div className="animate-pulse h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                        Approval Pending
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        {getEnrollmentStatus(scheme._id) === 'approved' ? 'Approved' :
                         getEnrollmentStatus(scheme._id) === 'enrolled' ? 'Enrolled' :
                         'Application ' + getEnrollmentStatus(scheme._id)}
                      </>
                    )}
                  </button>
                ) : (
                  // Show View Details button if not enrolled
                  <button 
                    onClick={() => handleViewDetails(scheme)}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    View Details
                  </button>
                )}
                
                <button 
                  onClick={() => handleDownloadSchemeInfo(scheme)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Download Scheme Information"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {schemes.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>
            <p className="text-gray-500">No welfare schemes available at the moment</p>
          </div>
        )}

        {/* Scheme Details Modal */}
        {renderSchemeDetailsModal()}
      </div>
    </div>
  );
};

export default WelfareBenefitsSimple;