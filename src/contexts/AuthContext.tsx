
import * as React from 'react';
import { toast } from "sonner";

export type UserRole = 'admin' | 'customer' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userEmail: string | null;
  isAdminLocked: boolean;
  currentOtp: string | null;
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, role: UserRole, code: string) => Promise<boolean>;
  logout: () => void;
  requestLoginCode: (email: string) => Promise<boolean>;
  unlockAdmin: (pin: string) => boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  userEmail: null,
  isAdminLocked: true,
  currentOtp: null,
  user: null
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = React.useState<AuthState>(() => {
    // Check if we have saved auth state in localStorage
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        try {
          return JSON.parse(savedAuth);
        } catch (e) {
          return initialState;
        }
      }
    }
    return initialState;
  });

  // Persist auth state changes to localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(authState));
    }
  }, [authState]);

  // In a real app, this would be an API call to your backend
  const requestLoginCode = async (email: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we're just generating a "code" and storing it in localStorage
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem(`loginCode_${email}`, code);
    
    // Store the current OTP in state for display
    setAuthState(prev => ({
      ...prev,
      currentOtp: code
    }));
    
    // Show a toast with the OTP that dismisses after 5 seconds
    toast.success(`Login code for ${email}`, {
      description: `Your verification code is: ${code}`,
      duration: 5000, // Keep the toast visible for 5 seconds
      position: "top-center"
    });
    
    return true;
  };

  const login = async (email: string, role: UserRole, code: string): Promise<boolean> => {
    // In a real app, this would validate the code against your backend
    const storedCode = localStorage.getItem(`loginCode_${email}`);
    
    if (storedCode === code) {
      // Create user object with mock data
      const user: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        role
      };

      setAuthState({
        isAuthenticated: true,
        userRole: role,
        userEmail: email,
        isAdminLocked: role === 'admin' ? true : false,
        currentOtp: null, // Clear the OTP after successful login
        user
      });
      
      // Clear the code after successful login
      localStorage.removeItem(`loginCode_${email}`);
      
      toast.success(`Logged in as ${role}`);
      return true;
    } else {
      toast.error('Invalid verification code');
      return false;
    }
  };

  const logout = () => {
    setAuthState(initialState);
    toast.info('Logged out successfully');
  };

  const unlockAdmin = (pin: string): boolean => {
    if (pin === '1234') {
      setAuthState(prev => ({
        ...prev,
        isAdminLocked: false
      }));
      toast.success('Admin panel unlocked');
      return true;
    } else {
      toast.error('Invalid PIN');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        requestLoginCode,
        unlockAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
