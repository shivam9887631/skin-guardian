
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, History, Info } from 'lucide-react';
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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-skin-blue">SkinGuardian</h1>
            <p className="text-gray-600 mt-1">AI-powered skin condition analysis</p>
          </div>

          <Card className="shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analyze Your Skin</h2>
              <p className="text-gray-600 mb-6">
                Take or upload a photo of your skin concern, and our AI will analyze it for possible conditions.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={handleCamera}
                  disabled={loading}
                >
                  <Camera className="h-6 w-6" />
                  <span>Take Photo</span>
                </Button>
                
                <div className="relative">
                  <Button 
                    className="h-20 w-full flex flex-col items-center justify-center space-y-2"
                    disabled={loading}
                  >
                    <Upload className="h-6 w-6" />
                    <span>Upload Image</span>
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
            <Card className="shadow-md bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-skin-light-blue/50 transition-colors"
              onClick={() => navigate('/history')}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <History className="h-8 w-8 text-skin-blue mb-2" />
                <h3 className="font-medium">History</h3>
              </CardContent>
            </Card>
            
            <Card className="shadow-md bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-skin-light-blue/50 transition-colors"
              onClick={() => navigate('/information')}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Info className="h-8 w-8 text-skin-blue mb-2" />
                <h3 className="font-medium">Information</h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>
              <strong>Disclaimer:</strong> This app is not a substitute for professional medical advice. 
              Always consult a healthcare provider for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Home;
