
import { SKIN_DISEASES } from './constants';

// Mock function to simulate AI image analysis
export const analyzeImage = (imageUrl: string): Promise<{
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Randomly select a disease from our predefined list
      const randomIndex = Math.floor(Math.random() * SKIN_DISEASES.length);
      const selectedDisease = SKIN_DISEASES[randomIndex];
      
      // Generate a random confidence score between 70 and 95
      const confidence = Math.floor(Math.random() * 25) + 70;
      
      resolve({
        disease: selectedDisease.name,
        confidence,
        description: selectedDisease.description,
        treatment: selectedDisease.treatment,
      });
    }, 2000); // 2 second delay to simulate processing
  });
};
