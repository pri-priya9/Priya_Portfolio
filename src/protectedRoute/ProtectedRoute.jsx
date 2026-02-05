import PropTypes from 'prop-types';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  
  useEffect(() => {
    const passwordVerified = sessionStorage.getItem('passwordVerified') === 'true';
    const accessedThroughPassword = location.state?.accessedThroughPassword === true;
    const adminAccessGranted = sessionStorage.getItem('adminAccessGranted') === 'true';
    
    // First time access - must have both password verified AND state
    if (accessedThroughPassword && passwordVerified) {
      // Grant access and set persistent flag for this session
      sessionStorage.setItem('adminAccessGranted', 'true');
      setIsValidated(true);
    } 
    // Subsequent access within same session (refresh, navigation)
    else if (adminAccessGranted && passwordVerified) {
      setIsValidated(true);
    }
    // Direct URL access or invalid access attempt
    else {
      sessionStorage.removeItem('passwordVerified');
      sessionStorage.removeItem('adminAccessGranted');
      navigate('/', { replace: true });
    }
  }, [location, navigate]);
  
  if (!isValidated) {
    return null; // or a loading spinner
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
