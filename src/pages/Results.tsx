
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Stethoscope, Info, AlertCircle, Shield, ExternalLink, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/home')}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-skin-blue">Analysis Results</h1>
          <div className="w-9"></div> {/* Spacer for balance */}
        </div>
      </div>
      
      <div className="flex-1 container max-w-lg mx-auto px-4 py-2 pb-20 mt-14">
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-fade-in">
            <div className="h-2 bg-gradient-to-r from-skin-blue to-skin-teal"></div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-skin-blue" />
                  <span className="text-sm text-gray-500">Medical Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(currentAnalysis.date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex md:flex-row flex-col gap-4 mt-3">
                <div className="md:w-1/3 w-full">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={currentAnalysis.imageUrl || PLACEHOLDER_IMAGE}
                      alt="Analyzed skin condition"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 w-full space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{disease}</h2>
                    {severity && (
                      <Badge className={`font-medium ${getSeverityColor(severity)}`}>
                        {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Confidence Score</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(confidence)}`}>
                        {confidence}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <Progress 
                        value={confidence} 
                        className={`h-2 ${confidence >= 90 ? "bg-green-200" : confidence >= 70 ? "bg-amber-200" : "bg-red-200"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="shadow-md border-none overflow-hidden animate-fade-in" style={{animationDelay: "100ms"}}>
            <div className="h-1 bg-gradient-to-r from-skin-blue via-skin-teal to-skin-blue"></div>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-800">
                <Info className="h-5 w-5 mr-2 text-skin-blue" />
                About this Condition
              </h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none overflow-hidden animate-fade-in" style={{animationDelay: "200ms"}}>
            <div className="h-1 bg-gradient-to-r from-skin-blue via-skin-teal to-skin-blue"></div>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-800">
                <Activity className="h-5 w-5 mr-2 text-skin-blue" />
                Treatment Recommendations
              </h3>
              <p className="text-gray-600 leading-relaxed">{treatment}</p>
            </CardContent>
          </Card>
          
          {precautions && precautions.length > 0 && (
            <Card className="shadow-md border-none overflow-hidden animate-fade-in" style={{animationDelay: "300ms"}}>
              <div className="h-1 bg-gradient-to-r from-skin-blue via-skin-teal to-skin-blue"></div>
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-3 flex items-center text-gray-800">
                  <Shield className="h-5 w-5 mr-2 text-skin-blue" />
                  Precautions
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-skin-blue mt-1.5 mr-3"></span>
                      <span className="leading-relaxed">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <Card className="shadow-md bg-white border-none overflow-hidden animate-fade-in" style={{animationDelay: "400ms"}}>
            <div className="h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-800">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Medical Disclaimer
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This analysis is for informational purposes only and should not replace professional medical advice. Please consult a dermatologist for proper diagnosis and treatment.
              </p>
              
              <div className="grid grid-cols-1 gap-3 mt-4">
                <Button 
                  className="w-full bg-skin-blue hover:bg-skin-blue/90 text-white font-medium"
                  onClick={() => window.open('https://www.google.com/search?q=dermatologist+near+me', '_blank')}
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <span>Find a Dermatologist</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Results;
