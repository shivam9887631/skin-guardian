
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, History, Info, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useSkinContext } from '@/context/SkinContext';
import { fileToDataUrl, captureImage } from '@/utils/imageUtils';
import NavBar from '@/components/NavBar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  const skinIssuesCarousel = [
    {
      title: "Acne",
      image: "/acne.jpg",
      description: "Identify various types of acne conditions"
    },
    {
      title: "Eczema",
      image: "/eczema.jpg",
      description: "Analyze eczema severity and patterns"
    },
    {
      title: "Psoriasis",
      image: "/psoriasis.jpg",
      description: "Detect psoriasis symptoms and affected areas"
    },
    {
      title: "Rosacea",
      image: "/rosacea.jpg",
      description: "Evaluate rosacea flare-ups and triggers"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-skin-light-blue/40 to-white">
      <div className="flex-1 container max-w-lg mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-skin-blue/90 to-skin-teal/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center mix-blend-overlay opacity-70"></div>
          <div className="relative z-20 p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tight">SkinGuardian</h1>
            </div>
            <p className="text-lg mb-6 max-w-xs">AI-powered skin diagnosis in seconds. Analyze your skin concerns instantly.</p>
            <Button 
              onClick={() => document.getElementById('analysis-options')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-skin-blue hover:bg-white/90"
            >
              Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Analysis Options */}
        <Card id="analysis-options" className="mb-8 overflow-hidden border-none shadow-lg">
          <div className="h-1.5 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyze Your Skin</h2>
            <p className="text-gray-600 mb-6">
              Take or upload a clear photo of your skin condition for AI analysis.
            </p>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Button 
                className="h-24 flex flex-col items-center justify-center space-y-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-r from-skin-blue to-skin-teal text-white border-none"
                onClick={handleCamera}
                disabled={loading}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Take Photo</span>
              </Button>
              
              <div className="relative">
                <Button 
                  className="h-24 w-full flex flex-col items-center justify-center space-y-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 bg-white border-2 border-skin-light-blue"
                  disabled={loading}
                >
                  <div className="w-12 h-12 rounded-full bg-skin-light-blue flex items-center justify-center">
                    <Upload className="h-6 w-6 text-skin-blue" />
                  </div>
                  <span className="font-medium text-gray-800">Upload Image</span>
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

        {/* Skin Conditions Carousel */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Common Skin Conditions</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {skinIssuesCarousel.map((item, index) => (
                <CarouselItem key={index} className="basis-3/4 md:basis-1/2">
                  <Card className="overflow-hidden border-none shadow-md h-full">
                    <AspectRatio ratio={4/3} className="bg-gray-100">
                      <div className="h-full w-full bg-gradient-to-br from-skin-light-blue to-skin-light-teal flex items-center justify-center">
                        <p className="text-sm text-gray-500">{item.title} Image</p>
                      </div>
                    </AspectRatio>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-white/80" />
            <CarouselNext className="right-1 bg-white/80" />
          </Carousel>
        </div>

        {/* Quick Access */}
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
      <NavBar />
    </div>
  );
};

export default Home;
