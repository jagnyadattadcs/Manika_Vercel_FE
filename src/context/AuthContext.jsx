import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check session storage on initial load
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');
    const storedIsAdmin = sessionStorage.getItem('isAdmin');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAdmin(storedIsAdmin === 'true');
    }
  }, []);

  const login = (userData, authToken, adminStatus) => {
    setUser(userData);
    setToken(authToken);
    setIsAdmin(adminStatus);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', authToken);
    sessionStorage.setItem('isAdmin', adminStatus);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
  };

  const value = {
    user,
    token,
    isAdmin,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);