import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkUser = () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const username = localStorage.getItem('username');
    
    if (token && userEmail) {
      setUser({ email: userEmail, username: username || userEmail.split('@')[0] });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    
    const handleStorageChange = () => {
      checkUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('role', userData.role);
    setUser({ email: userData.email, username: userData.username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    checkUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
