import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import AdminDashboard from '../pages/AdminDashboard';
import dashboardService from '../services/dashboardService';

// Mock the dashboard service
vi.mock('../services/dashboardService', () => ({
  default: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    getDashboardData: vi.fn(),
    getAnganwadiData: vi.fn(),
    getRecentActivities: vi.fn(),
  }
}));

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AdminDashboard', () => {
  const mockDashboardData = {
    totalUsers: 150,
    totalChildren: 75,
    totalPregnantWomen: 25,
    totalAdolescents: 30,
    totalNewborns: 20,
    schemeCoverage: '92.5%',
    healthAlerts: 8,
    wasteManagement: '88.2%',
    dataVerification: '96.8%',
    centerStats: {
      akkarakunnu: {
        workers: 5,
        children: 40,
        pregnantWomen: 15,
        adolescents: 18
      },
      veliyanoor: {
        workers: 3,
        children: 35,
        pregnantWomen: 10,
        adolescents: 12
      }
    }
  };

  const mockAnganwadiData = [
    {
      id: 1,
      name: 'Akkarakunnu Anganwadi Center',
      code: 'AW-AK968',
      location: 'Elangulam, Kottayam, Kerala',
      ward: 9,
      workers: 5,
      children: 40,
      status: 'Active',
      lastUpdate: '10/09/2025'
    },
    {
      id: 2,
      name: 'Veliyanoor Anganwadi Center',
      code: 'AK-VL969',
      location: 'Veliyanoor, Kottayam, Kerala',
      ward: 9,
      workers: 3,
      children: 35,
      status: 'Active',
      lastUpdate: '10/09/2025'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mocks
    dashboardService.getDashboardData.mockResolvedValue(mockDashboardData);
    dashboardService.getAnganwadiData.mockReturnValue(mockAnganwadiData);
    dashboardService.getRecentActivities.mockReturnValue([
      'New worker registered at Akkarakunnu Center',
      'Health checkup completed for 15 children',
      'Nutrition data updated for Ward 9'
    ]);
    
    dashboardService.subscribe.mockImplementation((callback) => {
      // Simulate subscription callback
      setTimeout(() => callback(mockDashboardData), 100);
      return vi.fn(); // Return unsubscribe function
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Happy Path', () => {
    it('should render dashboard with data', async () => {
      renderWithRouter(<AdminDashboard />);

      // Check if main heading is rendered
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByText('150')).toBeInTheDocument(); // Total Users
        expect(screen.getByText('75')).toBeInTheDocument(); // Total Children
        expect(screen.getByText('25')).toBeInTheDocument(); // Pregnant Women
        expect(screen.getByText('30')).toBeInTheDocument(); // Adolescents
      });

      // Check if dashboard service is called
      expect(dashboardService.getDashboardData).toHaveBeenCalled();
      expect(dashboardService.subscribe).toHaveBeenCalled();
    });

    it('should display center codes correctly', async () => {
      renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        // Check if center codes are displayed
        expect(screen.getByText('AW-AK968')).toBeInTheDocument();
        expect(screen.getByText('AK-VL969')).toBeInTheDocument();
      });

      // Check if center names are displayed
      expect(screen.getByText('Akkarakunnu Anganwadi Center')).toBeInTheDocument();
      expect(screen.getByText('Veliyanoor Anganwadi Center')).toBeInTheDocument();
    });

    it('should show loading states with meaningful defaults', async () => {
      // Mock loading state
      dashboardService.getDashboardData.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockDashboardData), 1000))
      );

      renderWithRouter(<AdminDashboard />);

      // Check if loading defaults are shown instead of "Loading..."
      expect(screen.getByText('0')).toBeInTheDocument(); // Default for counters
      expect(screen.getByText('85%')).toBeInTheDocument(); // Default for scheme coverage
      expect(screen.getByText('94.5%')).toBeInTheDocument(); // Default for waste management
      
      // Should not show "Loading..." text
      expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    });

    it('should handle real-time data updates', async () => {
      const { rerender } = renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByText('150')).toBeInTheDocument();
      });

      // Simulate data update
      const updatedData = { ...mockDashboardData, totalUsers: 175 };
      dashboardService.getDashboardData.mockResolvedValue(updatedData);

      // Trigger subscription callback
      const subscribeCallback = dashboardService.subscribe.mock.calls[0][0];
      subscribeCallback(updatedData);

      rerender(
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('175')).toBeInTheDocument();
      });
    });
  });

  describe('Input Verification', () => {
    it('should handle empty data gracefully', async () => {
      const emptyData = {
        totalUsers: 0,
        totalChildren: 0,
        totalPregnantWomen: 0,
        totalAdolescents: 0,
        totalNewborns: 0,
        centerStats: {}
      };

      dashboardService.getDashboardData.mockResolvedValue(emptyData);
      dashboardService.getAnganwadiData.mockReturnValue([]);

      renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        // Should show zeros instead of breaking
        expect(screen.getAllByText('0')).toHaveLength(5); // All counters should be 0
      });
    });

    it('should handle invalid data structure', async () => {
      const invalidData = null;

      dashboardService.getDashboardData.mockResolvedValue(invalidData);
      dashboardService.getAnganwadiData.mockReturnValue([]);

      renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        // Should show default values
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('85%')).toBeInTheDocument();
      });

      // Should not crash the component
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });
  });

  describe('Exception Handling', () => {
    it('should handle dashboard service connection failure', async () => {
      // Mock service failure
      dashboardService.getDashboardData.mockRejectedValue(new Error('Connection failed'));
      
      // Spy on console.error to check error handling
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        // Should still render the dashboard with default values
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
      });

      // Should log the error
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Branching', () => {
    it('should handle tab switching functionality', async () => {
      renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
      });

      // Check if tab navigation elements exist
      const overviewTab = screen.getByText('Overview');
      const userManagementTab = screen.getByText('User Management');

      expect(overviewTab).toBeInTheDocument();
      expect(userManagementTab).toBeInTheDocument();

      // Test tab switching
      fireEvent.click(userManagementTab);
      
      // The active tab should change (this depends on implementation)
      await waitFor(() => {
        // Check if the tab is active (you might need to adjust based on your styling)
        expect(userManagementTab).toHaveClass('bg-blue-600'); // or whatever active class you use
      });

      // Switch back to overview
      fireEvent.click(overviewTab);
      
      await waitFor(() => {
        expect(overviewTab).toHaveClass('bg-blue-600');
      });
    });
  });

  describe('Component Lifecycle', () => {
    it('should cleanup subscription on unmount', async () => {
      const unsubscribeMock = vi.fn();
      dashboardService.subscribe.mockReturnValue(unsubscribeMock);

      const { unmount } = renderWithRouter(<AdminDashboard />);

      await waitFor(() => {
        expect(dashboardService.subscribe).toHaveBeenCalled();
      });

      unmount();

      // Should call unsubscribe when component unmounts
      expect(unsubscribeMock).toHaveBeenCalled();
    });

    it('should handle logout functionality', async () => {
      renderWithRouter(<AdminDashboard />);

      const logoutButton = screen.getByText('Logout');
      expect(logoutButton).toBeInTheDocument();

      fireEvent.click(logoutButton);

      // Should navigate to login page
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});