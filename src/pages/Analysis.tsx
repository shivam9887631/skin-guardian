
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Scan } from 'lucide-react';
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
  const [scanLines, setScanLines] = useState(0);
  
  useEffect(() => {
    // Redirect to home if no image is selected
    if (!currentImage) {
      navigate('/home');
    }
  }, [currentImage, navigate]);

  useEffect(() => {
    if (analyzing) {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);
      
      // Animate scan lines for visual effect
      const scanInterval = setInterval(() => {
        setScanLines(prev => (prev + 1) % 100);
      }, 50);

      return () => {
        clearInterval(progressInterval);
        clearInterval(scanInterval);
      };
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
          className="hover:bg-white/50"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex-1 container max-w-lg mx-auto px-4 py-4">
        <Card className="shadow-lg overflow-hidden border-none">
          <div className="h-2 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Image Preview</h2>
            
            <div className="aspect-square relative overflow-hidden rounded-xl mb-6 bg-muted shadow-inner border border-gray-200">
              <img
                src={currentImage || PLACEHOLDER_IMAGE}
                alt="Skin condition to analyze"
                className="object-cover w-full h-full"
              />
              
              {analyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                  <div className="relative w-full h-full">
                    {/* Animated scan line effect */}
                    <div 
                      className="absolute left-0 right-0 h-1 bg-skin-teal/70 blur-sm"
                      style={{ top: `${scanLines}%` }}
                    ></div>
                    <div 
                      className="absolute left-0 right-0 h-0.5 bg-skin-teal"
                      style={{ top: `${scanLines}%` }}
                    ></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 rounded-full bg-white/20 backdrop-blur-md animate-pulse">
                        <Scan className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {analyzing ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">AI Analysis in Progress...</h3>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Analyzing patterns</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="bg-skin-light-teal p-4 rounded-lg mt-2">
                  <p className="text-sm italic text-center">
                    Our AI is carefully examining your image for potential skin conditions.
                    This won't take long.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-skin-light-teal p-4 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-skin-teal mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    For accurate results, ensure your image is clear, well-lit, and focused on the affected skin area.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-skin-blue hover:bg-skin-blue/90 text-white" 
                  size="lg"
                  onClick={handleAnalysis}
                >
                  Start AI Analysis
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
