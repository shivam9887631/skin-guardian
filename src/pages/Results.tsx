
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlarmClock, Users, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSkinContext } from '@/context/SkinContext';
import { PLACEHOLDER_IMAGE } from '@/utils/constants';
import NavBar from '@/components/NavBar';

const Results = () => {
  const navigate = useNavigate();
  const { currentAnalysis, addAnalysis } = useSkinContext();
  
  useEffect(() => {
    // Redirect to home if no analysis is available
    if (!currentAnalysis) {
      navigate('/home');
      return;
    }
    
    // Add the current analysis to history
    addAnalysis(currentAnalysis);
  }, [currentAnalysis, addAnalysis, navigate]);
  
  if (!currentAnalysis || !currentAnalysis.result) {
    return null; // Will be redirected by the useEffect
  }
  
  const { disease, confidence, description, treatment } = currentAnalysis.result;
  
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-skin-light-blue">
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex-1 container max-w-lg mx-auto px-4 py-2 pb-20">
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Analysis Results</h1>
          </div>
          
          <div className="flex space-x-4">
            <div className="w-1/3">
              <div className="aspect-square overflow-hidden rounded-md bg-muted">
                <img
                  src={currentAnalysis.imageUrl || PLACEHOLDER_IMAGE}
                  alt="Analyzed skin condition"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <div className="w-2/3">
              <h2 className="text-xl font-semibold text-skin-blue">{disease}</h2>
              <div className="mt-1 flex items-center">
                <span className="text-sm mr-2">Confidence:</span>
                <span className={`font-bold ${getConfidenceColor(confidence)}`}>
                  {confidence}%
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Analyzed on {currentAnalysis.date.toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-skin-blue" />
                Description
              </h3>
              <p className="text-sm">{description}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <AlarmClock className="h-5 w-5 mr-2 text-skin-blue" />
                Treatment
              </h3>
              <p className="text-sm">{treatment}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md bg-skin-light-teal">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-skin-teal" />
                Important Note
              </h3>
              <p className="text-sm">
                This analysis is for informational purposes only and should not replace professional medical advice. Please consult a dermatologist for proper diagnosis and treatment.
              </p>
              
              <Button 
                className="w-full mt-4"
                variant="outline"
                onClick={() => window.open('https://www.google.com/search?q=dermatologist+near+me', '_blank')}
              >
                <Users className="h-4 w-4 mr-2" />
                Find a Dermatologist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Results;
