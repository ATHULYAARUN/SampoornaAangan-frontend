import React, { useState, useEffect } from 'react';
import { AlertCircle, Users, Clock, Check, X, BookOpen, Heart, Calendar, CheckCircle2, XCircle, Clock3, UserCheck } from 'lucide-react';

const AnganwadiWorkerAttendanceTest = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [attendanceStats, setAttendanceStats] = useState({});
  const [workerInfo, setWorkerInfo] = useState({});
  const [selectedWorker, setSelectedWorker] = useState('mohanakumari'); // Default to Mohanakumari

  // Mock worker data based on actual database
  const workers = {
    mohanakumari: {
      name: 'Mohanakumari',
      email: 'athulyaarunu@gmail.com',
      role: 'anganwadi-worker',
      roleSpecificData: {
        anganwadiCenter: {
          name: 'Akkarakunnu Anganwadi',
          code: 'AWC09001'
        }
      }
    },
    athulya: {
      name: 'Athulya Arun',
      email: 'athulyaanal@gmail.com',
      role: 'anganwadi-worker',
      roleSpecificData: {
        anganwadiCenter: {
          name: 'Veliyanoor Anganwadi',
          code: 'AWC09002'
        }
      }
    }
  };

  const currentUser = workers[selectedWorker];

  const fetchChildrenForAttendance = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Mock data based on actual database assignments
      let mockChildren = [];
      
      if (selectedWorker === 'mohanakumari') {
        mockChildren = [
          {
            _id: '1',
            name: 'Akhil',
            age: 5,
            gender: 'male',
            parentName: 'Rama Krishna',
            parentPhone: '9876543210',
            attendanceStatus: 'not-marked',
            attendanceMarked: false,
            nutritionReceived: false,
            healthCheckDone: false,
            timeIn: null,
            timeOut: null
          },
          {
            _id: '2',
            name: 'Athulya',
            age: 3,
            gender: 'female',
            parentName: 'Rama Krishna',
            parentPhone: '9876543210',
            attendanceStatus: 'not-marked',
            attendanceMarked: false,
            nutritionReceived: false,
            healthCheckDone: false,
            timeIn: null,
            timeOut: null
          }
        ];
      } else if (selectedWorker === 'athulya') {
        mockChildren = [
          {
            _id: '3',
            name: 'Daksha S',
            age: 4,
            gender: 'female',
            parentName: 'Suresh S',
            parentPhone: '9876543221',
            attendanceStatus: 'not-marked',
            attendanceMarked: false,
            nutritionReceived: false,
            healthCheckDone: false,
            timeIn: null,
            timeOut: null
          }
        ];
      }
      
      setChildren(mockChildren);
      setWorkerInfo({
        anganwadiCenter: currentUser.roleSpecificData.anganwadiCenter.name,
        workerName: currentUser.name,
        totalChildren: mockChildren.length,
        attendanceMarked: 0
      });
      
      const stats = calculateAttendanceStats(mockChildren);
      setAttendanceStats(stats);
      
    } catch (error) {
      console.error('Error fetching children:', error);
      setError('Failed to load children data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildrenForAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorker]);

  const calculateAttendanceStats = (childrenData) => {
    const total = childrenData.length;
    const present = childrenData.filter(child => child.attendanceStatus === 'present').length;
    const absent = childrenData.filter(child => child.attendanceStatus === 'absent').length;
    const late = childrenData.filter(child => child.attendanceStatus === 'late').length;
    const marked = childrenData.filter(child => child.attendanceMarked).length;
    
    return {
      total,
      present,
      absent,
      late,
      marked,
      unmarked: total - marked,
      attendanceRate: total > 0 ? Math.round(((present + late) / total) * 100) : 0
    };
  };

  const markAttendance = async (childId, status, additionalData = {}) => {
    try {
      const timeIn = status === 'present' || status === 'late' ? 
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : null;

      // Update local state immediately for better UX
      setChildren(prev => prev.map(child => 
        child._id === childId 
          ? { 
              ...child, 
              attendanceStatus: status, 
              attendanceMarked: true,
              timeIn: timeIn,
              ...additionalData
            }
          : child
      ));

      // Simulate API call success
      setSuccess(`✅ Attendance marked as ${status} for child successfully!`);
      setTimeout(() => setSuccess(''), 3000);

      // Log the action for demonstration
      console.log(`📋 Attendance Action:`, {
        worker: currentUser.name,
        email: currentUser.email,
        anganwadi: currentUser.roleSpecificData.anganwadiCenter.name,
        childId,
        status,
        timeIn,
        timestamp: new Date().toISOString(),
        ...additionalData
      });

      // Recalculate stats
      const updatedChildren = children.map(child => 
        child._id === childId 
          ? { ...child, attendanceStatus: status, attendanceMarked: true, ...additionalData }
          : child
      );
      const stats = calculateAttendanceStats(updatedChildren);
      setAttendanceStats(stats);

    } catch (error) {
      console.error('Error marking attendance:', error);
      setError('Failed to mark attendance. Please try again.');
      setTimeout(() => setError(''), 3000);
      
      // Revert local state changes
      setChildren(prev => prev.map(child => 
        child._id === childId 
          ? { ...child, attendanceStatus: 'not-marked', attendanceMarked: false }
          : child
      ));
    }
  };

  const markNutritionReceived = (childId, received) => {
    setChildren(prev => prev.map(child => 
      child._id === childId 
        ? { ...child, nutritionReceived: received }
        : child
    ));
    
    console.log(`🍽️ Nutrition Status Update:`, {
      worker: currentUser.name,
      childId,
      nutritionReceived: received,
      timestamp: new Date().toISOString()
    });
  };

  const markHealthCheckDone = (childId, done) => {
    setChildren(prev => prev.map(child => 
      child._id === childId 
        ? { ...child, healthCheckDone: done }
        : child
    ));
    
    console.log(`🏥 Health Check Update:`, {
      worker: currentUser.name,
      childId,
      healthCheckDone: done,
      timestamp: new Date().toISOString()
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50 border-green-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      case 'late': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'sick': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'half-day': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock3 className="w-4 h-4" />;
      case 'sick': return <Heart className="w-4 h-4" />;
      case 'half-day': return <UserCheck className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Worker Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              🧪 Attendance System Test
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedWorker('mohanakumari')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedWorker === 'mohanakumari'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👩 Mohanakumari
              </button>
              <button
                onClick={() => setSelectedWorker('athulya')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedWorker === 'athulya'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👩 Athulya Arun
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🔐 Current Worker</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-blue-700">Name</p>
                <p className="font-medium text-blue-900">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Email</p>
                <p className="font-medium text-blue-900">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Anganwadi Center</p>
                <p className="font-medium text-blue-900">{currentUser.roleSpecificData.anganwadiCenter.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Attendance Management
              </h2>
              <p className="text-gray-600">
                {workerInfo.anganwadiCenter} • {workerInfo.workerName}
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{attendanceStats.total}</div>
                <div className="text-sm text-gray-500">Total Children</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{attendanceStats.attendanceRate}%</div>
                <div className="text-sm text-gray-500">Attendance Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Present</p>
                <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Absent</p>
                <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</p>
              </div>
              <Clock3 className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Marked</p>
                <p className="text-2xl font-bold text-blue-600">{attendanceStats.marked}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Unmarked</p>
                <p className="text-2xl font-bold text-gray-600">{attendanceStats.unmarked}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-800">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Children Attendance List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Children Attendance</h2>
            <p className="text-gray-600 mt-1">Mark attendance for each child in your anganwadi</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nutrition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health Check
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children.map((child) => (
                  <tr key={child._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${child.gender === 'male' ? 'bg-blue-100' : 'bg-pink-100'} flex items-center justify-center`}>
                          <span className={`text-sm font-medium ${child.gender === 'male' ? 'text-blue-600' : 'text-pink-600'}`}>
                            {child.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{child.name}</div>
                          <div className="text-sm text-gray-500">{child.age} years • {child.gender}</div>
                          <div className="text-xs text-gray-400">{child.parentName}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(child.attendanceStatus)}`}>
                        {getStatusIcon(child.attendanceStatus)}
                        <span className="ml-1 capitalize">{child.attendanceStatus === 'not-marked' ? 'Not Marked' : child.attendanceStatus}</span>
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {child.timeIn ? (
                        <div>
                          <div>In: {child.timeIn}</div>
                          {child.timeOut && <div>Out: {child.timeOut}</div>}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => markAttendance(child._id, 'present')}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Present
                        </button>
                        <button
                          onClick={() => markAttendance(child._id, 'absent')}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Absent
                        </button>
                        <button
                          onClick={() => markAttendance(child._id, 'late')}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Late
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => markNutritionReceived(child._id, !child.nutritionReceived)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          child.nutritionReceived 
                            ? 'text-green-800 bg-green-100 border-green-200' 
                            : 'text-gray-600 bg-gray-100 border-gray-200'
                        }`}
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        {child.nutritionReceived ? 'Given' : 'Not Given'}
                      </button>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => markHealthCheckDone(child._id, !child.healthCheckDone)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          child.healthCheckDone 
                            ? 'text-blue-800 bg-blue-100 border-blue-200' 
                            : 'text-gray-600 bg-gray-100 border-gray-200'
                        }`}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {child.healthCheckDone ? 'Done' : 'Pending'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🧪 Test Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Database Assignments:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Mohanakumari → Akkarakunnu Anganwadi (Akhil, Athulya)</li>
                <li>• Athulya Arun → Veliyanoor Anganwadi (Daksha S)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Actions Logged:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Attendance marking</li>
                <li>• Nutrition status updates</li>
                <li>• Health check completions</li>
                <li>• Check browser console for logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnganwadiWorkerAttendanceTest;