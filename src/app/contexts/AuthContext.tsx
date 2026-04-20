import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  resetPassword: (resetToken: string, newPassword: string) => boolean;
  generateResetToken: (username: string) => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials - change these after first loginn
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("dcpAdminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Initialize credentials if not set
    if (!localStorage.getItem("dcpAdminUsername")) {
      localStorage.setItem("dcpAdminUsername", DEFAULT_USERNAME);
      localStorage.setItem("dcpAdminPassword", btoa(DEFAULT_PASSWORD)); // Base64 encode for basic obfuscation
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const storedUsername = localStorage.getItem("dcpAdminUsername");
    const storedPassword = localStorage.getItem("dcpAdminPassword");

    if (username === storedUsername && btoa(password) === storedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("dcpAdminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dcpAdminAuth");
  };

  const changePassword = (
    oldPassword: string,
    newPassword: string,
  ): boolean => {
    const storedPassword = localStorage.getItem("dcpAdminPassword");

    if (btoa(oldPassword) === storedPassword) {
      localStorage.setItem("dcpAdminPassword", btoa(newPassword));
      return true;
    }
    return false;
  };

  const generateResetToken = (username: string): string | null => {
    const storedUsername = localStorage.getItem("dcpAdminUsername");

    if (username === storedUsername) {
      // Generate a time-limited reset token
      const token = btoa(`${username}-${Date.now()}`);
      localStorage.setItem("dcpResetToken", token);
      localStorage.setItem("dcpResetTokenExpiry", String(Date.now() + 3600000)); // 1 hour expiry
      return token;
    }
    return null;
  };

  const resetPassword = (resetToken: string, newPassword: string): boolean => {
    const storedToken = localStorage.getItem("dcpResetToken");
    const tokenExpiry = localStorage.getItem("dcpResetTokenExpiry");

    if (
      resetToken === storedToken &&
      tokenExpiry &&
      Date.now() < parseInt(tokenExpiry)
    ) {
      localStorage.setItem("dcpAdminPassword", btoa(newPassword));
      localStorage.removeItem("dcpResetToken");
      localStorage.removeItem("dcpResetTokenExpiry");
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        resetPassword,
        generateResetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
