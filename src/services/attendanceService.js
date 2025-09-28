import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class AttendanceService {
  // Get today's attendance for an anganwadi center
  async getTodaysAttendance(anganwadiCenter) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      
      console.log('🔐 Token available:', !!token);
      console.log('🔐 Token type:', adminToken ? 'admin' : firebaseToken ? 'firebase' : authToken ? 'auth' : 'none');
      console.log('📡 Fetching attendance for:', anganwadiCenter);
      
      const response = await axios.get(
        `${API_BASE_URL}/attendance/today/${encodeURIComponent(anganwadiCenter)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('✅ Response received:', response.status);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching today\'s attendance:', error);
      console.error('📊 Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw this.handleError(error);
    }
  }

  // Mark attendance for a single child
  async markAttendance(attendanceData) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      const response = await axios.post(
        `${API_BASE_URL}/attendance/mark`,
        attendanceData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw this.handleError(error);
    }
  }

  // Bulk mark attendance (mark all children as present or absent)
  async bulkMarkAttendance(anganwadiCenter, status, childIds = null) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      const response = await axios.post(
        `${API_BASE_URL}/attendance/bulk-mark`,
        {
          anganwadiCenter,
          status,
          childIds
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error bulk marking attendance:', error);
      throw this.handleError(error);
    }
  }

  // Get attendance history for a child
  async getAttendanceHistory(childId, startDate = null, endDate = null, limit = 30) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      params.append('limit', limit.toString());

      const response = await axios.get(
        `${API_BASE_URL}/attendance/history/${childId}?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance history:', error);
      throw this.handleError(error);
    }
  }

  // Get attendance statistics for a date range
  async getAttendanceStatistics(anganwadiCenter, startDate = null, endDate = null) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await axios.get(
        `${API_BASE_URL}/attendance/statistics/${encodeURIComponent(anganwadiCenter)}?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance statistics:', error);
      throw this.handleError(error);
    }
  }

  // Delete attendance record (admin only)
  async deleteAttendance(attendanceId) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      const response = await axios.delete(
        `${API_BASE_URL}/attendance/${attendanceId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting attendance:', error);
      throw this.handleError(error);
    }
  }

  // Update attendance with additional info (nutrition, health check)
  async updateAttendanceDetails(childId, anganwadiCenter, updates) {
    try {
      // Get the appropriate token based on authentication method
      const adminToken = localStorage.getItem('adminToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const authToken = localStorage.getItem('authToken');
      const token = adminToken || firebaseToken || authToken;
      
      // Get current attendance data first
      const todaysAttendance = await this.getTodaysAttendance(anganwadiCenter);
      const childAttendance = todaysAttendance.data.children.find(
        child => child.childId === childId
      );

      if (!childAttendance) {
        throw new Error('Child attendance record not found for today');
      }

      // Update the attendance with new details
      const response = await axios.post(
        `${API_BASE_URL}/attendance/mark`,
        {
          childId,
          childName: childAttendance.name,
          anganwadiCenter,
          status: childAttendance.status,
          timeIn: childAttendance.timeIn,
          timeOut: childAttendance.timeOut,
          notes: updates.notes !== undefined ? updates.notes : childAttendance.notes,
          nutritionReceived: updates.nutritionReceived !== undefined ? updates.nutritionReceived : childAttendance.nutritionReceived,
          healthCheckDone: updates.healthCheckDone !== undefined ? updates.healthCheckDone : childAttendance.healthCheckDone
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating attendance details:', error);
      throw this.handleError(error);
    }
  }

  // Helper method to format attendance data for UI display
  formatAttendanceForDisplay(attendanceData) {
    return {
      ...attendanceData,
      children: attendanceData.children.map(child => ({
        ...child,
        displayAge: child.age,
        statusColor: this.getStatusColor(child.status),
        statusIcon: this.getStatusIcon(child.status),
        canMarkNutrition: ['present', 'late'].includes(child.status),
        canMarkHealthCheck: ['present', 'late'].includes(child.status)
      }))
    };
  }

  // Get color class for attendance status
  getStatusColor(status) {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      'half-day': 'bg-blue-100 text-blue-800',
      sick: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  // Get icon for attendance status
  getStatusIcon(status) {
    const icons = {
      present: '✓',
      absent: '✗',
      late: '⏰',
      'half-day': '½',
      sick: '🤒'
    };
    return icons[status] || '?';
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred';
      return new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network error - please check your connection');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  // Get summary statistics
  getAttendanceSummary(attendanceData) {
    const children = attendanceData.children || [];
    const total = children.length;
    const present = children.filter(child => child.status === 'present').length;
    const late = children.filter(child => child.status === 'late').length;
    const absent = children.filter(child => child.status === 'absent').length;
    const sick = children.filter(child => child.status === 'sick').length;
    const halfDay = children.filter(child => child.status === 'half-day').length;
    
    const totalPresent = present + late + halfDay;
    const attendanceRate = total > 0 ? Math.round((totalPresent / total) * 100) : 0;

    return {
      total,
      present,
      late,
      absent,
      sick,
      halfDay,
      totalPresent,
      attendanceRate,
      nutritionCount: children.filter(child => child.nutritionReceived).length,
      healthCheckCount: children.filter(child => child.healthCheckDone).length
    };
  }
}

// Create and export a singleton instance
const attendanceService = new AttendanceService();
export default attendanceService;