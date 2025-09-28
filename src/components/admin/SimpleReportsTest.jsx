import React from 'react';
import { BarChart3, Users, Baby, Activity } from 'lucide-react';

const SimpleReportsTest = () => {
  console.log('🧪 Simple Reports Test Component Rendered');
  
  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-black mb-4">Simple Reports Test</h2>
      <p className="text-gray-600 mb-6">This is a test component to verify the Analytics & Reports page loads correctly.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-800">Test Metric 1</h3>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-semibold text-green-800">Test Metric 2</h3>
              <p className="text-2xl font-bold text-green-600">42</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Baby className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-semibold text-purple-800">Test Metric 3</h3>
              <p className="text-2xl font-bold text-purple-600">18</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h3 className="font-semibold text-orange-800">Test Metric 4</h3>
              <p className="text-2xl font-bold text-orange-600">93%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Debug Information</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✅ Component rendered successfully</li>
          <li>✅ Icons loaded correctly</li>
          <li>✅ Tailwind CSS styles applied</li>
          <li>✅ No JavaScript errors</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleReportsTest;