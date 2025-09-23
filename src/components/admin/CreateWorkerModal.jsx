import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Briefcase, Building, Save, AlertCircle, Key, Eye, EyeOff } from 'lucide-react';

const CreateWorkerModal = ({ worker, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: worker?.name || '',
    email: worker?.email || '',
    phone: worker?.phone || '',
    role: worker?.role || 'anganwadi-worker',
    useCustomPassword: false,
    customPassword: '',
    confirmPassword: '',
    address: {
      street: worker?.address?.street || '',
      city: worker?.address?.city || '',
      state: worker?.address?.state || 'Kerala',
      pincode: worker?.address?.pincode || '',
      district: worker?.address?.district || 'Kottayam',
      block: worker?.address?.block || ''
    },
    roleSpecificData: {
      anganwadiCenter: {
        name: worker?.roleSpecificData?.anganwadiCenter?.name || '',
        code: worker?.roleSpecificData?.anganwadiCenter?.code || '',
        district: worker?.roleSpecificData?.anganwadiCenter?.district || 'Kottayam',
        block: worker?.roleSpecificData?.anganwadiCenter?.block || ''
      },
      ashaArea: {
        villages: worker?.roleSpecificData?.ashaArea?.villages || [''],
        population: worker?.roleSpecificData?.ashaArea?.population || '',
        households: worker?.roleSpecificData?.ashaArea?.households || ''
      },
      sanitationZone: {
        area: worker?.roleSpecificData?.sanitationZone?.area || '',
        facilities: worker?.roleSpecificData?.sanitationZone?.facilities || [''],
        supervisor: worker?.roleSpecificData?.sanitationZone?.supervisor || ''
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const workerRoles = [
    { 
      id: 'anganwadi-worker', 
      name: 'Anganwadi Worker', 
      icon: '👶',
      description: 'Manages child care, nutrition, and early education programs'
    },
    { 
      id: 'asha-volunteer', 
      name: 'ASHA Volunteer', 
      icon: '🏥',
      description: 'Provides health services and maternal care in communities'
    },
    { 
      id: 'sanitation-worker', 
      name: 'Sanitation Worker', 
      icon: '🧹',
      description: 'Maintains hygiene and sanitation facilities'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('roleSpecificData.')) {
      const path = name.split('.');
      if (path.length === 3) {
        // Handle roleSpecificData.section.field
        const [, section, field] = path;
        setFormData(prev => ({
          ...prev,
          roleSpecificData: {
            ...prev.roleSpecificData,
            [section]: {
              ...prev.roleSpecificData?.[section],
              [field]: value
            }
          }
        }));
      } else if (path.length === 4) {
        // Handle roleSpecificData.section.subsection.field
        const [, section, subsection, field] = path;
        setFormData(prev => ({
          ...prev,
          roleSpecificData: {
            ...prev.roleSpecificData,
            [section]: {
              ...prev.roleSpecificData?.[section],
              [subsection]: {
                ...prev.roleSpecificData?.[section]?.[subsection],
                [field]: value
              }
            }
          }
        }));
      }
    } else if (name.includes('.')) {
      // Handle address.field
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle basic fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (error) setError('');
  };

  const handleArrayChange = (section, field, index, value) => {
    setFormData(prev => {
      const currentArray = prev.roleSpecificData?.[section]?.[field] || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      
      return {
        ...prev,
        roleSpecificData: {
          ...prev.roleSpecificData,
          [section]: {
            ...prev.roleSpecificData?.[section],
            [field]: newArray
          }
        }
      };
    });
  };

  const addArrayItem = (section, field) => {
    setFormData(prev => {
      const currentArray = prev.roleSpecificData?.[section]?.[field] || [];
      
      return {
        ...prev,
        roleSpecificData: {
          ...prev.roleSpecificData,
          [section]: {
            ...prev.roleSpecificData?.[section],
            [field]: [...currentArray, '']
          }
        }
      };
    });
  };

  const removeArrayItem = (section, field, index) => {
    setFormData(prev => {
      const currentArray = prev.roleSpecificData?.[section]?.[field] || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      
      return {
        ...prev,
        roleSpecificData: {
          ...prev.roleSpecificData,
          [section]: {
            ...prev.roleSpecificData?.[section],
            [field]: newArray
          }
        }
      };
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.role) {
      setError('Role is required');
      return false;
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    // Password validation
    if (formData.useCustomPassword) {
      if (!formData.customPassword) {
        setError('Custom password is required when custom password option is selected');
        return false;
      }
      if (formData.customPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      if (formData.customPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    // Role-specific validation
    if (formData.role === 'anganwadi-worker') {
      // Anganwadi Center Name and Code are pre-filled, so no validation needed
      // They are automatically set to default values for this system
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Ensure all required fields are included
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        address: {
          street: formData.address.street || '',
          city: formData.address.city || '',
          state: formData.address.state || '',
          pincode: formData.address.pincode || '',
          district: formData.address.district || '',
          block: formData.address.block || ''
        },
        roleSpecificData: formData.roleSpecificData || {},
        useCustomPassword: formData.useCustomPassword,
        customPassword: formData.useCustomPassword ? formData.customPassword : undefined
      };

      console.log('Submitting worker data:', submitData);

      const url = worker 
        ? `/api/admin/workers/${worker._id}` 
        : '/api/admin/workers';
      
      const method = worker ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('token')}`
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        onSuccess(data);
      } else {
        setError(data.message || `Failed to ${worker ? 'update' : 'create'} worker`);
      }
    } catch (error) {
      console.error('Worker operation error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const anganwadiCenters = [
    {
      name: 'Akkarakunnu Anganwadi Center',
      code: 'AK-KC969',
      location: 'Elangulam, Kottayam, Kerala',
      city: 'Elangulam',
      pincode: '686522'
    },
    {
      name: 'Veliyanoor Anganwadi Center',
      code: 'AK-VL969',
      location: 'Veliyanoor, Kottayam, Kerala',
      city: 'Veliyanoor',
      pincode: '686522'
    }
  ];

  const renderRoleSpecificFields = () => {
    try {
      switch (formData.role) {
      case 'anganwadi-worker':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Anganwadi Center Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Center
                </label>
                <select
                  name="roleSpecificData.anganwadiCenter.name"
                  value={formData.roleSpecificData?.anganwadiCenter?.name || ''}
                  onChange={(e) => {
                    const selectedCenter = anganwadiCenters.find(center => center.name === e.target.value);
                    if (selectedCenter) {
                      // Update both center details and address fields
                      setFormData(prev => ({
                        ...prev,
                        roleSpecificData: {
                          ...prev.roleSpecificData,
                          anganwadiCenter: selectedCenter
                        },
                        address: {
                          ...prev.address,
                          city: selectedCenter.city,
                          pincode: selectedCenter.pincode
                        }
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a center</option>
                  {anganwadiCenters.map((center) => (
                    <option key={center.code} value={center.name}>
                      {center.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Center Code
                </label>
                <input
                  type="text"
                  name="roleSpecificData.anganwadiCenter.code"
                  value={formData.roleSpecificData?.anganwadiCenter?.code || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Auto-generated"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated based on selection</p>
              </div>
            </div>
            {formData.roleSpecificData?.anganwadiCenter?.location && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.roleSpecificData.anganwadiCenter.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            )}
          </div>
        );

      case 'asha-volunteer':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              ASHA Coverage Area
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Population Covered
                </label>
                <input
                  type="number"
                  name="roleSpecificData.ashaArea.population"
                  value={formData.roleSpecificData?.ashaArea?.population || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter population count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Households
                </label>
                <input
                  type="number"
                  name="roleSpecificData.ashaArea.households"
                  value={formData.roleSpecificData?.ashaArea?.households || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter household count"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Villages Covered
              </label>
              {(formData.roleSpecificData?.ashaArea?.villages || ['']).map((village, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={village || ''}
                    onChange={(e) => handleArrayChange('ashaArea', 'villages', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter village name"
                  />
                  {(formData.roleSpecificData?.ashaArea?.villages || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('ashaArea', 'villages', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('ashaArea', 'villages')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                + Add Village
              </button>
            </div>
          </div>
        );

      case 'sanitation-worker':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Sanitation Zone Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Area
                </label>
                <input
                  type="text"
                  name="roleSpecificData.sanitationZone.area"
                  value={formData.roleSpecificData?.sanitationZone?.area || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter coverage area"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor
                </label>
                <input
                  type="text"
                  name="roleSpecificData.sanitationZone.supervisor"
                  value={formData.roleSpecificData?.sanitationZone?.supervisor || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter supervisor name"
                />
              </div>
            </div>
          </div>
        );

        default:
          return null;
      }
    } catch (error) {
      console.error('Error rendering role-specific fields:', error);
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            Error loading role-specific fields. Please try selecting the role again.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {worker ? 'Edit Worker Account' : 'Create New Worker Account'}
              </h2>
              <p className="text-primary-100 text-sm mt-1">
                {worker ? 'Update worker information' : 'Add a new worker to the system'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    {workerRoles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.icon} {role.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {workerRoles.find(r => r.id === formData.role)?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Password Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Password Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="useCustomPassword"
                    name="useCustomPassword"
                    checked={formData.useCustomPassword}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        useCustomPassword: e.target.checked,
                        customPassword: '',
                        confirmPassword: ''
                      }));
                      if (error) setError('');
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="useCustomPassword" className="text-sm font-medium text-gray-700">
                    Set custom password (otherwise auto-generated password will be used)
                  </label>
                </div>
                
                {!formData.useCustomPassword && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-blue-600" />
                      <p className="text-blue-800 text-sm font-medium">Auto-Generated Password</p>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      A secure password will be automatically generated and sent to the worker via email.
                      The worker can change this password after their first login.
                    </p>
                  </div>
                )}
                
                {formData.useCustomPassword && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="customPassword"
                          value={formData.customPassword}
                          onChange={handleChange}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter custom password"
                          required={formData.useCustomPassword}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Confirm password"
                          required={formData.useCustomPassword}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter street address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter city"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-filled based on Anganwadi center selection</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter state"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Default state for this Anganwadi</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter district"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Default district for this Anganwadi</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter pincode"
                    maxLength="6"
                    pattern="[0-9]{6}"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-filled based on Anganwadi center selection</p>
                </div>
              </div>
            </div>

            {/* Role-Specific Information */}
            {renderRoleSpecificFields()}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {worker ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {worker ? 'Update Worker' : 'Create Worker'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateWorkerModal;
