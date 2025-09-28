import apiClient from '../utils/apiClient';

class SystemSettingsService {
  constructor() {
    this.baseURL = '/api/admin/settings';
  }

  // Get all system settings
  async getSettings() {
    try {
      const response = await apiClient.get(this.baseURL);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching system settings:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch settings'
      };
    }
  }

  // Save system settings
  async saveSettings(settings) {
    try {
      const response = await apiClient.put(this.baseURL, settings);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error saving system settings:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to save settings'
      };
    }
  }

  // Get specific section settings
  async getSectionSettings(section) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${section}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error fetching ${section} settings:`, error);
      return {
        success: false,
        error: error.response?.data?.message || `Failed to fetch ${section} settings`
      };
    }
  }

  // Update specific section settings
  async updateSectionSettings(section, settings) {
    try {
      const response = await apiClient.put(`${this.baseURL}/${section}`, settings);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error updating ${section} settings:`, error);
      return {
        success: false,
        error: error.response?.data?.message || `Failed to update ${section} settings`
      };
    }
  }

  // Upload logo
  async uploadLogo(file) {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      const response = await apiClient.post(`${this.baseURL}/upload-logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error uploading logo:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload logo'
      };
    }
  }

  // Role management
  async createRole(roleData) {
    try {
      const response = await apiClient.post(`${this.baseURL}/roles`, roleData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating role:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create role'
      };
    }
  }

  async updateRole(roleId, roleData) {
    try {
      const response = await apiClient.put(`${this.baseURL}/roles/${roleId}`, roleData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating role:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update role'
      };
    }
  }

  async deleteRole(roleId) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/roles/${roleId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error deleting role:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete role'
      };
    }
  }

  // Anganwadi Centers management
  async getAnganwadiCenters() {
    try {
      const response = await apiClient.get(`${this.baseURL}/centers`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching Anganwadi centers:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch centers'
      };
    }
  }

  async createAnganwadiCenter(centerData) {
    try {
      const response = await apiClient.post(`${this.baseURL}/centers`, centerData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating Anganwadi center:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create center'
      };
    }
  }

  async updateAnganwadiCenter(centerId, centerData) {
    try {
      const response = await apiClient.put(`${this.baseURL}/centers/${centerId}`, centerData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating Anganwadi center:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update center'
      };
    }
  }

  async deleteAnganwadiCenter(centerId) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/centers/${centerId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error deleting Anganwadi center:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete center'
      };
    }
  }

  // Backup and restore
  async createBackup() {
    try {
      const response = await apiClient.post(`${this.baseURL}/backup`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating backup:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create backup'
      };
    }
  }

  async restoreBackup(backupFile) {
    try {
      const formData = new FormData();
      formData.append('backup', backupFile);
      
      const response = await apiClient.post(`${this.baseURL}/restore`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error restoring backup:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to restore backup'
      };
    }
  }

  // System maintenance
  async clearCache() {
    try {
      const response = await apiClient.post(`${this.baseURL}/maintenance/clear-cache`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error clearing cache:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to clear cache'
      };
    }
  }

  async toggleModule(moduleId, enabled) {
    try {
      const response = await apiClient.put(`${this.baseURL}/maintenance/modules/${moduleId}`, {
        enabled
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error toggling module:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to toggle module'
      };
    }
  }

  async getSystemInfo() {
    try {
      const response = await apiClient.get(`${this.baseURL}/system-info`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching system info:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch system info'
      };
    }
  }

  // Test email/SMS configuration
  async testNotification(type, recipient) {
    try {
      const response = await apiClient.post(`${this.baseURL}/test-notification`, {
        type,
        recipient
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error testing notification:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to test notification'
      };
    }
  }

  // Export settings
  async exportSettings() {
    try {
      const response = await apiClient.get(`${this.baseURL}/export`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `system-settings-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return {
        success: true,
        message: 'Settings exported successfully'
      };
    } catch (error) {
      console.error('Error exporting settings:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to export settings'
      };
    }
  }

  // Import settings
  async importSettings(file) {
    try {
      const formData = new FormData();
      formData.append('settings', file);
      
      const response = await apiClient.post(`${this.baseURL}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error importing settings:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to import settings'
      };
    }
  }
}

const systemSettingsService = new SystemSettingsService();
export default systemSettingsService;