import React, { useState, useEffect } from 'react';

const ReportsAnalyticsDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    mounted: false,
    error: null,
    timestamp: null
  });

  useEffect(() => {
    console.log('🔍 ReportsAnalyticsDebug mounted at:', new Date().toISOString());
    try {
      setDebugInfo({
        mounted: true,
        error: null,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error in ReportsAnalyticsDebug:', error);
      setDebugInfo({
        mounted: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Reports Analytics Debug</h2>
        <div className="space-y-2 text-sm">
          <div><strong>Status:</strong> {debugInfo.mounted ? '✅ Mounted' : '❌ Failed to mount'}</div>
          <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
          {debugInfo.error && (
            <div className="text-red-600"><strong>Error:</strong> {debugInfo.error}</div>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Component Test</h3>
        <p className="text-green-700">
          If you can see this, the Reports Analytics page is loading correctly!
        </p>
        <button 
          onClick={() => console.log('🔘 Test button clicked')}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Click
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Next Steps</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-1">
          <li>Check browser console for any errors</li>
          <li>Verify all dependencies are loaded</li>
          <li>Test navigation between tabs</li>
          <li>If this works, gradually add back full functionality</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsAnalyticsDebug;