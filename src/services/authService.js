import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  googleProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from '../config/firebase';

// API base URL - use relative path for Vite proxy
const API_BASE_URL = '/api';

class AuthService {
  // Register user with Firebase and backend
  async registerUser(userData) {
    try {
      const { name, email, password, role, phone, address, roleSpecificData } = userData;
      
      console.log('📝 Starting registration process...', { name, email, role });
      
      let firebaseUser = null;
      let idToken = null;
      
      // Try Firebase registration first
      try {
        console.log('🔥 Attempting Firebase registration...');
        
        // 1. Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
        
        // 2. Update Firebase profile
        await updateProfile(firebaseUser, {
          displayName: name
        });
        
        // 3. Get Firebase ID token
        idToken = await firebaseUser.getIdToken();
        
        console.log('✅ Firebase registration successful');
        
      } catch (firebaseError) {
        console.warn('⚠️ Firebase registration failed:', firebaseError.message);
        console.log('📝 Continuing with direct registration...');
      }
      
      // 4. Register user in backend database (with or without Firebase)
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken && { 'Authorization': `Bearer ${idToken}` })
        },
        body: JSON.stringify({
          name,
          email,
          password, // Backend needs this for validation
          role,
          phone: phone || '',
          address,
          roleSpecificData
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // If backend registration fails but Firebase succeeded, clean up Firebase user
        if (firebaseUser) {
          try {
            await firebaseUser.delete();
            console.log('🧹 Cleaned up Firebase user after backend failure');
          } catch (cleanupError) {
            console.warn('⚠️ Failed to cleanup Firebase user:', cleanupError.message);
          }
        }
        
        // Show detailed error message
        let errorMessage = result.message || 'Registration failed';
        if (result.errors && Array.isArray(result.errors)) {
          errorMessage = result.errors.map(err => err.message).join(', ');
        }
        throw new Error(errorMessage);
      }
      
      console.log('✅ Registration completed successfully');
      
      return {
        success: true,
        user: firebaseUser,
        data: result.data,
        message: 'Registration successful',
        hasFirebase: !!firebaseUser
      };
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }
  
  // Login user with Firebase or direct credentials
  async loginUser(email, password, role) {
    try {
      let result = null;
      let firebaseUser = null;
      let idToken = null;
      let authMethod = 'unknown';

      console.log('🔐 Starting login process for:', email, 'with role:', role);

      // Try Firebase authentication first
      try {
        console.log('🔥 Attempting Firebase authentication...');
        
        // 1. Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
        
        // 2. Get Firebase ID token
        idToken = await firebaseUser.getIdToken();
        
        // 3. Verify with backend using Firebase token
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken,
            role
          })
        });
        
        result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Firebase login failed');
        }
        
        authMethod = 'firebase';
        console.log('✅ Firebase authentication successful');
        
      } catch (firebaseError) {
        console.warn('⚠️ Firebase authentication failed, trying direct login:', firebaseError.message);
        
        // Reset any Firebase state
        if (auth.currentUser) {
          try {
            await signOut(auth);
          } catch (signOutError) {
            console.warn('Warning: Could not sign out from Firebase:', signOutError.message);
          }
        }
        
        // If Firebase fails, try direct authentication with backend
        console.log('🔑 Attempting direct authentication...');
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            role
          })
        });
        
        result = await response.json();
        console.log('📊 Direct auth response:', result);
        
        if (!response.ok) {
          console.error('❌ Direct authentication failed:', result);
          throw new Error(result.message || 'Login failed');
        }
        
        authMethod = 'direct';
        console.log('✅ Direct authentication successful');
      }
      
      // Store user data in localStorage
      localStorage.setItem('userRole', result.data.role);
      localStorage.setItem('userName', result.data.user.name);
      localStorage.setItem('userEmail', result.data.user.email);
      localStorage.setItem('userId', result.data.user.id);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authMethod', result.data.authMethod || authMethod);
      
      // Store appropriate token
      if (result.data.firebaseToken) {
        localStorage.setItem('firebaseToken', result.data.firebaseToken);
      }
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token);
      }
      
      // Check if password change is needed
      if (result.data.needsPasswordChange) {
        localStorage.setItem('needsPasswordChange', 'true');
      }
      
      return {
        success: true,
        user: firebaseUser,
        data: result.data,
        dashboard: result.data.dashboard,
        authMethod: result.data.authMethod,
        needsPasswordChange: result.data.needsPasswordChange
      };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  }
  
  // Admin login (separate from Firebase)
  async loginAdmin(identifier, password) {
    try {
      console.log('🔐 Admin login attempt:', { identifier });
      
      // Call the backend admin login API
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password
        })
      });

      const result = await response.json();
      console.log('Admin login response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Admin login failed');
      }

      if (result.success) {
        // Store admin data in localStorage
        localStorage.setItem('userRole', 'super-admin');
        localStorage.setItem('userName', result.data.admin.name);
        localStorage.setItem('userEmail', result.data.admin.email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('adminToken', result.data.token);
        
        console.log('✅ Admin login successful');
        
        return {
          success: true,
          data: result.data,
          dashboard: '/admin-dashboard'
        };
      } else {
        throw new Error(result.message || 'Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  }
  
  // Logout user
  async logout() {
    try {
      // Sign out from Firebase (if user is signed in)
      if (auth.currentUser) {
        await signOut(auth);
      }
      
      // Clear localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('firebaseToken');
      localStorage.removeItem('adminToken');
      
      return { success: true };
      
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  }
  
  // Get current user data
  async getCurrentUser() {
    try {
      const firebaseUser = auth.currentUser;
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userRole = localStorage.getItem('userRole');
      
      if (!isAuthenticated || !userRole) {
        return null;
      }
      
      if (userRole === 'super-admin') {
        // Admin user
        return {
          role: userRole,
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('userEmail'),
          isAdmin: true
        };
      } else if (firebaseUser) {
        // Firebase user
        const idToken = await firebaseUser.getIdToken();
        
        // Get user data from backend
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          return result.data.user;
        }
      }
      
      return null;
      
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
  
  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  
  // Get user role
  getUserRole() {
    return localStorage.getItem('userRole');
  }
  
  // Get Firebase ID token
  async getIdToken() {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Get ID token error:', error);
      return null;
    }
  }
  
  // Get admin JWT token
  getAdminToken() {
    return localStorage.getItem('adminToken');
  }

  // Google Sign-in
  async signInWithGoogle(role) {
    try {
      console.log('🔥 Starting Google Sign-in for role:', role);
      
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('✅ Google popup authentication successful:', user.email);
      
      // Get Firebase ID token
      const idToken = await user.getIdToken();
      console.log('🔑 Firebase ID token obtained');
      
      // Check if user exists in backend
      console.log('📡 Sending request to backend...');
      const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken,
          role,
          userData: {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          }
        })
      });
      
      console.log('📡 Backend response status:', response.status);
      const data = await response.json();
      console.log('📡 Backend response data:', data);
      
      if (!response.ok) {
        console.error('❌ Backend rejected Google login:', data);
        throw new Error(data.message || 'Google login failed');
      }
      
      // Store user data in localStorage
      localStorage.setItem('userRole', data.data.role);
      localStorage.setItem('userName', data.data.user.name);
      localStorage.setItem('userEmail', data.data.user.email);
      localStorage.setItem('userId', data.data.user.id);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authMethod', 'google');
      localStorage.setItem('firebaseToken', idToken);
      
      console.log('✅ Google Sign-in completed successfully');
      
      return {
        success: true,
        user: user,
        data: data.data,
        dashboard: data.data.dashboard,
        authMethod: 'google',
        isNewUser: data.data.isNewUser
      };
      
    } catch (error) {
      console.error('❌ Google Sign-in error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      // Sign out from Firebase if there was an error
      if (auth.currentUser) {
        try {
          await signOut(auth);
          console.log('🧹 Cleaned up Firebase session after error');
        } catch (signOutError) {
          console.warn('Warning: Could not sign out from Firebase:', signOutError.message);
        }
      }
      
      throw new Error(error.message || 'Google Sign-in failed');
    }
  }

  // Send password reset email
  async sendPasswordReset(email) {
    try {
      console.log('📧 Sending password reset email to:', email);
      
      await sendPasswordResetEmail(auth, email);
      
      console.log('✅ Password reset email sent successfully');
      
      return {
        success: true,
        message: 'Password reset email sent successfully. Please check your inbox.'
      };
      
    } catch (error) {
      console.error('❌ Password reset error:', error);
      
      let errorMessage = 'Failed to send password reset email';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
  }

  // Send email verification
  async sendEmailVerification() {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      if (user.emailVerified) {
        return {
          success: true,
          message: 'Email is already verified'
        };
      }
      
      await sendEmailVerification(user);
      
      return {
        success: true,
        message: 'Verification email sent successfully. Please check your inbox.'
      };
      
    } catch (error) {
      console.error('❌ Email verification error:', error);
      throw new Error(error.message || 'Failed to send verification email');
    }
  }

  // Change password for workers
  async changePassword(currentPassword, newPassword) {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Password change failed');
      }

      // Clear the needsPasswordChange flag
      localStorage.removeItem('needsPasswordChange');

      return {
        success: true,
        message: result.message
      };

    } catch (error) {
      console.error('❌ Password change error:', error);
      throw new Error(error.message || 'Password change failed');
    }
  }
}

// Create and export a single instance
const authService = new AuthService();
export default authService;
