// API base URL - update this to match your backend
const API_BASE_URL = 'http://localhost:5000/api';

class AdminService {
  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('firebaseToken');
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Get all users with pagination and filters
  async getUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch users');
      }

      return result;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  // Create new user by admin
  async createUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create user');
      }

      return result;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }

  // Update user by admin
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update user');
      }

      return result;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  // Delete user by admin
  async deleteUser(userId, permanent = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}?permanent=${permanent}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete user');
      }

      return result;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  // Search users
  async searchUsers(searchParams) {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${API_BASE_URL}/admin/users/search?${queryParams}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Search failed');
      }

      return result;
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  }

  // Get dashboard data
  async getDashboardData() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch dashboard data');
      }

      return result;
    } catch (error) {
      console.error('Get dashboard data error:', error);
      throw error;
    }
  }

  // Get system statistics
  async getSystemStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch statistics');
      }

      return result;
    } catch (error) {
      console.error('Get system stats error:', error);
      throw error;
    }
  }

  // Export users data
  async exportUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/admin/users/export?${queryParams}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Export failed');
      }

      return result;
    } catch (error) {
      console.error('Export users error:', error);
      throw error;
    }
  }

  // Reactivate user
  async reactivateUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/reactivate`, {
        method: 'PUT',
        headers: this.getAuthHeaders()
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to reactivate user');
      }

      return result;
    } catch (error) {
      console.error('Reactivate user error:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const adminService = new AdminService();
export default adminService;