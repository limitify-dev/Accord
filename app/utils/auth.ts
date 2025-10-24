import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  email: string;
  name?: string;
  token: string;
}

export class AuthService {
  private static TOKEN_KEY = "userToken";
  private static EMAIL_KEY = "userEmail";
  private static NAME_KEY = "userName";

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);
      return token !== null;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    }
  }

  // Get current user data
  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);
      const email = await AsyncStorage.getItem(this.EMAIL_KEY);
      const name = await AsyncStorage.getItem(this.NAME_KEY);

      if (!token || !email) {
        return null;
      }

      return {
        token,
        email,
        name: name || undefined,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // Sign in user
  static async signIn(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call - replace with your actual API endpoint
      // For demo purposes, we'll accept any email/password combination
      if (!email.includes("@") || password.length < 6) {
        return { success: false, error: "Invalid email or password" };
      }

      // Simulate API response
      const mockToken = `token_${Date.now()}`;

      await AsyncStorage.setItem(this.TOKEN_KEY, mockToken);
      await AsyncStorage.setItem(this.EMAIL_KEY, email);

      return { success: true };
    } catch (error) {
      console.error("Error signing in:", error);
      return { success: false, error: "Sign in failed. Please try again." };
    }
  }

  // Sign up user
  static async signUp(
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call - replace with your actual API endpoint
      if (!email.includes("@") || password.length < 6 || !fullName.trim()) {
        return { success: false, error: "Please fill in all fields correctly" };
      }

      // Simulate API response
      const mockToken = `token_${Date.now()}`;

      await AsyncStorage.setItem(this.TOKEN_KEY, mockToken);
      await AsyncStorage.setItem(this.EMAIL_KEY, email);
      await AsyncStorage.setItem(this.NAME_KEY, fullName);

      return { success: true };
    } catch (error) {
      console.error("Error signing up:", error);
      return { success: false, error: "Sign up failed. Please try again." };
    }
  }

  // Sign out user
  static async signOut(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.TOKEN_KEY,
        this.EMAIL_KEY,
        this.NAME_KEY,
      ]);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // Reset password (placeholder)
  static async resetPassword(
    email: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call
      if (!email.includes("@")) {
        return { success: false, error: "Please enter a valid email address" };
      }

      // Simulate success
      return { success: true };
    } catch (error) {
      console.error("Error resetting password:", error);
      return {
        success: false,
        error: "Reset password failed. Please try again.",
      };
    }
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  static validatePassword(password: string): {
    isValid: boolean;
    message?: string;
  } {
    if (password.length < 6) {
      return {
        isValid: false,
        message: "Password must be at least 6 characters long",
      };
    }

    if (password.length < 8) {
      return {
        isValid: true,
        message: "Consider using a longer password for better security",
      };
    }

    // Add more validation rules as needed
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumbers) {
      return { isValid: true };
    }

    return {
      isValid: true,
      message:
        "Consider including uppercase, lowercase, and numbers for a stronger password",
    };
  }
}

// Auth state management (simple version)
export class AuthState {
  private static listeners: ((user: User | null) => void)[] = [];
  private static currentUser: User | null = null;

  static addListener(listener: (user: User | null) => void) {
    this.listeners.push(listener);
  }

  static removeListener(listener: (user: User | null) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  static async initialize() {
    this.currentUser = await AuthService.getCurrentUser();
    this.notifyListeners();
  }

  static async updateUser(user: User | null) {
    this.currentUser = user;
    this.notifyListeners();
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  private static notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}
