
import { useState } from 'react';
import { ArrowLeft, Clock, Search, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useSkinContext } from '@/context/SkinContext';
import { PLACEHOLDER_IMAGE } from '@/utils/constants';
import NavBar from '@/components/NavBar';

const History = () => {
  const navigate = useNavigate();
  const { analysisHistory, setCurrentAnalysis } = useSkinContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = searchTerm
    ? analysisHistory.filter(item => 
        item.result?.disease.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : analysisHistory;
  
  const handleViewResult = (analysis: typeof analysisHistory[0]) => {
    setCurrentAnalysis(analysis);
    navigate('/results');
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
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
            <h1 className="text-2xl font-bold">Analysis History</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by condition name"
              className="pl-9 pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5"
                onClick={() => setSearchTerm('')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="text-center py-10">
              <Clock className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-600">No History Found</h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm ? 'No results match your search' : 'Your analysis history will appear here'}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {filteredHistory.map((analysis) => (
              <Card
                key={analysis.id}
                className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewResult(analysis)}
              >
                <CardContent className="p-4 flex items-center">
                  <div className="w-16 h-16 overflow-hidden rounded bg-muted flex-shrink-0">
                    <img
                      src={analysis.imageUrl || PLACEHOLDER_IMAGE}
                      alt="Analysis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium">
                      {analysis.result?.disease || 'Unknown'}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(analysis.date)}
                      </span>
                      {analysis.result && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-skin-light-blue">
                          {analysis.result.confidence}%
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
