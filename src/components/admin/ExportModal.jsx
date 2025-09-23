import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText, 
  Database, 
  Calendar,
  Filter,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import exportService from '../../services/exportService';

const ExportModal = ({ isOpen, onClose, dataType = 'workers', title = 'Export Data' }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel Compatible)', icon: FileText, description: 'Comma-separated values for spreadsheet applications' },
    { value: 'json', label: 'JSON (Raw Data)', icon: Database, description: 'JavaScript Object Notation for technical use' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getFilterOptions = () => {
    switch (dataType) {
      case 'workers':
        return [
          { key: 'role', label: 'Role', options: ['anganwadi-worker', 'asha-volunteer', 'sanitation-worker'] },
          { key: 'status', label: 'Status', options: ['active', 'inactive'] },
          { key: 'district', label: 'District', type: 'text' }
        ];
      case 'children':
        return [
          { key: 'gender', label: 'Gender', options: ['male', 'female'] },
          { key: 'ageGroup', label: 'Age Group', options: ['0-2', '3-5', '6+'] },
          { key: 'nutritionStatus', label: 'Nutrition Status', options: ['normal', 'underweight', 'overweight'] },
          { key: 'anganwadiCenter', label: 'Anganwadi Center', type: 'text' }
        ];
      case 'pregnant-women':
        return [
          { key: 'trimester', label: 'Trimester', options: ['first', 'second', 'third'] },
          { key: 'riskLevel', label: 'Risk Level', options: ['low', 'medium', 'high'] },
          { key: 'anganwadiCenter', label: 'Anganwadi Center', type: 'text' }
        ];
      case 'adolescents':
        return [
          { key: 'ageGroup', label: 'Age Group', options: ['10-14', '15-19'] },
          { key: 'schoolStatus', label: 'School Status', options: ['enrolled', 'dropout'] },
          { key: 'anganwadiCenter', label: 'Anganwadi Center', type: 'text' }
        ];
      default:
        return [];
    }
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const buildExportFilters = () => {
    const filters = { ...selectedFilters };

    // Add date range filters
    if (dateRange !== 'all') {
      const now = new Date();
      let startDate, endDate;

      switch (dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = now;
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          endDate = now;
          break;
        case 'quarter':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          endDate = now;
          break;
        case 'year':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          endDate = now;
          break;
        case 'custom':
          if (customStartDate) startDate = new Date(customStartDate);
          if (customEndDate) endDate = new Date(customEndDate);
          break;
      }

      if (startDate) filters.startDate = startDate.toISOString();
      if (endDate) filters.endDate = endDate.toISOString();
    }

    return filters;
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportStatus(null);



      const filters = buildExportFilters();
      let result;

      switch (dataType) {
        case 'workers':
          result = await exportService.exportWorkers(filters, exportFormat);
          break;
        case 'children':
          result = await exportService.exportChildren(filters, exportFormat);
          break;
        case 'pregnant-women':
          result = await exportService.exportPregnantWomen(filters, exportFormat);
          break;
        case 'adolescents':
          result = await exportService.exportAdolescents(filters, exportFormat);
          break;
        default:
          throw new Error('Invalid data type');
      }

      setExportStatus({
        type: 'success',
        message: result.message,
        filename: result.filename
      });

      // Auto-close modal after successful export
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Export error:', error);

      let errorMessage = error.message || 'Export failed';

      // Handle specific error types
      if (error.message.includes('Invalid token') || error.message.includes('Authentication failed')) {
        errorMessage = 'Authentication failed. Please log out and log in again.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'You do not have permission to export this data.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      setExportStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsExporting(false);
    }
  };

  const resetForm = () => {
    setExportFormat('csv');
    setDateRange('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setSelectedFilters({});
    setExportStatus(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">Configure export settings and download data</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formatOptions.map((format) => (
                  <div
                    key={format.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      exportFormat === format.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setExportFormat(format.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <format.icon className={`w-5 h-5 ${
                        exportFormat === format.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900">{format.label}</div>
                        <div className="text-xs text-gray-500">{format.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Custom Date Range */}
              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Filters */}
            {getFilterOptions().length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Additional Filters
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilterOptions().map((filter) => (
                    <div key={filter.key}>
                      <label className="block text-xs text-gray-500 mb-1">{filter.label}</label>
                      {filter.type === 'text' ? (
                        <input
                          type="text"
                          placeholder={`Enter ${filter.label.toLowerCase()}`}
                          value={selectedFilters[filter.key] || ''}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <select
                          value={selectedFilters[filter.key] || ''}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All {filter.label}</option>
                          {filter.options.map((option) => (
                            <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* Export Status */}
            {exportStatus && (
              <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                exportStatus.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {exportStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <div>
                  <div className="font-medium">{exportStatus.message}</div>
                  {exportStatus.filename && (
                    <div className="text-sm opacity-75">File: {exportStatus.filename}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportModal;
