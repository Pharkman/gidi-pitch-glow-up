import { useGetUser } from '@/lib/query';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: user, isLoading, isError, isFetching } = useGetUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect after query has settled (not during background refetch)
    if (!isLoading && !isFetching) {
      if (!user || isError) {
        // Not authenticated → send to signin
        navigate('/signin', { replace: true });
      } else if (user && location.pathname === '/signin') {
        // Authenticated and still on signin → go to dashboard
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isError, isLoading, isFetching, navigate, location.pathname]);

  // While verifying user, show nothing or a loader
  if (isLoading) return null;

  // Render protected content if authenticated
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
