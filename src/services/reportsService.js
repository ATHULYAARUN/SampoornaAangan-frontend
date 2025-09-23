import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ReportsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${BASE_URL}/reports`,
      timeout: 30000, // 30 seconds for PDF generation
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken') || localStorage.getItem('adminToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Reports API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminToken');
          window.location.href = '/login';
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get dashboard statistics for reports overview
   */
  async getDashboardStats() {
    try {
      const response = await this.api.get('/dashboard-stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard statistics');
    }
  }

  /**
   * Get anganwadi centers with detailed information
   */
  async getAnganwadiCenters(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.ward) params.append('ward', filters.ward);
      if (filters.status) params.append('status', filters.status);

      const response = await this.api.get(`/anganwadi-centers?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch anganwadi centers');
    }
  }

  /**
   * Download PDF report for a specific anganwadi center
   */
  async downloadAnganwadiPDF(centerName) {
    try {
      const response = await this.api.get(`/anganwadi-centers/${encodeURIComponent(centerName)}/pdf`, {
        responseType: 'blob',
      });

      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${centerName.replace(/\s+/g, '_')}_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: 'PDF downloaded successfully' };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to download PDF report');
    }
  }

  /**
   * Download consolidated PDF report for all anganwadi centers
   */
  async downloadConsolidatedPDF() {
    try {
      const response = await this.api.get('/consolidated-pdf', {
        responseType: 'blob',
      });

      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'All_Anganwadi_Centers_Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true, message: 'Consolidated PDF downloaded successfully' };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to download consolidated PDF report');
    }
  }

  /**
   * Get available wards for filtering
   */
  async getWards() {
    try {
      const response = await this.api.get('/wards');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch wards');
    }
  }

  /**
   * Generate chart data from API response
   */
  generateChartData(statsData) {
    const { distributions } = statsData;

    // Worker distribution chart data
    const workerChartData = {
      labels: distributions.workerDistribution.map(item => item.anganwadiCenter),
      datasets: [
        {
          label: 'Anganwadi Workers',
          data: distributions.workerDistribution.map(item => item.anganwadiWorkers),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: 'ASHA Volunteers',
          data: distributions.workerDistribution.map(item => item.ashaVolunteers),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1,
        }
      ]
    };

    // Children distribution chart data
    const childrenChartData = {
      labels: distributions.childrenDistribution.map(item => item.anganwadiCenter),
      datasets: [
        {
          label: 'Children Count',
          data: distributions.childrenDistribution.map(item => item.childrenCount),
          backgroundColor: 'rgba(236, 72, 153, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 2,
          fill: false,
        }
      ]
    };

    // Age group distribution pie chart data
    const ageGroupData = distributions.childrenDistribution.reduce(
      (acc, item) => {
        acc.age0to2 += item.age0to2 || 0;
        acc.age3to5 += item.age3to5 || 0;
        acc.age6plus += item.age6plus || 0;
        return acc;
      },
      { age0to2: 0, age3to5: 0, age6plus: 0 }
    );

    const ageGroupChartData = {
      labels: ['0-2 Years', '3-5 Years', '6+ Years'],
      datasets: [
        {
          data: [ageGroupData.age0to2, ageGroupData.age3to5, ageGroupData.age6plus],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(249, 115, 22, 0.8)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(249, 115, 22, 1)',
          ],
          borderWidth: 2,
        }
      ]
    };

    return {
      workerDistribution: workerChartData,
      childrenDistribution: childrenChartData,
      ageGroupDistribution: ageGroupChartData,
    };
  }

  /**
   * Format numbers with commas
   */
  formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  }

  /**
   * Calculate growth percentage
   */
  calculateGrowth(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  }

  /**
   * Get status color based on value
   */
  getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  /**
   * Format date for display
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Export data to CSV format
   */
  exportToCSV(data, filename) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export default new ReportsService();