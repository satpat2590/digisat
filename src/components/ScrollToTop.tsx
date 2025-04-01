import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
    
    // Ensure scroll behavior is properly enabled
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflow = 'auto';
  }, [pathname]);
  
  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (): void => {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'visible';
        document.documentElement.style.overflow = 'auto';
      }, 0);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  return null;
};

export default ScrollToTop;