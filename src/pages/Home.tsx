
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, History, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useSkinContext } from '@/context/SkinContext';
import { fileToDataUrl, captureImage } from '@/utils/imageUtils';
import NavBar from '@/components/NavBar';

const Home = () => {
  const navigate = useNavigate();
  const { setCurrentImage } = useSkinContext();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const dataUrl = await fileToDataUrl(file);
      setCurrentImage(dataUrl);
      navigate('/analysis');
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to process image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCamera = async () => {
    try {
      setLoading(true);
      const imageUrl = await captureImage();
      if (imageUrl) {
        setCurrentImage(imageUrl);
        navigate('/analysis');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to access camera. Please check permissions and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to capture image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-skin-light-blue">
      <div className="flex-1 container max-w-lg mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-md mb-4">
              <Shield className="h-12 w-12 text-skin-blue" />
            </div>
            <h1 className="text-4xl font-bold text-skin-blue mb-2">SkinGuardian</h1>
            <p className="text-gray-600">AI-powered skin diagnosis assistant</p>
          </div>

          <Card className="shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden border-none">
            <div className="h-2 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyze Your Skin</h2>
              <p className="text-gray-600 mb-6">
                Take or upload a clear photo of your skin condition for AI analysis.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-skin-light-blue"
                  onClick={handleCamera}
                  disabled={loading}
                >
                  <div className="w-12 h-12 rounded-full bg-skin-light-blue flex items-center justify-center">
                    <Camera className="h-6 w-6 text-skin-blue" />
                  </div>
                  <span className="font-medium">Take Photo</span>
                </Button>
                
                <div className="relative">
                  <Button 
                    className="h-24 w-full flex flex-col items-center justify-center space-y-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-skin-light-blue"
                    disabled={loading}
                  >
                    <div className="w-12 h-12 rounded-full bg-skin-light-blue flex items-center justify-center">
                      <Upload className="h-6 w-6 text-skin-blue" />
                    </div>
                    <span className="font-medium">Upload Image</span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md bg-white/90 backdrop-blur-sm cursor-pointer hover:bg-skin-light-blue/50 transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden border-none"
              onClick={() => navigate('/history')}
            >
              <div className="h-1 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-skin-light-blue flex items-center justify-center mb-2">
                  <History className="h-5 w-5 text-skin-blue" />
                </div>
                <h3 className="font-medium">History</h3>
              </CardContent>
            </Card>
            
            <Card className="shadow-md bg-white/90 backdrop-blur-sm cursor-pointer hover:bg-skin-light-blue/50 transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden border-none"
              onClick={() => navigate('/information')}
            >
              <div className="h-1 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-skin-light-blue flex items-center justify-center mb-2">
                  <Info className="h-5 w-5 text-skin-blue" />
                </div>
                <h3 className="font-medium">Information</h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-white/70 rounded-lg backdrop-blur-sm">
            <p>
              <strong className="text-skin-blue">Important:</strong> This app provides preliminary analysis only. Always consult a healthcare professional for accurate diagnosis.
            </p>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Home;
