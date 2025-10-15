import React from 'react';
import { Heart, Activity, AlertTriangle } from 'lucide-react';

const HealthMonitoringTest = () => {
  console.log('🏥 Health Monitoring Test Component Loaded');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            Health Monitoring - Test Mode
          </h1>
          <p className="text-gray-600 mt-2">Testing health monitoring display functionality</p>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">High Risk Pregnancies</h3>
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">12</div>
            <p className="text-sm text-gray-500">Requiring immediate attention</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Anemia Cases</h3>
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">34</div>
            <p className="text-sm text-gray-500">Under treatment</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Growth Monitoring</h3>
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <p className="text-sm text-gray-500">Coverage rate</p>
          </div>
        </div>

        {/* Test Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Component Test Status</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">React component rendering: ✅ Working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Tailwind CSS styling: ✅ Working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Lucide icons: ✅ Working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">If you can see this, the component is loading correctly!</span>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Debug Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div>Component: HealthMonitoringTest</div>
            <div>Timestamp: {new Date().toLocaleString()}</div>
            <div>Status: Loaded and Rendered Successfully</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoringTest;