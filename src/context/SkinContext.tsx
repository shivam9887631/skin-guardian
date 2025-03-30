
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SkinAnalysis {
  id: string;
  imageUrl: string;
  date: Date;
  result: {
    disease: string;
    confidence: number;
    description: string;
    treatment: string;
    severity?: 'mild' | 'moderate' | 'severe';
    precautions?: string[];
  } | null;
}

interface SkinContextType {
  currentImage: string | null;
  setCurrentImage: (image: string | null) => void;
  analysisHistory: SkinAnalysis[];
  addAnalysis: (analysis: SkinAnalysis) => void;
  currentAnalysis: SkinAnalysis | null;
  setCurrentAnalysis: (analysis: SkinAnalysis | null) => void;
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export const SkinContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<SkinAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<SkinAnalysis | null>(null);

  const addAnalysis = (analysis: SkinAnalysis) => {
    setAnalysisHistory((prev) => [analysis, ...prev]);
  };

  return (
    <SkinContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        analysisHistory,
        addAnalysis,
        currentAnalysis,
        setCurrentAnalysis,
      }}
    >
      {children}
    </SkinContext.Provider>
  );
};

export const useSkinContext = () => {
  const context = useContext(SkinContext);
  if (context === undefined) {
    throw new Error('useSkinContext must be used within a SkinContextProvider');
  }
  return context;
};
