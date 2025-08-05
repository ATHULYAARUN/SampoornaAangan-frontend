import React, { useState } from 'react';
import authService from './services/authService';

const TestAuth = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult('Testing registration...');
    
    try {
      const userData = {
        name: 'Frontend Test User',
        email: 'frontend@test.com',
        password: 'test123456',
        role: 'parent',
        phone: '9876543210',
        address: {
          street: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456',
          district: 'Test District',
          block: 'Test Block'
        },
        roleSpecificData: {
          parentDetails: {
            children: [{
              name: 'Test Child',
              age: 5,
              gender: 'Male'
            }],
            familySize: 3
          }
        }
      };

      const response = await authService.registerUser(userData);
      setResult(`✅ Registration Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Registration Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const response = await authService.loginUser('frontend@test.com', 'test123456', 'parent');
      setResult(`✅ Login Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testExistingLogin = async () => {
    setLoading(true);
    setResult('Testing existing user login...');
    
    try {
      const response = await authService.loginUser('newuser@example.com', 'password123', 'parent');
      setResult(`✅ Existing User Login Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Existing User Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🧪 Authentication Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testRegistration} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Test Registration
        </button>
        
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Test Login (New User)
        </button>
        
        <button 
          onClick={testExistingLogin} 
          disabled={loading}
          style={{ padding: '10px 20px' }}
        >
          Test Login (Existing User)
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        minHeight: '200px'
      }}>
        {loading ? '⏳ Loading...' : result || 'Click a button to test authentication'}
      </div>
    </div>
  );
};

export default TestAuth;