import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Save,
  X,
  Baby
} from 'lucide-react';

const PregnantWomanRegistrationForm = ({ onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    husbandName: '',
    husbandPhone: '',
    address: {
      street: '',
      village: '',
      block: '',
      district: '',
      state: '',
      pincode: ''
    },
    lastMenstrualPeriod: '',
    expectedDeliveryDate: '',
    pregnancyNumber: '',
    previousPregnancies: {
      liveBirths: 0,
      stillBirths: 0,
      miscarriages: 0,
      abortions: 0
    },
    bloodGroup: '',
    height: '',
    prePregnancyWeight: '',
    currentWeight: '',
    medicalHistory: {
      diabetes: false,
      hypertension: false,
      heartDisease: false,
      kidneyDisease: false,
      thyroidDisorder: false,
      anemia: false,
      allergies: [],
      medications: [],
      previousComplications: []
    },
    anganwadiCenter: '',
    specialNeeds: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateEDD = (lmpDate) => {
    if (!lmpDate) return '';
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000)); // Add 280 days
    return edd.toISOString().split('T')[0];
  };

  const handleLMPChange = (e) => {
    const lmpDate = e.target.value;
    setFormData(prev => ({
      ...prev,
      lastMenstrualPeriod: lmpDate,
      expectedDeliveryDate: calculateEDD(lmpDate)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.husbandName.trim()) newErrors.husbandName = 'Husband/Partner name is required';
    if (!formData.lastMenstrualPeriod) newErrors.lastMenstrualPeriod = 'Last menstrual period is required';
    if (!formData.pregnancyNumber) newErrors.pregnancyNumber = 'Pregnancy number is required';
    if (!formData.anganwadiCenter.trim()) newErrors.anganwadiCenter = 'Anganwadi center is required';

    // Address validation
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
    if (!formData.address.village.trim()) newErrors['address.village'] = 'Village is required';
    if (!formData.address.block.trim()) newErrors['address.block'] = 'Block is required';
    if (!formData.address.district.trim()) newErrors['address.district'] = 'District is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.pincode.trim()) newErrors['address.pincode'] = 'Pincode is required';

    // Validate phone number
    const phoneRegex = /^(\+91\s?)?[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate email if provided
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate pincode
    const pincodeRegex = /^[0-9]{6}$/;
    if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid 6-digit pincode';
    }

    // Validate age (15-50 years)
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 15 || age > 50) {
        newErrors.dateOfBirth = 'Age must be between 15 and 50 years';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Register Pregnant Woman</h2>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                placeholder="Enter full name"
              />
            </div>
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
              />
            </div>
            {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                placeholder="Enter email address (optional)"
              />
            </div>
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Husband/Partner Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="husbandName"
                value={formData.husbandName}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                placeholder="Enter husband/partner name"
              />
            </div>
            {errors.husbandName && <p className={errorClass}>{errors.husbandName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Husband/Partner Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="husbandPhone"
                value={formData.husbandPhone}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
                placeholder="Enter husband/partner phone"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anganwadi Center *
            </label>
            <input
              type="text"
              name="anganwadiCenter"
              value={formData.anganwadiCenter}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter anganwadi center name"
            />
            {errors.anganwadiCenter && <p className={errorClass}>{errors.anganwadiCenter}</p>}
          </div>
        </div>

        {/* Pregnancy Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Menstrual Period *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="lastMenstrualPeriod"
                  value={formData.lastMenstrualPeriod}
                  onChange={handleLMPChange}
                  className={`${inputClass} pl-12`}
                />
              </div>
              {errors.lastMenstrualPeriod && <p className={errorClass}>{errors.lastMenstrualPeriod}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Delivery Date
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="expectedDeliveryDate"
                  value={formData.expectedDeliveryDate}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  readOnly
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Automatically calculated from LMP
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pregnancy Number *
              </label>
              <select
                name="pregnancyNumber"
                value={formData.pregnancyNumber}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select pregnancy number</option>
                <option value="1">1st Pregnancy</option>
                <option value="2">2nd Pregnancy</option>
                <option value="3">3rd Pregnancy</option>
                <option value="4">4th Pregnancy</option>
                <option value="5">5th Pregnancy</option>
                <option value="6">6+ Pregnancy</option>
              </select>
              {errors.pregnancyNumber && <p className={errorClass}>{errors.pregnancyNumber}</p>}
            </div>
          </div>

          {/* Previous Pregnancies */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Previous Pregnancies (if any)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Births
                </label>
                <input
                  type="number"
                  name="previousPregnancies.liveBirths"
                  value={formData.previousPregnancies.liveBirths}
                  onChange={handleChange}
                  className={inputClass}
                  min="0"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Still Births
                </label>
                <input
                  type="number"
                  name="previousPregnancies.stillBirths"
                  value={formData.previousPregnancies.stillBirths}
                  onChange={handleChange}
                  className={inputClass}
                  min="0"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miscarriages
                </label>
                <input
                  type="number"
                  name="previousPregnancies.miscarriages"
                  value={formData.previousPregnancies.miscarriages}
                  onChange={handleChange}
                  className={inputClass}
                  min="0"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abortions
                </label>
                <input
                  type="number"
                  name="previousPregnancies.abortions"
                  value={formData.previousPregnancies.abortions}
                  onChange={handleChange}
                  className={inputClass}
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Register</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PregnantWomanRegistrationForm;
