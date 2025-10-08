// Simple test to check API connectivity
const testAPIConnection = async () => {
  try {
    console.log('🧪 Testing API connection...');
    
    // Test 1: Direct fetch to schemes endpoint
    const apiUrl = 'http://localhost:5005/api/schemes';
    console.log('🔗 Testing URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return false;
    }
    
    const data = await response.json();
    console.log('✅ API Response:', data);
    
    return data;
    
  } catch (error) {
    console.error('❌ API Connection Test Failed:', error);
    return false;
  }
};

// Test 2: Check environment variables
const checkEnvironment = () => {
  console.log('🔧 Environment Check:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE
  });
};

// Run tests when this file loads
checkEnvironment();
testAPIConnection().then(result => {
  if (result) {
    console.log('🎉 API Connection Test PASSED');
  } else {
    console.log('❌ API Connection Test FAILED');
  }
});

export { testAPIConnection, checkEnvironment };