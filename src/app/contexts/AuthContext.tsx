import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'coordinator' | 'lecturer';

export type StaffStatus = 'onleave' | 'adjunct' | 'seconded' | null;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  staffId: string;
  role: UserRole;
  status?: StaffStatus;
  orcidId?: string;
  currentLoad?: number;
  exemptionFlag?: boolean;
  exemptionType?: 'Maternity Leave' | 'Adjunct Status' | 'Borrowed Staff';
}

interface AuthContextType {
  user: User | null;
  token?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, User> = {
  'coordinator@utm.my': {
    id: 'user-coord-1',
    firstName: 'Zatul',
    lastName: 'Alwani',
    email: 'coordinator@utm.my',
    staffId: 'UTM-CRD-002',
    role: 'coordinator',
    currentLoad: 6.0,
  },
  'lecturer@utm.my': {
    id: 'user-lect-1',
    firstName: 'Siti',
    lastName: 'Aminah',
    email: 'lecturer@utm.my',
    staffId: 'UTM-LEC-003',
    role: 'lecturer',
    orcidId: '0000-0002-1234-5678',
    currentLoad: 13.0,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (e) {
          localStorage.removeItem('auth_user');
          setUser(null);
        }
      }

      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS[email];

    if (!mockUser || password !== 'utm123') {
      throw new Error('Invalid credentials');
    }

    // Generate a simple mock JWT-like token (not a real JWT). This keeps the
    // front-end auth flow ready for swapping to a real backend later.
    const mockToken = `mock-token-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    localStorage.setItem('auth_token', mockToken);
    setUser(mockUser);
    setToken(mockToken);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setUser(null);
    setToken(null);
  };

  const updateProfile = (profile: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...profile };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user && !!token,
        isLoading,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
