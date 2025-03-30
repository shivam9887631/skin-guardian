
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { useSkinContext } from '@/context/SkinContext';
import { analyzeImage } from '@/utils/mockAI';
import { PLACEHOLDER_IMAGE } from '@/utils/constants';

const Analysis = () => {
  const navigate = useNavigate();
  const { currentImage, setCurrentAnalysis } = useSkinContext();
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    // Redirect to home if no image is selected
    if (!currentImage) {
      navigate('/home');
    }
  }, [currentImage, navigate]);

  useEffect(() => {
    if (analyzing) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [analyzing]);

  const handleAnalysis = async () => {
    if (!currentImage) return;
    
    try {
      setAnalyzing(true);
      setProgress(0);
      
      // Perform the analysis with our mock AI service
      const result = await analyzeImage(currentImage);
      
      // Create a new analysis object
      const newAnalysis = {
        id: Date.now().toString(),
        imageUrl: currentImage,
        date: new Date(),
        result,
      };
      
      // Store the analysis in context
      setCurrentAnalysis(newAnalysis);
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis failed',
        description: 'There was a problem analyzing your image. Please try again.',
        variant: 'destructive',
      });
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-skin-light-blue">
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/home')}
          disabled={analyzing}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex-1 container max-w-lg mx-auto px-4 py-4">
        <Card className="shadow-md overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
            
            <div className="aspect-square relative overflow-hidden rounded-md mb-6 bg-muted">
              <img
                src={currentImage || PLACEHOLDER_IMAGE}
                alt="Skin condition to analyze"
                className="object-cover w-full h-full"
              />
            </div>
            
            {analyzing ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Analyzing Image...</h3>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Our AI is examining your image for potential skin conditions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-skin-light-teal p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-skin-teal mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    For best results, ensure your image is clear, well-lit, and shows the skin condition from a good angle.
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleAnalysis}
                >
                  Analyze Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
