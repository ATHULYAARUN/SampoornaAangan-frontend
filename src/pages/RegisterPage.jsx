import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, User, Mail, Lock, Eye, EyeOff, MapPin, Phone, Users, Heart, GraduationCap, UserCheck, Trash2, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import authService from '../services/authService';
import GoogleSignIn from '../components/auth/GoogleSignIn';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    anganwadiName: '',
    location: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    // Role-specific fields
    workerId: '',
    qualification: '',
    experience: '',
    childAge: '',
    parentName: '',
    relationToChild: '',
    age: '',
    schoolName: '',
    grade: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Only allow self-registration for parents and adolescent girls
  // Other roles (workers) are managed by admin
  const roles = [
    {
      id: 'parent',
      title: 'Parent/Guardian',
      description: 'Monitor your child\'s development and status',
      icon: Users,
      color: 'primary',
      responsibilities: 'View child health records, track benefits'
    },
    {
      id: 'adolescent-girl',
      title: 'Adolescent Girl (10-19 years)',
      description: 'Access personal health data and education',
      icon: GraduationCap,
      color: 'secondary',
      responsibilities: 'View health records, menstrual hygiene tracking'
    }
  ];

  const anganwadiCenters = [
    {
      name: 'Akkarakunnu Anganwadi Center',
      code: 'AK34',
      location: 'Elangulam, Kottayam, Kerala',
      pincode: '686522'
    },
    {
      name: 'Veliyanoor Anganwadi Center',
      code: 'AK35',
      location: 'Veliyanoor, Kottayam, Kerala',
      pincode: '686522'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setFormData({
      ...formData,
      role: roleId
    });
  };

  const handleGoogleSuccess = (result) => {
    if (result.isNewUser) {
      alert(`Welcome ${result.data.user.name}! Your account has been created successfully with Google.`);
    } else {
      alert(`Welcome back ${result.data.user.name}! You've been signed in.`);
    }
    navigate(result.dashboard);
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  // Validation functions
  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Full name is required';
        } else if (value.trim().length < 3) {
          errors.name = 'Name must be at least 3 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          errors.name = 'Name can only contain letters and spaces';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errors.email = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.trim())) {
          errors.phone = 'Phone number must be exactly 10 digits';
        } else if (value.trim() === '0000000000') {
          errors.phone = 'Phone number cannot be all zeros';
        }
        break;

      case 'pincode':
        if (!value.trim()) {
          errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(value.trim())) {
          errors.pincode = 'Pincode must be exactly 6 digits';
        }
        break;

      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'pincode', 'password', 'confirmPassword'];
    let allErrors = {};

    requiredFields.forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      allErrors = { ...allErrors, ...fieldErrors };
    });

    // Check terms acceptance
    if (!termsAccepted) {
      allErrors.terms = 'You must accept the Terms & Conditions';
    }

    setValidationErrors(allErrors);
    const isValid = Object.keys(allErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  // Real-time validation effect
  useEffect(() => {
    validateForm();
  }, [formData, termsAccepted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form before submission
      if (!validateForm()) {
        setError('Please fix all validation errors before submitting');
        setIsLoading(false);
        return;
      }

      // Validate password strength
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long!');
        return;
      }

      // Validate pincode
      if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
        setError('Pincode must be exactly 6 digits!');
        return;
      }

      // Validate phone number
      if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
        setError('Phone number must be exactly 10 digits!');
        return;
      }

      // Prepare user data for registration
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: {
          street: formData.location || '',
          city: '',
          state: '',
          pincode: formData.pincode || '',
          district: '',
          block: '',
        },
        roleSpecificData: getRoleSpecificData()
      };

      // Register user with Firebase and backend
      const result = await authService.registerUser(userData);
      
      if (result.success) {
        alert(`Registration successful! Welcome ${formData.name}. Now you can login.`);
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to extract role-specific data
  const getRoleSpecificData = () => {
    switch (formData.role) {
      case 'parent':
        return {
          parentDetails: {
            children: formData.childAge ? [{
              name: formData.parentName || 'Child',
              age: parseInt(formData.childAge) || 0,
              gender: 'Not specified',
            }] : [],
            occupation: '',
            familySize: 1,
          }
        };
      case 'adolescent-girl':
        return {
          adolescentDetails: {
            age: parseInt(formData.age) || 15,
            schoolName: formData.schoolName || '',
            class: formData.grade || '',
            guardianName: formData.parentName || '',
            guardianPhone: formData.phone || '',
          }
        };
      default:
        return {};
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format specific fields
    let formattedValue = value;

    if (name === 'pincode') {
      // Only allow numbers and limit to 6 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'phone') {
      // Only allow numbers and limit to 10 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }

    // Update form data
    const newFormData = {
      ...formData,
      [name]: formattedValue
    };
    setFormData(newFormData);

    // Real-time validation for the changed field
    const fieldErrors = validateField(name, formattedValue);
    setValidationErrors(prev => ({
      ...prev,
      ...fieldErrors,
      // Remove error if field is now valid
      ...(Object.keys(fieldErrors).length === 0 && { [name]: undefined })
    }));
  };

  const renderRoleSpecificFields = () => {
    const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black";
    
    switch (selectedRole) {
      case 'parent':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-black border-b border-gray-200 pb-2">Family Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Child's Age
                </label>
                <div className="relative">
                  <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <select
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select child's age</option>
                    <option value="0-6months">0-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="1-2years">1-2 years</option>
                    <option value="2-3years">2-3 years</option>
                    <option value="3-4years">3-4 years</option>
                    <option value="4-5years">4-5 years</option>
                    <option value="5-6years">5-6 years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Relation to Child
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <select
                    name="relationToChild"
                    value={formData.relationToChild}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select relation</option>
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="grandmother">Grandmother</option>
                    <option value="grandfather">Grandfather</option>
                    <option value="guardian">Legal Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Number of Children
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select number</option>
                  <option value="1">1 child</option>
                  <option value="2">2 children</option>
                  <option value="3">3 children</option>
                  <option value="4+">4+ children</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'adolescent-girl':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-black border-b border-gray-200 pb-2">Personal & Educational Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Age
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select your age</option>
                    <option value="11">11 years</option>
                    <option value="12">12 years</option>
                    <option value="13">13 years</option>
                    <option value="14">14 years</option>
                    <option value="15">15 years</option>
                    <option value="16">16 years</option>
                    <option value="17">17 years</option>
                    <option value="18">18 years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Grade/Class
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select grade</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="dropout">Not in school</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                School Name
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your school name (or 'Not applicable' if not in school)"
                  required
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!selectedRole ? (
          // Role Selection Screen
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Header */}
            <div className="mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Baby className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-black mb-4">
                Join SampoornaAngan
              </h1>
              <p className="text-xl text-black max-w-2xl mx-auto mb-4">
                Choose your role to create a personalized account and access features designed for you
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Anganwadi Workers, ASHA Volunteers, and Sanitation Workers are registered and managed by the Admin. 
                  If you are a worker, please contact your supervisor for account creation.
                </p>
              </div>
            </div>



            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleRoleSelect(role.id)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border-2 border-gray-200 hover:border-primary-500 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${role.color}-500 to-${role.color}-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2">{role.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                    <p className="text-xs text-gray-500 italic">{role.responsibilities}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in here
              </Link>
            </p>
          </motion.div>
        ) : (
          // Registration Form
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Back Button and Header */}
            <div className="mb-8">
              <button
                onClick={() => setSelectedRole('')}
                className="flex items-center text-primary-600 hover:text-primary-500 mb-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to role selection
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(roles.find(r => r.id === selectedRole)?.icon || Baby, { className: "w-8 h-8 text-white" })}
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Register as {roles.find(r => r.id === selectedRole)?.title}
                </h2>
                <p className="text-gray-600">
                  {roles.find(r => r.id === selectedRole)?.description}
                </p>
              </div>
            </div>
            {/* Registration Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}



                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                          validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                      {validationErrors.name && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                          validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        required
                      />
                      {validationErrors.email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                          validationErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                        required
                      />
                      {validationErrors.phone && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
                        placeholder="City, State"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Pincode *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                        validationErrors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter 6-digit pincode"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                    />
                    {validationErrors.pincode && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {validationErrors.pincode ? (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors.pincode}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">Please enter a valid 6-digit pincode</p>
                  )}
                </div>

                {selectedRole !== 'adolescent-girl' && (
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Anganwadi Name
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="anganwadiName"
                        value={formData.anganwadiName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
                        placeholder="Enter anganwadi name"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Role-specific fields */}
                {renderRoleSpecificFields()}

                {/* Password Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                          validationErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {validationErrors.password && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black ${
                          validationErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {validationErrors.confirmPassword && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className={`h-4 w-4 text-primary-600 focus:ring-primary-500 rounded mt-1 ${
                        validationErrors.terms ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    <label htmlFor="terms" className="ml-3 block text-sm text-black">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                        Privacy Policy
                      </Link>
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>
                  {validationErrors.terms && (
                    <p className="text-sm text-red-600 flex items-center ml-7">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {validationErrors.terms}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  whileHover={{ scale: (isLoading || !isFormValid) ? 1 : 1.02 }}
                  whileTap={{ scale: (isLoading || !isFormValid) ? 1 : 0.98 }}
                  className={`w-full font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:cursor-not-allowed ${
                    isFormValid && !isLoading
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : !isFormValid ? (
                    <div className="flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Please fix errors to continue
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Create Account as {roles.find(r => r.id === selectedRole)?.title}
                    </div>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Google Sign-in */}
              <div className="mt-6">
                <GoogleSignIn
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  selectedRole={selectedRole}
                  disabled={isLoading}
                />
                {!selectedRole && (
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Please select a role above to enable Google Sign-in
                  </p>
                )}
              </div>

              <p className="mt-6 text-center text-sm text-black">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
