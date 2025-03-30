
import { ArrowLeft, Book, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { SKIN_DISEASES } from '@/utils/constants';
import NavBar from '@/components/NavBar';

const Information = () => {
  const navigate = useNavigate();
  
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
            <h1 className="text-2xl font-bold">Skin Conditions</h1>
            <p className="text-sm text-gray-600 mt-1">
              Learn about common skin conditions
            </p>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="about">About App</TabsTrigger>
              <TabsTrigger value="conditions">Skin Conditions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Book className="h-5 w-5 text-skin-blue" />
                    <h2 className="text-xl font-semibold">About SkinGuardian</h2>
                  </div>
                  
                  <p className="text-sm">
                    SkinGuardian is an AI-powered application designed to help you identify potential skin conditions. Using advanced image recognition technology, it can analyze photos of skin concerns and provide information about possible conditions.
                  </p>
                  
                  <h3 className="text-lg font-medium mt-4">How It Works</h3>
                  <ol className="text-sm space-y-2 list-decimal pl-5">
                    <li>Take or upload a clear photo of the skin condition</li>
                    <li>Our AI analyzes the image and identifies potential conditions</li>
                    <li>Review the results including description and treatment options</li>
                    <li>Consult with a healthcare professional for proper diagnosis</li>
                  </ol>
                  
                  <div className="bg-skin-light-teal p-4 rounded-md mt-4">
                    <h3 className="text-md font-medium mb-2">Important Disclaimer</h3>
                    <p className="text-sm">
                      SkinGuardian is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://www.aad.org/public/diseases', '_blank')}
                    >
                      Learn More About Skin Health
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conditions" className="mt-4">
              <div className="space-y-4">
                {SKIN_DISEASES.map((disease) => (
                  <Card key={disease.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-skin-blue">{disease.name}</h3>
                        <p className="text-sm mt-2">{disease.description}</p>
                        
                        <h4 className="text-md font-medium mt-4">Treatment</h4>
                        <p className="text-sm">{disease.treatment}</p>
                        
                        <h4 className="text-md font-medium mt-4">Prevention</h4>
                        <p className="text-sm">{disease.prevention}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Information;
