import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Calendar, 
  Heart, 
  Scale, 
  Ruler, 
  Stethoscope,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ChildDetailsCard = ({ child, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'normal':
      case 'up-to-date':
        return 'text-green-600 bg-green-100';
      case 'needs-attention':
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'underweight':
      case 'overweight':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
      case 'normal':
      case 'up-to-date':
        return <CheckCircle className="w-4 h-4" />;
      case 'needs-attention':
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
              <p className="text-gray-600">{child.ageDisplay || child.age} • {child.gender}</p>
              <p className="text-sm text-gray-500">{child.anganwadiCenter}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewDetails(child.id)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(child.healthStatus)}`}>
              {getStatusIcon(child.healthStatus)}
              <span className="ml-1 capitalize">{child.healthStatus}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Health Status</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(child.vaccinationStatus)}`}>
              {getStatusIcon(child.vaccinationStatus)}
              <span className="ml-1 capitalize">{child.vaccinationStatus}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Vaccinations</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Scale className="w-5 h-5 text-green-500" />
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(child.nutritionStatus)}`}>
              {getStatusIcon(child.nutritionStatus)}
              <span className="ml-1 capitalize">{child.nutritionStatus}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Nutrition</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatDate(child.nextCheckup)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Next Checkup</p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100"
        >
          <div className="p-6 space-y-4">
            {/* Basic Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date of Birth:</span>
                  <p className="font-medium">{formatDate(child.dateOfBirth)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Blood Group:</span>
                  <p className="font-medium">{child.bloodGroup || 'Not recorded'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Enrollment Date:</span>
                  <p className="font-medium">{formatDate(child.enrollmentDate)}</p>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            {(child.currentWeight || child.currentHeight) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Health Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {child.currentWeight && (
                    <div className="flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-green-500" />
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <p className="font-medium">{child.currentWeight} kg</p>
                      </div>
                    </div>
                  )}
                  {child.currentHeight && (
                    <div className="flex items-center space-x-2">
                      <Ruler className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-500">Height:</span>
                        <p className="font-medium">{child.currentHeight} cm</p>
                      </div>
                    </div>
                  )}
                  {child.birthWeight && (
                    <div className="flex items-center space-x-2">
                      <Baby className="w-4 h-4 text-purple-500" />
                      <div>
                        <span className="text-gray-500">Birth Weight:</span>
                        <p className="font-medium">{child.birthWeight} kg</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medical History */}
            {child.medicalHistory && (child.medicalHistory.allergies?.length > 0 || child.medicalHistory.medications?.length > 0) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Medical Information</h4>
                <div className="space-y-2 text-sm">
                  {child.medicalHistory.allergies?.length > 0 && (
                    <div>
                      <span className="text-gray-500">Allergies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {child.medicalHistory.allergies.map((allergy, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {child.medicalHistory.medications?.length > 0 && (
                    <div>
                      <span className="text-gray-500">Current Medications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {child.medicalHistory.medications.map((medication, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {medication}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Special Needs */}
            {child.specialNeeds && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Special Needs</h4>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                  {child.specialNeeds}
                </p>
              </div>
            )}

            {/* Last Updated */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Last updated: {formatDate(child.lastCheckup)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChildDetailsCard;
