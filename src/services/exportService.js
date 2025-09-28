import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ExportService {
  // Helper method to check authentication status
  isAuthenticated() {
    const adminToken = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // Check if admin is authenticated
    if (adminToken && userRole === 'super-admin' && isAuthenticated === 'true') {
      return { type: 'admin', token: adminToken };
    }

    // Check if regular user is authenticated
    if (auth.currentUser && isAuthenticated === 'true') {
      return { type: 'user', user: auth.currentUser };
    }

    return { type: 'none' };
  }

  // Helper method to get auth headers
  async getAuthHeaders() {
    try {
      const authStatus = this.isAuthenticated();

      if (authStatus.type === 'admin') {
        console.log('🔑 Using admin JWT token');
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStatus.token}`
        };
      } else if (authStatus.type === 'user') {
        console.log('🔑 Getting fresh Firebase token for user:', authStatus.user.email);

        // Force refresh the token to ensure it's valid
        const idToken = await authStatus.user.getIdToken(true);

        if (!idToken) {
          throw new Error('Failed to get authentication token');
        }

        console.log('✅ Firebase token obtained successfully');

        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        };
      } else {
        console.error('❌ No authentication found');
        throw new Error('User not authenticated. Please log in again.');
      }
    } catch (error) {
      console.error('❌ Error getting auth headers:', error);

      // Check if it's a token expiration issue
      if (error.code === 'auth/id-token-expired' || error.message.includes('token')) {
        throw new Error('Your session has expired. Please log out and log in again.');
      }

      throw new Error('Authentication failed. Please check your login status.');
    }
  }

  // Convert JSON data to CSV format
  convertToCSV(data, headers = null) {
    if (!data || data.length === 0) {
      return '';
    }

    // If headers not provided, extract from first object
    if (!headers) {
      headers = Object.keys(data[0]);
    }

    // Create CSV header row
    const csvHeaders = headers.join(',');
    
    // Create CSV data rows
    const csvRows = data.map(row => {
      return headers.map(header => {
        let value = this.getNestedValue(row, header);
        
        // Handle different data types
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }
        
        return value;
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  }

  // Helper to get nested object values
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  }

  // Download file helper
  downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Export workers data
  async exportWorkers(filters = {}, format = 'csv') {
    try {
      console.log('📊 Exporting workers data...', { filters, format });

      // Get fresh auth headers
      const headers = await this.getAuthHeaders();

      // Clean up filters - remove empty values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
      );

      // Build query parameters
      const queryParams = new URLSearchParams({
        format,
        ...cleanFilters
      });

      console.log('🔗 Making request to:', `${API_BASE_URL}/admin/users/export?${queryParams}`);
      console.log('🔑 Using headers:', { ...headers, Authorization: 'Bearer [HIDDEN]' });

      const response = await fetch(`${API_BASE_URL}/admin/users/export?${queryParams}`, {
        method: 'GET',
        headers
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Export failed';

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('❌ Server error response:', errorData);
        } catch (parseError) {
          console.error('❌ Failed to parse error response:', parseError);

          // Handle specific HTTP status codes
          switch (response.status) {
            case 401:
              errorMessage = 'Authentication failed. Please log out and log in again.';
              break;
            case 403:
              errorMessage = 'You do not have permission to export data.';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later.';
              break;
            default:
              errorMessage = `Export failed with status ${response.status}`;
          }
        }

        throw new Error(errorMessage);
      }

      if (format === 'csv') {
        // Handle CSV download
        const csvContent = await response.text();
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `workers_export_${timestamp}.csv`;
        
        this.downloadFile(csvContent, filename, 'text/csv');
        
        return {
          success: true,
          message: 'Workers data exported successfully',
          filename
        };
      } else {
        // Handle JSON export
        const result = await response.json();
        
        if (result.success) {
          const timestamp = new Date().toISOString().split('T')[0];
          const filename = `workers_export_${timestamp}.json`;
          
          this.downloadFile(
            JSON.stringify(result.data, null, 2), 
            filename, 
            'application/json'
          );
          
          return {
            success: true,
            message: 'Workers data exported successfully',
            filename,
            data: result.data
          };
        } else {
          throw new Error(result.message || 'Export failed');
        }
      }
      
    } catch (error) {
      console.error('❌ Export workers error:', error);
      throw error;
    }
  }

  // Export children data
  async exportChildren(filters = {}, format = 'csv') {
    try {
      console.log('👶 Exporting children data...', { filters, format });
      
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams({
        format,
        ...filters
      });

      const response = await fetch(`${API_BASE_URL}/registration/children/export?${queryParams}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Export failed');
      }

      if (format === 'csv') {
        const csvContent = await response.text();
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `children_export_${timestamp}.csv`;
        
        this.downloadFile(csvContent, filename, 'text/csv');
        
        return {
          success: true,
          message: 'Children data exported successfully',
          filename
        };
      } else {
        const result = await response.json();
        
        if (result.success) {
          const timestamp = new Date().toISOString().split('T')[0];
          const filename = `children_export_${timestamp}.json`;
          
          this.downloadFile(
            JSON.stringify(result.data, null, 2), 
            filename, 
            'application/json'
          );
          
          return {
            success: true,
            message: 'Children data exported successfully',
            filename,
            data: result.data
          };
        } else {
          throw new Error(result.message || 'Export failed');
        }
      }
      
    } catch (error) {
      console.error('❌ Export children error:', error);
      throw error;
    }
  }

  // Export pregnant women data
  async exportPregnantWomen(filters = {}, format = 'csv') {
    try {
      console.log('🤰 Exporting pregnant women data...', { filters, format });
      
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams({
        format,
        ...filters
      });

      const response = await fetch(`${API_BASE_URL}/registration/pregnant-women/export?${queryParams}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Export failed');
      }

      if (format === 'csv') {
        const csvContent = await response.text();
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `pregnant_women_export_${timestamp}.csv`;
        
        this.downloadFile(csvContent, filename, 'text/csv');
        
        return {
          success: true,
          message: 'Pregnant women data exported successfully',
          filename
        };
      } else {
        const result = await response.json();
        
        if (result.success) {
          const timestamp = new Date().toISOString().split('T')[0];
          const filename = `pregnant_women_export_${timestamp}.json`;
          
          this.downloadFile(
            JSON.stringify(result.data, null, 2), 
            filename, 
            'application/json'
          );
          
          return {
            success: true,
            message: 'Pregnant women data exported successfully',
            filename,
            data: result.data
          };
        } else {
          throw new Error(result.message || 'Export failed');
        }
      }
      
    } catch (error) {
      console.error('❌ Export pregnant women error:', error);
      throw error;
    }
  }

  // Export adolescents data
  async exportAdolescents(filters = {}, format = 'csv') {
    try {
      console.log('👧 Exporting adolescents data...', { filters, format });
      
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams({
        format,
        ...filters
      });

      const response = await fetch(`${API_BASE_URL}/registration/adolescents/export?${queryParams}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Export failed');
      }

      if (format === 'csv') {
        const csvContent = await response.text();
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `adolescents_export_${timestamp}.csv`;
        
        this.downloadFile(csvContent, filename, 'text/csv');
        
        return {
          success: true,
          message: 'Adolescents data exported successfully',
          filename
        };
      } else {
        const result = await response.json();
        
        if (result.success) {
          const timestamp = new Date().toISOString().split('T')[0];
          const filename = `adolescents_export_${timestamp}.json`;
          
          this.downloadFile(
            JSON.stringify(result.data, null, 2), 
            filename, 
            'application/json'
          );
          
          return {
            success: true,
            message: 'Adolescents data exported successfully',
            filename,
            data: result.data
          };
        } else {
          throw new Error(result.message || 'Export failed');
        }
      }
      
    } catch (error) {
      console.error('❌ Export adolescents error:', error);
      throw error;
    }
  }

  // Generate comprehensive report
  async generateComprehensiveReport(filters = {}) {
    try {
      console.log('📋 Generating comprehensive report...', filters);
      
      const headers = await this.getAuthHeaders();
      
      const queryParams = new URLSearchParams(filters);

      const response = await fetch(`${API_BASE_URL}/admin/reports/comprehensive?${queryParams}`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Report generation failed');
      }

      const result = await response.json();
      
      if (result.success) {
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `comprehensive_report_${timestamp}.json`;
        
        this.downloadFile(
          JSON.stringify(result.data, null, 2), 
          filename, 
          'application/json'
        );
        
        return {
          success: true,
          message: 'Comprehensive report generated successfully',
          filename,
          data: result.data
        };
      } else {
        throw new Error(result.message || 'Report generation failed');
      }
      
    } catch (error) {
      console.error('❌ Generate report error:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const exportService = new ExportService();
export default exportService;
