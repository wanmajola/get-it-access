
/**
 * API utility functions for GetItAll app
 * Handles communication with PHP backend endpoints
 */

// Base URL for API - replace with your actual API endpoint
const API_BASE_URL = "http://your-php-api-url.com"; 

// Types
export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  message?: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}

export interface SignupData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_password: string;
}

/**
 * Handles login API calls
 * @param email - User email
 * @param password - User password
 * @returns LoginResponse object
 */
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email, 
        user_password: password 
      }),
    });

    if (!response.ok) {
      return { success: false, message: `HTTP error ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, message: "Network or server error" };
  }
};

/**
 * Handles user registration API calls
 * @param userData - User registration data
 * @returns SignupResponse object
 */
export const signupUser = async (userData: SignupData): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      return { success: false, message: `HTTP error ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    console.error("Signup API error:", error);
    return { success: false, message: "Network or server error" };
  }
};
