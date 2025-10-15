import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      navigate('/signin');
    } else {
      setIsAuthenticated(true);
      
      // Only prevent back button for authenticated users on protected routes
      const handlePopState = () => {
        window.history.pushState(null, '', location.pathname);
      };
      
      window.history.pushState(null, '', location.pathname);
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [navigate, location.pathname]);

  // Only render children when authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
