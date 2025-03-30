
import { Camera, History, Home, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getNavItemClassName = (path: string) => {
    return cn(
      "flex flex-col items-center justify-center text-xs w-full py-2",
      location.pathname === path 
        ? "text-skin-blue font-medium" 
        : "text-gray-500 hover:text-skin-blue transition-colors"
    );
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-200">
      <div className="flex items-center justify-around">
        <button 
          className={getNavItemClassName('/home')}
          onClick={() => navigate('/home')}
        >
          <Home className="h-5 w-5 mb-1" />
          <span>Home</span>
        </button>
        
        <button
          className={getNavItemClassName('/analysis')}
          onClick={() => navigate('/analysis')}
        >
          <Camera className="h-5 w-5 mb-1" />
          <span>Analyze</span>
        </button>
        
        <button
          className={getNavItemClassName('/history')}
          onClick={() => navigate('/history')}
        >
          <History className="h-5 w-5 mb-1" />
          <span>History</span>
        </button>
        
        <button
          className={getNavItemClassName('/information')}
          onClick={() => navigate('/information')}
        >
          <Info className="h-5 w-5 mb-1" />
          <span>Info</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
