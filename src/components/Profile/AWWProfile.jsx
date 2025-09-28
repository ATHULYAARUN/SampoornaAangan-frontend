import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Award,
  Users,
  Baby,
  Heart,
  Activity,
  Clock,
  Building
} from 'lucide-react';

const AWWProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    anganwadiCenter: '',
    employeeId: '',
    joinDate: '',
    qualification: '',
    experience: '',
    specialization: '',
    workingHours: '',
    emergencyContact: '',
    profilePicture: null
  });
  const [tempData, setTempData] = useState({});

  // Load profile data from localStorage
  useEffect(() => {
    const userData = {
      name: localStorage.getItem('userName') || 'Mohanakumari',
      email: localStorage.getItem('userEmail') || 'mohanakumari.akkarakunnu@anganwadi.kerala.gov.in',
      phone: localStorage.getItem('userPhone') || '+91 9447852963',
      address: localStorage.getItem('userAddress') || 'Akkarakunnu, Thiruvananthapuram District, Kerala - 695301',
      anganwadiCenter: 'Akkarakunnu Anganwadi Center',
      employeeId: 'AWW-AKK-047',
      joinDate: '2019-03-12',
      qualification: 'Higher Secondary + ICDS Training Certification',
      experience: '5 years 6 months',
      specialization: 'Early Childhood Development & Maternal Health',
      workingHours: '10:00 AM - 4:00 PM',
      emergencyContact: '+91 9447852964',
      profilePicture: null
    };
    setProfileData(userData);
    setTempData(userData);
  }, []);

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    // Save to localStorage
    localStorage.setItem('userName', tempData.name);
    localStorage.setItem('userEmail', tempData.email);
    localStorage.setItem('userPhone', tempData.phone);
    localStorage.setItem('userAddress', tempData.address);
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              {(isEditing ? tempData.profilePicture : profileData.profilePicture) ? (
                <img 
                  src={isEditing ? tempData.profilePicture : profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">
              {isEditing ? tempData.name : profileData.name}
            </h1>
            <p className="text-xl opacity-90 mb-2">Anganwadi Worker</p>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm opacity-90">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Building className="w-4 h-4" />
                <span>{profileData.anganwadiCenter}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Clock className="w-4 h-4" />
                <span>{profileData.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex space-x-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{profileData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{profileData.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{profileData.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  value={tempData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="text-gray-900">{profileData.address}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Professional Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <span className="text-gray-900">{profileData.employeeId}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{new Date(profileData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <span className="text-gray-900">{profileData.qualification}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <span className="text-gray-900">{profileData.specialization}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{profileData.emergencyContact}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AWWProfile;