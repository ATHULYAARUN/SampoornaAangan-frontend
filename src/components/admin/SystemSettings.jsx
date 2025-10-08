import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Building2, 
  Users, 
  Bell, 
  Heart, 
  Trash2, 
  Shield, 
  BarChart3, 
  Wrench,
  Save,
  X,
  Check,
  AlertTriangle,
  Upload,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Edit,
  MapPin,
  Mail,
  MessageSquare,
  Calendar,
  Database,
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import systemSettingsService from '../../services/systemSettingsService';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    general: {
      systemName: 'SampoornaAangan',
      panchayatName: 'Elikkulam',
      district: 'Kottayam',
      state: 'Kerala',
      logo: null,
      primaryColor: '#e91e63',
      secondaryColor: '#2196f3'
    },
    roles: {
      admin: { name: 'Admin', permissions: ['all'] },
      aww: { name: 'Anganwadi Worker', permissions: ['registration', 'attendance', 'nutrition', 'health'] },
      asha: { name: 'ASHA Worker', permissions: ['health', 'reports'] },
      parent: { name: 'Parent', permissions: ['view_child', 'attendance'] },
      adolescent: { name: 'Adolescent', permissions: ['health', 'nutrition'] }
    },
    anganwadiCenters: [
      {
        id: 1,
        name: 'Akkarakkunnu Anganwadi',
        ward: { number: 9, name: 'Ward 9' },
        panchayat: 'Elikkulam',
        assignedWorker: 'Mohanakumari',
        status: 'active'
      },
      {
        id: 2,
        name: 'Veliyanoor Anganwadi',
        ward: { number: 9, name: 'Ward 9' },
        panchayat: 'Elikkulam',
        assignedWorker: 'Susheela',
        status: 'active'
      }
    ],
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      parentAlerts: {
        attendance: true,
        health: true,
        nutrition: false,
        vaccination: true
      },
      workerAlerts: {
        lowAttendance: true,
        healthScreening: true,
        stockAlert: true,
        reports: false
      }
    },
    health: {
      growthMonitoringInterval: 30, // days
      vaccinationReminders: true,
      nutritionMenuRotation: 'weekly',
      healthScreeningFrequency: 'monthly'
    },
    waste: {
      collectionSchedule: {
        frequency: 'daily',
        time: '10:00'
      },
      sanitationWorkers: [],
      alertThreshold: 24 // hours
    },
    security: {
      sessionTimeout: 24, // hours
      passwordExpiry: 90, // days
      backupFrequency: 'weekly',
      dataRetention: 365 // days
    },
    reports: {
      autoGenerate: true,
      defaultFormat: 'pdf',
      scheduledReports: [],
      dashboardMetrics: ['attendance', 'nutrition', 'health', 'growth']
    },
    maintenance: {
      modules: {
        registration: true,
        attendance: true,
        nutrition: true,
        health: true,
        waste: true,
        reports: true
      },
      version: '1.0.0',
      lastUpdate: new Date().toISOString()
    }
  });

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'users', label: 'User & Role Management', icon: Users },
    { id: 'centers', label: 'Anganwadi Centers', icon: Building2 },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'health', label: 'Health & Nutrition', icon: Heart },
    { id: 'waste', label: 'Waste Management', icon: Trash2 },
    { id: 'security', label: 'Data & Security', icon: Shield },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'maintenance', label: 'System Maintenance', icon: Wrench }
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      
      // Load general settings
      const data = await systemSettingsService.getSettings();
      if (data.success) {
        setSettings(prev => ({ ...prev, ...data.data }));
      }
      
      // Load Anganwadi centers
      const centersData = await systemSettingsService.getAnganwadiCenters();
      if (centersData.success && centersData.data) {
        // Map the database data to our display format
        const formattedCenters = centersData.data.map(center => ({
          id: center._id,
          name: center.name,
          ward: center.ward,
          panchayat: 'Elikkulam',
          assignedWorker: center.assignedWorker?.name || 'Not Assigned',
          status: center.status,
          code: center.code,
          contact: center.contact,
          address: center.address
        }));
        
        setSettings(prev => ({ 
          ...prev, 
          anganwadiCenters: formattedCenters
        }));
      } else {
        // Fallback data if API fails
        setSettings(prev => ({ 
          ...prev, 
          anganwadiCenters: [
            {
              id: 1,
              name: 'Akkarakkunnu Anganwadi',
              ward: { number: 9, name: 'Ward 9' },
              panchayat: 'Elikkulam',
              assignedWorker: 'Mohanakumari',
              status: 'active'
            },
            {
              id: 2,
              name: 'Veliyanoor Anganwadi',
              ward: { number: 9, name: 'Ward 9' },
              panchayat: 'Elikkulam',
              assignedWorker: 'Susheela',
              status: 'active'
            }
          ]
        }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const result = await systemSettingsService.saveSettings(settings);
      if (result.success) {
        setUnsavedChanges(false);
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const updateNestedSetting = (section, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [key]: value
        }
      }
    }));
    setUnsavedChanges(true);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
            <input
              type="text"
              value={settings.general.systemName}
              onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Panchayat Name</label>
            <input
              type="text"
              value={settings.general.panchayatName}
              onChange={(e) => updateSetting('general', 'panchayatName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
            <input
              type="text"
              value={settings.general.district}
              onChange={(e) => updateSetting('general', 'district', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={settings.general.state}
              onChange={(e) => updateSetting('general', 'state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={settings.general.primaryColor}
                onChange={(e) => updateSetting('general', 'primaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.general.primaryColor}
                onChange={(e) => updateSetting('general', 'primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={settings.general.secondaryColor}
                onChange={(e) => updateSetting('general', 'secondaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.general.secondaryColor}
                onChange={(e) => updateSetting('general', 'secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Logo Upload</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Logo
          </button>
          <span className="text-sm text-gray-500">Recommended: 200x60px, PNG/JPG</span>
        </div>
      </div>
    </div>
  );

  const renderUserRoleSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Role Management</h3>
        <div className="space-y-4">
          {Object.entries(settings.roles).map(([roleId, role]) => (
            <div key={roleId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{role.name}</h4>
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  'registration', 'attendance', 'nutrition', 'health', 
                  'reports', 'user_management', 'settings', 'all'
                ].map(permission => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={(e) => {
                        const updatedPermissions = e.target.checked
                          ? [...role.permissions, permission]
                          : role.permissions.filter(p => p !== permission);
                        
                        setSettings(prev => ({
                          ...prev,
                          roles: {
                            ...prev.roles,
                            [roleId]: {
                              ...prev.roles[roleId],
                              permissions: updatedPermissions
                            }
                          }
                        }));
                        setUnsavedChanges(true);
                      }}
                      className="mr-2 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm capitalize">{permission.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Role
        </button>
      </div>
    </div>
  );

  const renderAnganwadiCenters = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Anganwadi Centers</h3>
          <p className="text-sm text-gray-600 mt-1">Elikkulam Panchayat - Ward 9</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Center Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ward</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Panchayat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">AWW Assigned</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.anganwadiCenters.map((center) => (
                <tr key={center.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{center.name}</td>
                  <td className="py-3 px-4">{center.ward.name}</td>
                  <td className="py-3 px-4">{center.panchayat}</td>
                  <td className="py-3 px-4">{center.assignedWorker}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      center.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {center.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit Center">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="View Location">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {settings.anganwadiCenters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No Anganwadi centers configured</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Communication Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Send notifications via email</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('notifications', 'emailEnabled', !settings.notifications.emailEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                settings.notifications.emailEnabled ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.emailEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Send notifications via SMS</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('notifications', 'smsEnabled', !settings.notifications.smsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                settings.notifications.smsEnabled ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.smsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Parent Alert Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.notifications.parentAlerts).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
              <button
                onClick={() => updateNestedSetting('notifications', 'parentAlerts', key, !value)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  value ? 'bg-pink-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHealthNutritionSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Health Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Growth Monitoring Interval (days)</label>
            <input
              type="number"
              value={settings.health.growthMonitoringInterval}
              onChange={(e) => updateSetting('health', 'growthMonitoringInterval', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Screening Frequency</label>
            <select
              value={settings.health.healthScreeningFrequency}
              onChange={(e) => updateSetting('health', 'healthScreeningFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Vaccination Reminders</p>
              <p className="text-sm text-gray-500">Automatically remind about due vaccinations</p>
            </div>
            <button
              onClick={() => updateSetting('health', 'vaccinationReminders', !settings.health.vaccinationReminders)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.health.vaccinationReminders ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.health.vaccinationReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Nutrition Settings</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Menu Rotation</label>
          <select
            value={settings.health.nutritionMenuRotation}
            onChange={(e) => updateSetting('health', 'nutritionMenuRotation', e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderWasteManagementSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Collection Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <select
              value={settings.waste.collectionSchedule.frequency}
              onChange={(e) => updateNestedSetting('waste', 'collectionSchedule', 'frequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Collection Time</label>
            <input
              type="time"
              value={settings.waste.collectionSchedule.time}
              onChange={(e) => updateNestedSetting('waste', 'collectionSchedule', 'time', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold (hours)</label>
          <input
            type="number"
            value={settings.waste.alertThreshold}
            onChange={(e) => updateSetting('waste', 'alertThreshold', parseInt(e.target.value))}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <p className="text-sm text-gray-500 mt-1">Alert when waste hasn't been collected for this many hours</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sanitation Workers</h3>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Worker
          </button>
        </div>
        <div className="space-y-3">
          {settings.waste.sanitationWorkers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No sanitation workers assigned</p>
          ) : (
            settings.waste.sanitationWorkers.map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">{worker.name}</p>
                  <p className="text-sm text-gray-500">{worker.contact} • {worker.area}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    worker.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {worker.active ? 'Active' : 'Inactive'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Session & Authentication</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Data Backup & Retention</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={settings.security.backupFrequency}
              onChange={(e) => updateSetting('security', 'backupFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
            <input
              type="number"
              value={settings.security.dataRetention}
              onChange={(e) => updateSetting('security', 'dataRetention', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Create Backup
          </button>
          <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            <Upload className="w-4 h-4 mr-2" />
            Restore Backup
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Report Generation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Generate Reports</p>
              <p className="text-sm text-gray-500">Automatically generate scheduled reports</p>
            </div>
            <button
              onClick={() => updateSetting('reports', 'autoGenerate', !settings.reports.autoGenerate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.reports.autoGenerate ? 'bg-pink-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.reports.autoGenerate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Export Format</label>
            <select
              value={settings.reports.defaultFormat}
              onChange={(e) => updateSetting('reports', 'defaultFormat', e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Dashboard Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'attendance', 'nutrition', 'health', 'growth', 'waste', 'users'
          ].map(metric => (
            <label key={metric} className="flex items-center p-3 border border-gray-200 rounded-lg">
              <input
                type="checkbox"
                checked={settings.reports.dashboardMetrics.includes(metric)}
                onChange={(e) => {
                  const updatedMetrics = e.target.checked
                    ? [...settings.reports.dashboardMetrics, metric]
                    : settings.reports.dashboardMetrics.filter(m => m !== metric);
                  updateSetting('reports', 'dashboardMetrics', updatedMetrics);
                }}
                className="mr-2 text-pink-600 focus:ring-pink-500"
              />
              <span className="capitalize font-medium">{metric}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Module Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.maintenance.modules).map(([moduleId, enabled]) => (
            <div key={moduleId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium capitalize">{moduleId.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-sm text-gray-500">
                  {enabled ? 'Module is active' : 'Module is disabled'}
                </p>
              </div>
              <button
                onClick={() => {
                  const updatedModules = { ...settings.maintenance.modules };
                  updatedModules[moduleId] = !enabled;
                  updateSetting('maintenance', 'modules', updatedModules);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Version: <span className="font-medium">{settings.maintenance.version}</span></p>
            <p className="text-sm text-gray-600">Last Updated: <span className="font-medium">
              {new Date(settings.maintenance.lastUpdate).toLocaleDateString()}
            </span></p>
          </div>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Cache
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Database className="w-4 h-4 mr-2" />
              System Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUserRoleSettings();
      case 'centers':
        return renderAnganwadiCenters();
      case 'notifications':
        return renderNotificationSettings();
      case 'health':
        return renderHealthNutritionSettings();
      case 'waste':
        return renderWasteManagementSettings();
      case 'security':
        return renderSecuritySettings();
      case 'reports':
        return renderReportsSettings();
      case 'maintenance':
        return renderMaintenanceSettings();
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading system settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure global system options and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {unsavedChanges && (
            <span className="flex items-center text-amber-600 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Unsaved changes
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !unsavedChanges}
            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
              saving || !unsavedChanges
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            }`}
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-pink-100 text-pink-700 border border-pink-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;