
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-skin-light-blue to-skin-light-teal">
      <div className="animate-fade-in flex flex-col items-center">
        <div className="bg-white p-6 rounded-full shadow-lg mb-6">
          <Shield className="h-20 w-20 text-skin-blue animate-pulse-slow" />
        </div>
        <h1 className="text-4xl font-bold text-skin-blue mb-2">SkinGuardian</h1>
        <p className="text-gray-600">Your AI Skin Health Assistant</p>
      </div>
    </div>
  );
};

export default SplashScreen;
