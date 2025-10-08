import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ParentService {
  // Helper method to get auth headers
  async getAuthHeaders() {
    try {
      // First try to get Firebase token
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        };
      }
      
      // If no Firebase user, check for JWT token in localStorage
      const authToken = localStorage.getItem('authToken');
      const firebaseToken = localStorage.getItem('firebaseToken');
      const jwtToken = authToken || firebaseToken;
      
      if (jwtToken) {
        console.log('🔑 Using stored token for authentication:', jwtToken.substring(0, 20) + '...');
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };
      }
      
      throw new Error('User not authenticated - no Firebase user or JWT token found');
    } catch (error) {
      console.error('Error getting auth headers:', error);
      throw new Error('Authentication failed');
    }
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Get all children for the logged-in parent
  async getMyChildren() {
    try {
      console.log('👨‍👩‍👧‍👦 Fetching my children...');
      console.log('🔍 User info from localStorage:', {
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole'),
        hasAuthToken: !!localStorage.getItem('authToken'),
        hasFirebaseToken: !!localStorage.getItem('firebaseToken')
      });
      
      const headers = await this.getAuthHeaders();
      console.log('📤 Making request to:', `${API_BASE_URL}/registration/my-children`);
      
      const response = await fetch(`${API_BASE_URL}/registration/my-children`, {
        method: 'GET',
        headers
      });

      console.log('📥 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error - unable to parse response' }));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch children`);
      }

      const result = await response.json();
      console.log('✅ Raw API response:', result);
      
      const childrenCount = result.data?.children?.length || 0;
      console.log(`✅ Successfully fetched ${childrenCount} children`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Failed to fetch children:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Get detailed information for a specific child
  async getChildDetails(childId) {
    try {
      console.log('👶 Fetching child details for ID:', childId);
      
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${API_BASE_URL}/registration/my-children/${childId}`, {
        method: 'GET',
        headers
      });

      const result = await this.handleResponse(response);
      
      console.log('✅ Successfully fetched child details');
      return result;
      
    } catch (error) {
      console.error('❌ Failed to fetch child details:', error);
      throw error;
    }
  }

  // Get parent dashboard statistics
  async getParentStats() {
    try {
      console.log('📊 Fetching parent dashboard statistics...');
      const childrenData = await this.getMyChildren();
      const children = childrenData.data?.children || [];
      
      console.log(`📈 Processing stats for ${children.length} children`);
      
      // Calculate statistics
      const totalChildren = children.length;
      const healthyChildren = children.filter(child => child.healthStatus === 'healthy').length;
      const upToDateVaccinations = children.filter(child => child.vaccinationStatus === 'up-to-date').length;
      const averageAge = children.length > 0 
        ? Math.round(children.reduce((sum, child) => sum + (child.age || 0), 0) / children.length)
        : 0;

      // Calculate attendance rate (mock data - would come from actual attendance records)
      const attendanceRate = children.length > 0 ? 92 : 0;

      // Count pending vaccinations
      const pendingVaccinations = children.filter(child => child.vaccinationStatus === 'pending').length;

      const stats = {
        totalChildren,
        healthyChildren,
        attendanceRate,
        pendingVaccinations,
        upToDateVaccinations,
        averageAge,
        children: children.map(child => ({
          id: child._id || child.id,
          name: child.name || 'Unknown',
          age: child.ageDisplay || child.age || 'Unknown',
          healthStatus: child.healthStatus || 'pending',
          vaccinationStatus: child.vaccinationStatus || 'pending',
          nutritionStatus: child.nutritionStatus || 'normal',
          anganwadiCenter: child.anganwadiCenter || 'Not assigned',
          lastCheckup: child.updatedAt || new Date(),
          nextCheckup: child.nextCheckup || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          // Add missing database fields
          dateOfBirth: child.dateOfBirth,
          bloodGroup: child.bloodGroup,
          enrollmentDate: child.enrollmentDate
        }))
      };

      console.log('✅ Parent stats calculated:', stats);
      return stats;
      
    } catch (error) {
      console.error('❌ Failed to fetch parent stats:', error);
      
      // Return default stats if there's an error
      console.log('📊 Returning default stats due to error');
      return {
        totalChildren: 0,
        healthyChildren: 0,
        attendanceRate: 0,
        pendingVaccinations: 0,
        upToDateVaccinations: 0,
        averageAge: 0,
        children: []
      };
    }
  }

  // Get child health records
  async getChildHealthRecords(childId) {
    try {
      const childDetails = await this.getChildDetails(childId);
      const child = childDetails.data.child;
      
      return {
        basicInfo: {
          name: child.name,
          age: child.ageDisplay,
          gender: child.gender,
          bloodGroup: child.bloodGroup
        },
        measurements: {
          currentWeight: child.currentWeight,
          currentHeight: child.currentHeight,
          birthWeight: child.birthWeight,
          growthPercentiles: child.growthPercentiles
        },
        vaccinations: child.vaccinations || [],
        medicalHistory: child.medicalHistory || {},
        nutritionStatus: child.nutritionStatus,
        recentActivities: child.recentActivities || [],
        upcomingEvents: child.upcomingEvents || []
      };
      
    } catch (error) {
      console.error('❌ Failed to fetch child health records:', error);
      throw error;
    }
  }

  // Get child attendance records (mock implementation)
  async getChildAttendance(childId, month = null, year = null) {
    try {
      // This would typically fetch from an attendance API
      // For now, returning mock data
      const currentDate = new Date();
      const targetMonth = month || currentDate.getMonth();
      const targetYear = year || currentDate.getFullYear();
      
      // Generate mock attendance data
      const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
      const attendanceRecords = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(targetYear, targetMonth, day);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isFuture = date > currentDate;
        
        if (!isWeekend && !isFuture) {
          attendanceRecords.push({
            date: date.toISOString().split('T')[0],
            status: Math.random() > 0.1 ? 'present' : 'absent', // 90% attendance rate
            activities: Math.random() > 0.5 ? ['Learning', 'Nutrition'] : ['Learning']
          });
        }
      }
      
      const presentDays = attendanceRecords.filter(record => record.status === 'present').length;
      const totalDays = attendanceRecords.length;
      const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
      
      return {
        month: targetMonth,
        year: targetYear,
        attendancePercentage,
        presentDays,
        totalDays,
        records: attendanceRecords
      };
      
    } catch (error) {
      console.error('❌ Failed to fetch child attendance:', error);
      throw error;
    }
  }

  // Submit feedback (mock implementation)
  async submitFeedback(feedbackData) {
    try {
      console.log('📝 Submitting feedback:', feedbackData);
      
      // This would typically send to a feedback API
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Feedback submitted successfully',
        feedbackId: `feedback_${Date.now()}`
      };
      
    } catch (error) {
      console.error('❌ Failed to submit feedback:', error);
      throw error;
    }
  }

  // Get notifications for parent (mock implementation)
  async getNotifications() {
    try {
      const childrenData = await this.getMyChildren();
      const children = childrenData.data.children;
      
      const notifications = [];
      
      children.forEach(child => {
        // Add vaccination reminders
        if (child.vaccinationStatus === 'pending') {
          notifications.push({
            id: `vacc_${child._id}`,
            type: 'vaccination',
            title: 'Vaccination Due',
            message: `${child.name} has pending vaccinations`,
            date: new Date(),
            priority: 'high',
            childId: child._id,
            childName: child.name
          });
        }
        
        // Add health checkup reminders
        if (child.nextCheckup && new Date(child.nextCheckup) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
          notifications.push({
            id: `checkup_${child._id}`,
            type: 'health',
            title: 'Health Checkup Due',
            message: `${child.name} has a health checkup scheduled`,
            date: new Date(child.nextCheckup),
            priority: 'medium',
            childId: child._id,
            childName: child.name
          });
        }
      });
      
      return {
        notifications: notifications.sort((a, b) => new Date(b.date) - new Date(a.date)),
        unreadCount: notifications.length
      };
      
    } catch (error) {
      console.error('❌ Failed to fetch notifications:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const parentService = new ParentService();
export default parentService;
