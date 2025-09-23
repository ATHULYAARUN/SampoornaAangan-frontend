import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown, FileText, Database, Users, Baby, Heart, GraduationCap } from 'lucide-react';
import ExportModal from './ExportModal';

const ExportButton = ({ className = '' }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState('workers');
  const [selectedTitle, setSelectedTitle] = useState('Export Workers Data');

  const exportOptions = [
    {
      id: 'workers',
      label: 'Workers Data',
      icon: Users,
      description: 'Export all worker accounts and details',
      color: 'text-blue-600'
    },
    {
      id: 'children',
      label: 'Children Data',
      icon: Baby,
      description: 'Export children registration and health records',
      color: 'text-green-600'
    },
    {
      id: 'pregnant-women',
      label: 'Pregnant Women',
      icon: Heart,
      description: 'Export pregnant women registration data',
      color: 'text-pink-600'
    },
    {
      id: 'adolescents',
      label: 'Adolescents',
      icon: GraduationCap,
      description: 'Export adolescent girls registration data',
      color: 'text-purple-600'
    }
  ];

  const handleExportOption = (option) => {
    setSelectedDataType(option.id);
    setSelectedTitle(`Export ${option.label}`);
    setShowDropdown(false);
    setShowExportModal(true);
  };

  const handleQuickExport = () => {
    setSelectedDataType('workers');
    setSelectedTitle('Export Workers Data');
    setShowExportModal(true);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Export Button */}
        <div className="flex">
          <button
            onClick={handleQuickExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          {/* Dropdown Toggle */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-2 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors border-l border-blue-500"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Export Data</h3>
              <p className="text-xs text-gray-500">Choose what data to export</p>
            </div>
            
            <div className="py-2">
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleExportOption(option)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start space-x-3"
                >
                  <option.icon className={`w-5 h-5 mt-0.5 ${option.color}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <FileText className="w-3 h-3" />
                <span>CSV</span>
                <span>•</span>
                <Database className="w-3 h-3" />
                <span>JSON formats available</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Click outside to close dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        dataType={selectedDataType}
        title={selectedTitle}
      />
    </>
  );
};

export default ExportButton;
