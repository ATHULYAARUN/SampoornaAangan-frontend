import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Search,
  Utensils,
  Stethoscope,
  Phone,
  ChevronDown,
  Bell
} from 'lucide-react';
import attendanceService from '../../services/attendanceService';
import registrationService from '../../services/registrationService';

const AttendanceManagement = ({ anganwadiCenter = "Demo Center" }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Download attendance sheet as CSV
  const downloadAttendanceSheet = async (format = 'csv') => {
    try {
      setDownloadLoading(true);
      
      if (!attendanceData) {
        alert('No attendance data available to download');
        return;
      }

      // Show immediate feedback
      const formatName = format.toUpperCase();
      console.log(`📥 Starting ${formatName} download...`);

      const currentDate = new Date().toISOString().split('T')[0];
      const centerName = anganwadiCenter.replace(/[^a-zA-Z0-9]/g, '_');
      
      if (format === 'csv') {
        await downloadCSV(currentDate, centerName);
      } else if (format === 'excel') {
        await downloadExcel(currentDate, centerName);
      }

      console.log(`✅ Attendance sheet downloaded successfully as ${formatName}`);
      
      // Show success notification
      setTimeout(() => {
        alert(`✅ Attendance sheet downloaded successfully as ${formatName}!`);
      }, 500);
      
    } catch (error) {
      console.error('❌ Error downloading attendance sheet:', error);
      alert('Failed to download attendance sheet: ' + error.message);
    } finally {
      setDownloadLoading(false);
    }
  };

  // Download as CSV
  const downloadCSV = async (currentDate, centerName) => {
    // Prepare CSV data
    const csvData = [];
    
    // Add header with metadata
    csvData.push(['ATTENDANCE SHEET']);
    csvData.push(['Anganwadi Center:', anganwadiCenter]);
    csvData.push(['Date:', new Date().toLocaleDateString('en-IN')]);
    csvData.push(['Generated:', new Date().toLocaleString('en-IN')]);
    csvData.push(['Total Children:', attendanceData.children.length]);
    csvData.push(['']); // Empty row
    
    // Add summary statistics
    const summary = attendanceService.getAttendanceSummary(attendanceData);
    csvData.push(['SUMMARY STATISTICS']);
    csvData.push(['Present:', summary.present]);
    csvData.push(['Absent:', summary.absent]);
    csvData.push(['Late:', summary.late]);
    csvData.push(['Sick:', summary.sick]);
    csvData.push(['Half Day:', summary.halfDay]);
    csvData.push(['Attendance Rate:', `${summary.attendanceRate}%`]);
    csvData.push(['Nutrition Received:', summary.nutritionCount]);
    csvData.push(['Health Check Done:', summary.healthCheckCount]);
    csvData.push(['']); // Empty row

    // Add attendance data header
    csvData.push([
      'S.No.',
      'Child Name',
      'Age',
      'Gender',
      'Parent Name',
      'Status',
      'Time In',
      'Time Out',
      'Nutrition Received',
      'Health Check Done',
      'Notes'
    ]);

    // Add data rows
    attendanceData.children.forEach((child, index) => {
      csvData.push([
        index + 1,
        child.name || 'Unknown',
        `${child.age || 'N/A'} years`,
        child.gender || 'N/A',
        child.parentName || 'N/A',
        (child.status || 'unmarked').toUpperCase(),
        child.timeIn || 'N/A',
        child.timeOut || 'N/A',
        child.nutritionReceived ? 'YES' : 'NO',
        child.healthCheckDone ? 'YES' : 'NO',
        child.notes || ''
      ]);
    });

    // Convert to CSV string
    const csvContent = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${centerName}_${currentDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download as Excel (HTML table format)
  const downloadExcel = async (currentDate, centerName) => {
    const summary = attendanceService.getAttendanceSummary(attendanceData);
    
    // Create HTML table for Excel
    let htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; }
            .header { background-color: #f0f0f0; font-weight: bold; text-align: center; }
            .summary { background-color: #e6f3ff; }
            .present { background-color: #d4edda; }
            .absent { background-color: #f8d7da; }
            .late { background-color: #fff3cd; }
            .sick { background-color: #e2e3e5; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>ATTENDANCE SHEET</h1>
          <table>
            <tr><td><strong>Anganwadi Center:</strong></td><td>${anganwadiCenter}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${new Date().toLocaleDateString('en-IN')}</td></tr>
            <tr><td><strong>Generated:</strong></td><td>${new Date().toLocaleString('en-IN')}</td></tr>
            <tr><td><strong>Total Children:</strong></td><td>${attendanceData.children.length}</td></tr>
          </table>
          
          <h2>SUMMARY STATISTICS</h2>
          <table class="summary">
            <tr><td>Present</td><td>${summary.present}</td></tr>
            <tr><td>Absent</td><td>${summary.absent}</td></tr>
            <tr><td>Late</td><td>${summary.late}</td></tr>
            <tr><td>Sick</td><td>${summary.sick}</td></tr>
            <tr><td>Half Day</td><td>${summary.halfDay}</td></tr>
            <tr><td>Attendance Rate</td><td>${summary.attendanceRate}%</td></tr>
            <tr><td>Nutrition Received</td><td>${summary.nutritionCount}</td></tr>
            <tr><td>Health Check Done</td><td>${summary.healthCheckCount}</td></tr>
          </table>
          
          <h2>ATTENDANCE DETAILS</h2>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Child Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Parent Name</th>
                <th>Status</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Nutrition</th>
                <th>Health Check</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>`;

    attendanceData.children.forEach((child, index) => {
      const statusClass = child.status || 'unmarked';
      htmlContent += `
        <tr class="${statusClass}">
          <td>${index + 1}</td>
          <td>${child.name || 'Unknown'}</td>
          <td>${child.age || 'N/A'} years</td>
          <td>${child.gender || 'N/A'}</td>
          <td>${child.parentName || 'N/A'}</td>
          <td>${(child.status || 'unmarked').toUpperCase()}</td>
          <td>${child.timeIn || 'N/A'}</td>
          <td>${child.timeOut || 'N/A'}</td>
          <td>${child.nutritionReceived ? 'YES' : 'NO'}</td>
          <td>${child.healthCheckDone ? 'YES' : 'NO'}</td>
          <td>${child.notes || ''}</td>
        </tr>`;
    });

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>`;

    // Create and download file
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${centerName}_${currentDate}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Load today's attendance data
  const loadTodaysAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('📅 Loading attendance for:', anganwadiCenter);
      const response = await attendanceService.getTodaysAttendance(anganwadiCenter);
      console.log('📊 Attendance data received:', response);
      const formattedData = attendanceService.formatAttendanceForDisplay(response.data);
      setAttendanceData(formattedData);
    } catch (err) {
      console.error('💥 Failed to load attendance:', err);
      console.log('🔄 Loading real child data from registration service...');
      
      try {
        // Get real children data from registration service
        // Try both the provided center name and common variations
        let childrenResponse;
        console.log(`🔍 Searching for children in center: "${anganwadiCenter}"`);
        
        try {
          childrenResponse = await registrationService.getChildren({
            anganwadiCenter: anganwadiCenter,
            status: 'active',
            limit: 50 // Get up to 50 children
          });
        } catch (firstError) {
          console.log('🔄 Primary search failed, trying alternative center name formats...', firstError.message);
          // If no children found, try common variations
          const centerVariations = [
            'Akkarakunnu Anganwadi',
            'Akkarakunnu',
            'Demo Anganwadi Center'
          ].filter(name => name !== anganwadiCenter); // Don't try the same name twice
          
          for (const centerName of centerVariations) {
            try {
              console.log(`🔍 Trying center name: "${centerName}"`);
              childrenResponse = await registrationService.getChildren({
                anganwadiCenter: centerName,
                status: 'active',
                limit: 50
              });
              
              if (childrenResponse.data?.children?.length > 0) {
                console.log(`✅ Found ${childrenResponse.data.children.length} children with center name: "${centerName}"`);
                break;
              }
            } catch (variationError) {
              console.log(`❌ No children found for center: "${centerName}"`, variationError.message);
            }
          }
          
          // If still no response, create empty response
          if (!childrenResponse) {
            console.log('❌ No children found in any center variations');
            childrenResponse = { data: { children: [] } };
          }
        }
        
        console.log('👶 Real children data received:', childrenResponse);
        
        const realChildren = childrenResponse.data?.children || [];
        
        // Convert real child data to attendance format
        const attendanceChildren = realChildren.map(child => ({
          childId: child._id || child.id,
          name: child.name,
          age: child.age,
          gender: child.gender,
          parentName: child.parentName || child.motherName || child.fatherName || 'Not specified',
          status: 'absent', // Default to absent, user can mark present
          timeIn: null,
          timeOut: null,
          nutritionReceived: false,
          healthCheckDone: false,
          notes: '',
          phoneNumber: child.phoneNumber || child.motherPhoneNumber || child.fatherPhoneNumber || 'Not available',
          address: child.address || 'Not specified',
          dateOfBirth: child.dateOfBirth,
          registrationDate: child.createdAt
        }));

        const realAttendanceData = {
          date: new Date().toISOString().split('T')[0],
          center: anganwadiCenter,
          children: attendanceChildren
        };
        
        const formattedRealData = attendanceService.formatAttendanceForDisplay(realAttendanceData);
        setAttendanceData(formattedRealData);
        setError(realChildren.length === 0 ? 
          '📝 No children found for this Anganwadi center. Please register children first.' : 
          null
        );
        
        console.log('✅ Successfully loaded real child data for attendance');
        
      } catch (childDataError) {
        console.error('❌ Failed to load real child data:', childDataError);
        
        // Fall back to empty data if both attendance and children APIs fail
        const emptyData = {
          date: new Date().toISOString().split('T')[0],
          center: anganwadiCenter,
          children: []
        };
        
        const formattedEmptyData = attendanceService.formatAttendanceForDisplay(emptyData);
        setAttendanceData(formattedEmptyData);
        setError('❌ Unable to load attendance or child data. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [anganwadiCenter]);

  useEffect(() => {
    loadTodaysAttendance();
  }, [loadTodaysAttendance]);

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadMenu && !event.target.closest('.download-menu-container')) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDownloadMenu]);

  // Mark attendance for individual child
  const handleMarkAttendance = async (childId, status, timeIn = null) => {
    try {
      const child = attendanceData.children.find(c => c.childId === childId);
      if (!child) return;

      await attendanceService.markAttendance({
        childId,
        childName: child.name,
        anganwadiCenter,
        status,
        timeIn: timeIn || (status === 'present' || status === 'late' ? 
          new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : null)
      });

      // Reload attendance data
      await loadTodaysAttendance();
    } catch (err) {
      alert(`Failed to mark attendance: ${err.message}`);
    }
  };

  // Bulk mark attendance
  const handleBulkMarkAttendance = async (status) => {
    try {
      setBulkLoading(true);
      await attendanceService.bulkMarkAttendance(anganwadiCenter, status);
      await loadTodaysAttendance();
      alert(`Successfully marked all children as ${status}`);
    } catch (err) {
      alert(`Failed to bulk mark attendance: ${err.message}`);
    } finally {
      setBulkLoading(false);
    }
  };

  // Update attendance details (nutrition, health check, notes)
  const handleUpdateDetails = async (childId, updates) => {
    try {
      await attendanceService.updateAttendanceDetails(childId, anganwadiCenter, updates);
      await loadTodaysAttendance();
    } catch (err) {
      alert(`Failed to update details: ${err.message}`);
    }
  };

  // Filter children based on search term and status
  const filteredChildren = attendanceData?.children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.parentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || child.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  // Get summary statistics
  const summary = attendanceData ? attendanceService.getAttendanceSummary(attendanceData) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (error && !attendanceData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <XCircle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Failed to load attendance</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadTodaysAttendance}
              className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daily Attendance</h2>
          <p className="text-gray-600">
            {attendanceData?.date && new Date(attendanceData.date).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => loadTodaysAttendance()}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <Calendar className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <div className="relative download-menu-container">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={downloadLoading || !attendanceData}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                downloadLoading || !attendanceData
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{downloadLoading ? 'Downloading...' : 'Download Sheet'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Download Format Menu */}
            {showDownloadMenu && !downloadLoading && attendanceData && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => {
                      downloadAttendanceSheet('csv');
                      setShowDownloadMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-green-600" />
                    <span>Download as CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      downloadAttendanceSheet('excel');
                      setShowDownloadMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    <span>Download as Excel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information Banner */}
      {!error && attendanceData && attendanceData.children && attendanceData.children.length === 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start">
            <Bell className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-orange-800 font-medium">No Children Registered</h4>
              <p className="text-orange-700 text-sm mt-1">
                No children found for this Anganwadi center. Please register children first to mark attendance.
              </p>
            </div>
          </div>
        </div>
      )}
          <div className="relative download-menu-container">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={downloadLoading || !attendanceData}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                downloadLoading || !attendanceData
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{downloadLoading ? 'Downloading...' : 'Download Sheet'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Download Format Menu */}
            {showDownloadMenu && !downloadLoading && attendanceData && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => {
                      downloadAttendanceSheet('csv');
                      setShowDownloadMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-green-600" />
                    <span>Download as CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      downloadAttendanceSheet('excel');
                      setShowDownloadMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    <span>Download as Excel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    
      
  

      {/* Summary Statistics */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Children</p>
                <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600">{summary.totalPresent}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">{summary.attendanceRate}%</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search children..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="sick">Sick</option>
              <option value="half-day">Half Day</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBulkMarkAttendance('present')}
              disabled={bulkLoading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {bulkLoading ? 'Processing...' : 'Mark All Present'}
            </button>
            <button
              onClick={() => handleBulkMarkAttendance('absent')}
              disabled={bulkLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {bulkLoading ? 'Processing...' : 'Mark All Absent'}
            </button>
          </div>
        </div>
      </div>

      {/* Children List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Children Attendance ({filteredChildren.length} of {attendanceData?.children.length || 0})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {filteredChildren.map((child, index) => (
              <motion.div
                key={child.childId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {child.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{child.name}</h4>
                      <p className="text-sm text-gray-600">{child.displayAge} • {child.gender}</p>
                      {child.parentName && (
                        <p className="text-xs text-gray-500">Parent: {child.parentName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${child.statusColor}`}>
                      {child.statusIcon} {child.status}
                    </span>

                    {/* Time In */}
                    {child.timeIn && (
                      <span className="text-sm text-gray-600">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {child.timeIn}
                      </span>
                    )}

                    {/* Nutrition and Health Check Indicators */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateDetails(child.childId, {
                          nutritionReceived: !child.nutritionReceived
                        })}
                        disabled={!child.canMarkNutrition}
                        className={`p-1 rounded ${
                          child.nutritionReceived 
                            ? 'bg-orange-100 text-orange-600' 
                            : child.canMarkNutrition 
                              ? 'bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-600' 
                              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        }`}
                        title="Nutrition received"
                      >
                        <Utensils className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateDetails(child.childId, {
                          healthCheckDone: !child.healthCheckDone
                        })}
                        disabled={!child.canMarkHealthCheck}
                        className={`p-1 rounded ${
                          child.healthCheckDone 
                            ? 'bg-purple-100 text-purple-600' 
                            : child.canMarkHealthCheck 
                              ? 'bg-gray-100 text-gray-400 hover:bg-purple-100 hover:text-purple-600' 
                              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        }`}
                        title="Health check done"
                      >
                        <Stethoscope className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-1">
                      {child.status === 'absent' && (
                        <>
                          <button
                            onClick={() => handleMarkAttendance(child.childId, 'present')}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs hover:bg-green-200"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(child.childId, 'late')}
                            className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs hover:bg-yellow-200"
                          >
                            Late
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(child.childId, 'sick')}
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs hover:bg-purple-200"
                          >
                            Sick
                          </button>
                        </>
                      )}
                      {['present', 'late', 'sick'].includes(child.status) && (
                        <button
                          onClick={() => handleMarkAttendance(child.childId, 'absent')}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200"
                        >
                          Absent
                        </button>
                      )}
                    </div>

                    {/* Contact Parent Button */}
                    {child.parentPhone && (
                      <button
                        onClick={() => window.open(`tel:${child.parentPhone}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Call parent"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Notes Section */}
                {child.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{child.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredChildren.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No children found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Information */}
      {error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <Bell className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-blue-800 font-medium">Real Child Data</h4>
              <p className="text-blue-700 text-sm mt-1">
                {error.includes('📝') ? error.replace('📝 ', '') : 'Showing real children registered in this Anganwadi center. Click on status buttons to mark attendance.'}
              </p>
            </div>
          </div>
        </div>
      )}
    
    </>
  );
};

export default AttendanceManagement;