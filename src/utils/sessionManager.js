// Session Management Utility
class SessionManager {
  constructor() {
    this.SESSION_KEY = 'userSession';
    this.SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    this.listeners = [];
  }

  // Create a new session
  createSession(userData) {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      isActive: true,
      sessionId: this.generateSessionId()
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    this.notifyListeners('session_created', sessionData);
    
    console.log('🔐 Session created for:', userData.name);
    return sessionData;
  }

  // Get current session
  getSession() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired
      if (this.isSessionExpired(session)) {
        this.destroySession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      this.destroySession();
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const session = this.getSession();
    return session && session.isActive;
  }

  // Check if session is expired
  isSessionExpired(session) {
    if (!session || !session.timestamp) return true;
    
    const now = Date.now();
    const timeDiff = now - session.timestamp;
    
    return timeDiff > this.SESSION_TIMEOUT;
  }

  // Update session timestamp (refresh session)
  refreshSession() {
    const session = this.getSession();
    if (session) {
      session.timestamp = Date.now();
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      console.log('🔄 Session refreshed');
    }
  }

  // Destroy session
  destroySession() {
    const session = this.getSession();
    
    // Clear all authentication related data
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('authMethod');
    localStorage.removeItem('needsPasswordChange');

    // Clear browser history for dashboard pages to prevent back navigation
    this.clearDashboardHistory();

    this.notifyListeners('session_destroyed', session);
    console.log('🔒 Session destroyed');
  }

  // Clear dashboard history to prevent back button access
  clearDashboardHistory() {
    try {
      // Replace current history entry to prevent back navigation to dashboard
      if (window.location.pathname.includes('dashboard')) {
        window.history.replaceState(null, '', '/login');
      }

      // Clear forward history by pushing multiple login states
      for (let i = 0; i < 10; i++) {
        window.history.pushState(null, '', '/login');
      }
      
      console.log('🧹 Dashboard history cleared');
    } catch (error) {
      console.error('Error clearing dashboard history:', error);
    }
  }

  // Get user role from session
  getUserRole() {
    const session = this.getSession();
    return session?.user?.role || localStorage.getItem('userRole');
  }

  // Get user data from session
  getUserData() {
    const session = this.getSession();
    return session?.user || null;
  }

  // Get authentication token
  getToken() {
    // Try multiple sources for the token
    return localStorage.getItem('authToken') || 
           localStorage.getItem('firebaseToken') || 
           localStorage.getItem('adminToken') || 
           null;
  }

  // Set authentication token
  setToken(token, type = 'authToken') {
    localStorage.setItem(type, token);
    console.log(`🔑 ${type} stored`);
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Add session event listener
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove session event listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of session events
  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Session listener error:', error);
      }
    });
  }

  // Validate session against backend (optional)
  async validateSession() {
    const session = this.getSession();
    if (!session) return false;

    try {
      // You can add backend validation here if needed
      // For now, just check local session validity
      return !this.isSessionExpired(session);
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  // Setup session monitoring (refresh on activity)
  setupSessionMonitoring() {
    // Refresh session on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const refreshOnActivity = () => {
      if (this.isAuthenticated()) {
        this.refreshSession();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, refreshOnActivity, true);
    });

    // Check session validity periodically
    setInterval(() => {
      const session = this.getSession();
      if (session && this.isSessionExpired(session)) {
        console.log('⏰ Session expired, logging out...');
        this.destroySession();
        this.notifyListeners('session_expired', null);
        
        // Redirect to login if on a protected route
        if (window.location.pathname.includes('dashboard')) {
          window.location.href = '/login';
        }
      }
    }, 60000); // Check every minute
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

export default sessionManager;