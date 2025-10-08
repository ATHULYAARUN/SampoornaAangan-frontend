import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  CheckCircle
} from 'lucide-react';

const HealthReportsModal = ({ onClose, language }) => {
  const [reportType, setReportType] = useState('comprehensive');
  const [dateRange, setDateRange] = useState('last-month');
  const [format, setFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedWards, setSelectedWards] = useState(['all']);
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  const getTranslation = (key) => {
    const translations = {
      en: {
        generateReport: 'Generate Health Report',
        reportType: 'Report Type',
        comprehensive: 'Comprehensive Health Report',
        malnutrition: 'Malnutrition Analysis',
        anemia: 'Anemia Tracking Report',
        immunization: 'Immunization Coverage',
        maternal: 'Maternal Health Report',
        dateRange: 'Date Range',
        lastWeek: 'Last 7 days',
        lastMonth: 'Last 30 days',
        lastQuarter: 'Last 3 months',
        lastYear: 'Last 12 months',
        custom: 'Custom Range',
        wards: 'Select Wards',
        categories: 'Health Categories',
        child: 'Child Health',
        pregnancy: 'Pregnancy',
        adolescent: 'Adolescent',
        format: 'Export Format',
        includeCharts: 'Include Charts & Visualizations',
        includeRecommendations: 'Include AI Recommendations',
        generateBtn: 'Generate Report',
        cancel: 'Cancel',
        generating: 'Generating report...',
        allWards: 'All Wards',
        allCategories: 'All Categories'
      },
      ml: {
        generateReport: 'ആരോഗ്യ റിപ്പോർട്ട് ജനറേറ്റ് ചെയ്യുക',
        reportType: 'റിപ്പോർട്ട് തരം',
        comprehensive: 'സമഗ്ര ആരോഗ്യ റിപ്പോർട്ട്',
        malnutrition: 'പോഷകാഹാരക്കുറവ് വിശകലനം',
        anemia: 'അനീമിയ ട്രാക്കിംഗ് റിപ്പോർട്ട്',
        immunization: 'പ്രതിരോധ കുത്തിവയ്പ്പ് കവറേജ്',
        maternal: 'മാതൃ ആരോഗ്യ റിപ്പോർട്ട്',
        dateRange: 'തീയതി പരിധി',
        lastWeek: 'കഴിഞ്ഞ 7 ദിവസം',
        lastMonth: 'കഴിഞ്ഞ 30 ദിവസം',
        lastQuarter: 'കഴിഞ്ഞ 3 മാസം',
        lastYear: 'കഴിഞ്ഞ 12 മാസം',
        custom: 'കസ്റ്റം പരിധി',
        wards: 'വാർഡുകൾ തിരഞ്ഞെടുക്കുക',
        categories: 'ആരോഗ്യ വിഭാഗങ്ങൾ',
        child: 'കുട്ടികളുടെ ആരോഗ്യം',
        pregnancy: 'ഗർഭധാരണം',
        adolescent: 'കൗമാരക്കാർ',
        format: 'എക്സ്പോർട്ട് ഫോർമാറ്റ്',
        includeCharts: 'ചാർട്ടുകളും ദൃശ്യവൽക്കരണങ്ങളും ഉൾപ്പെടുത്തുക',
        includeRecommendations: 'എഐ ശുപാർശകൾ ഉൾപ്പെടുത്തുക',
        generateBtn: 'റിപ്പോർട്ട് ജനറേറ്റ് ചെയ്യുക',
        cancel: 'റദ്ദാക്കുക',
        generating: 'റിപ്പോർട്ട് ജനറേറ്റ് ചെയ്യുന്നു...',
        allWards: 'എല്ലാ വാർഡുകളും',
        allCategories: 'എല്ലാ വിഭാഗങ്ങളും'
      }
    };
    return translations[language][key] || key;
  };

  const reportTypes = [
    {
      id: 'comprehensive',
      name: getTranslation('comprehensive'),
      description: 'Complete health overview with all metrics',
      icon: BarChart3
    },
    {
      id: 'malnutrition',
      name: getTranslation('malnutrition'),
      description: 'Detailed malnutrition tracking and trends',
      icon: TrendingUp
    },
    {
      id: 'anemia',
      name: getTranslation('anemia'),
      description: 'Anemia cases and prevention analysis',
      icon: PieChart
    },
    {
      id: 'immunization',
      name: getTranslation('immunization'),
      description: 'Vaccination coverage and schedules',
      icon: Users
    },
    {
      id: 'maternal',
      name: getTranslation('maternal'),
      description: 'Maternal health monitoring and care',
      icon: CheckCircle
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real app, this would call an API to generate the report
      const reportData = {
        type: reportType,
        dateRange,
        format,
        wards: selectedWards,
        categories: selectedCategories,
        timestamp: new Date().toISOString()
      };
      
      console.log('Generating report with data:', reportData);
      
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `health-report-${reportType}-${Date.now()}.${format}`;
      link.click();
      
      onClose();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWardChange = (ward) => {
    if (ward === 'all') {
      setSelectedWards(['all']);
    } else {
      const newWards = selectedWards.includes('all') 
        ? [ward]
        : selectedWards.includes(ward)
        ? selectedWards.filter(w => w !== ward)
        : [...selectedWards, ward];
      
      setSelectedWards(newWards.length === 0 ? ['all'] : newWards);
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes('all') 
        ? [category]
        : selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category];
      
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {getTranslation('generateReport')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {getTranslation('reportType')}
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    reportType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <type.icon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation('dateRange')}
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="last-week">{getTranslation('lastWeek')}</option>
                <option value="last-month">{getTranslation('lastMonth')}</option>
                <option value="last-quarter">{getTranslation('lastQuarter')}</option>
                <option value="last-year">{getTranslation('lastYear')}</option>
                <option value="custom">{getTranslation('custom')}</option>
              </select>
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation('format')}
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ward Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation('wards')}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {['all', 'ward1', 'ward2', 'ward3', 'ward5'].map((ward) => (
                  <label key={ward} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedWards.includes(ward)}
                      onChange={() => handleWardChange(ward)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {ward === 'all' ? getTranslation('allWards') : `Ward ${ward.slice(-1)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {getTranslation('categories')}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {['all', 'child', 'pregnancy', 'adolescent'].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {category === 'all' ? getTranslation('allCategories') : getTranslation(category)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {getTranslation('includeCharts')}
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {getTranslation('includeRecommendations')}
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            {getTranslation('cancel')}
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{getTranslation('generating')}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{getTranslation('generateBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthReportsModal;