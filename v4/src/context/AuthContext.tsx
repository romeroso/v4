import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Sample user data for demo purposes
const DEMO_USER: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profilePicture: 'https://randomuser.me/api/portraits/people/1.jpg',
  dateOfBirth: '1990-05-15',
  gender: 'other',
  height: 175,
  weight: 70
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem('healthSyncUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call to authenticate
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll accept any email/password and use our demo user
    setCurrentUser(DEMO_USER);
    localStorage.setItem('healthSyncUser', JSON.stringify(DEMO_USER));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call to create a new account
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user based on provided details
    const newUser: User = {
      ...DEMO_USER,
      id: Math.random().toString(36).substr(2, 9),
      name,
      email
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('healthSyncUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthSyncUser');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};