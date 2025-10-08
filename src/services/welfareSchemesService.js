import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

console.log('🔧 WelfareSchemesService - API_BASE_URL:', API_BASE_URL);

class WelfareSchemesService {
  // Helper method to get auth headers
  async getAuthHeaders() {
    try {
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        };
      }
      
      const authToken = localStorage.getItem('authToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const jwtToken = authToken || firebaseToken;
      
      if (jwtToken) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };
      }
      
      throw new Error('User not authenticated');
    } catch (error) {
      console.error('Error getting auth headers:', error);
      throw new Error('Authentication failed');
    }
  }

  // Get all available welfare schemes
  async getAllSchemes() {
    try {
      console.log('📋 Fetching all welfare schemes...');
      console.log('🔗 API URL:', API_BASE_URL);
      
      // For now, try without authentication first
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/schemes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (fetchError) {
        console.error('❌ Network error:', fetchError);
        throw new Error('Network connection failed. Please check if the backend server is running.');
      }

      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`HTTP ${response.status}: Failed to fetch schemes - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Successfully fetched schemes:', result);
      
      return result.data;
    } catch (error) {
      console.error('❌ Failed to fetch schemes:', error);
      throw error;
    }
  }

  // Get schemes applicable for a specific child
  async getSchemesForChild(childId) {
    try {
      console.log('👶 Fetching schemes for child:', childId);
      
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/schemes/child/${childId}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch child schemes`);
      }

      const result = await response.json();
      console.log('✅ Successfully fetched child schemes:', result.data.total);
      
      return result.data;
    } catch (error) {
      console.error('❌ Failed to fetch child schemes:', error);
      throw error;
    }
  }

  // Enroll a child in a welfare scheme
  async enrollInScheme(childId, schemeId, parentName = 'Parent', childName = 'Child') {
    try {
      console.log('📝 Enrolling child in scheme:', { childId, schemeId, parentName, childName });
      
      const response = await fetch(`${API_BASE_URL}/schemes/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ childId, schemeId, parentName, childName })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: Enrollment failed`);
      }

      const result = await response.json();
      console.log('✅ Successfully enrolled in scheme:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to enroll in scheme:', error);
      throw error;
    }
  }

  // Get all enrollments for the logged-in parent
  async getMyEnrollments() {
    try {
      console.log('📊 Fetching my enrollments...');
      console.log('🔗 API URL:', `${API_BASE_URL}/schemes/enrollments`);
      
      const response = await fetch(`${API_BASE_URL}/schemes/enrollments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`HTTP ${response.status}: Failed to fetch enrollments - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Successfully fetched enrollments:', result);
      
      return result.data;
    } catch (error) {
      console.error('❌ Failed to fetch enrollments:', error);
      throw error;
    }
  }

  // Get enrollments for a specific child
  async getChildEnrollments(childId) {
    try {
      console.log('👶 Fetching enrollments for child:', childId);
      
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/schemes/enrollments/${childId}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch child enrollments`);
      }

      const result = await response.json();
      console.log('✅ Successfully fetched child enrollments:', result.data.total);
      
      return result.data;
    } catch (error) {
      console.error('❌ Failed to fetch child enrollments:', error);
      throw error;
    }
  }

  // Generate PDF report of welfare schemes and enrollments
  async generateSchemePDF(childData) {
    try {
      // This would integrate with jsPDF to generate PDF
      // For now, return a placeholder implementation
      return {
        success: true,
        message: 'PDF generation feature coming soon',
        filename: `Welfare_Schemes_${childData.name}.pdf`
      };
    } catch (error) {
      console.error('❌ Failed to generate PDF:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const welfareSchemesService = new WelfareSchemesService();
export default welfareSchemesService;