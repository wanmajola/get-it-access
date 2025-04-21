
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, signupUser, SignupResponse, LoginResponse } from "@/utils/api";

// Define types for our context
type User = {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
}

export interface SignupData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user data on mount
  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        // In a real app, we would use AsyncStorage for React Native
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error retrieving stored user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStoredUser();
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Call login API using the utility function
      const response = await loginUser(email, password);
      
      if (response.success && response.user) {
        // Store user data
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return true;
      } else {
        console.error("Login failed:", response.message || "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Signup function
  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Call signup API using the utility function
      const response = await signupUser({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone_number: userData.phone_number,
        user_password: userData.password,
      });
      
      if (response.success) {
        return true;
      } else {
        console.error("Signup failed:", response.message || "Unknown error");
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
