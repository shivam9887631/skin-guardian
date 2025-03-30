
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Stethoscope, Info, AlertCircle, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
  
  const { disease, confidence, description, treatment, severity, precautions } = currentAnalysis.result;
  
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severityLevel?: string) => {
    if (severityLevel === 'mild') return 'bg-green-100 text-green-800';
    if (severityLevel === 'moderate') return 'bg-amber-100 text-amber-800';
    if (severityLevel === 'severe') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-skin-light-blue">
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/home')}
          className="hover:bg-white/50"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex-1 container max-w-lg mx-auto px-4 py-2 pb-20">
        <div className="space-y-6">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold">Analysis Results</h1>
            <p className="text-sm text-gray-500">
              {new Date(currentAnalysis.date).toLocaleDateString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          
          <Card className="shadow-lg overflow-hidden border-none">
            <div className="h-2 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
            <CardContent className="p-0">
              <div className="flex md:flex-row flex-col">
                <div className="md:w-1/3 w-full">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={currentAnalysis.imageUrl || PLACEHOLDER_IMAGE}
                      alt="Analyzed skin condition"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 w-full p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-xl font-semibold text-skin-blue">{disease}</h2>
                    {severity && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(severity)}`}>
                        {severity}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Confidence:</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(confidence)}`}>
                        {confidence}%
                      </span>
                    </div>
                    <Progress 
                      value={confidence} 
                      className="h-2" 
                      indicatorClassName={confidence >= 90 ? "bg-green-600" : confidence >= 70 ? "bg-amber-500" : "bg-red-500"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-skin-blue" />
                About this Condition
              </h3>
              <p className="text-sm">{description}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-skin-blue" />
                Treatment Options
              </h3>
              <p className="text-sm">{treatment}</p>
            </CardContent>
          </Card>
          
          {precautions && precautions.length > 0 && (
            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-skin-blue" />
                  Precautions
                </h3>
                <ul className="text-sm space-y-1">
                  {precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-skin-blue mt-1.5 mr-2"></span>
                      {precaution}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <Card className="shadow-md bg-skin-light-teal border-none">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-skin-teal" />
                Medical Disclaimer
              </h3>
              <p className="text-sm">
                This analysis is for informational purposes only and should not replace professional medical advice. Please consult a dermatologist for proper diagnosis and treatment.
              </p>
              
              <Button 
                className="w-full mt-4 bg-white text-skin-blue hover:bg-gray-100"
                variant="outline"
                onClick={() => window.open('https://www.google.com/search?q=dermatologist+near+me', '_blank')}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                <span>Find a Dermatologist</span>
                <ExternalLink className="h-3 w-3 ml-1" />
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
