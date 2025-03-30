
import { SKIN_DISEASES } from './constants';

// Enhanced mock function to simulate AI image analysis
export const analyzeImage = (imageUrl: string): Promise<{
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  severity?: 'mild' | 'moderate' | 'severe';
  precautions?: string[];
}> => {
  return new Promise((resolve) => {
    // Simulate processing delay with variable timing
    setTimeout(() => {
      // Randomly select a disease from our predefined list
      const randomIndex = Math.floor(Math.random() * SKIN_DISEASES.length);
      const selectedDisease = SKIN_DISEASES[randomIndex];
      
      // Generate a random confidence score between 70 and 98
      const confidence = Math.floor(Math.random() * 28) + 70;
      
      // Generate random severity
      const severityOptions = ['mild', 'moderate', 'severe'] as const;
      const severity = severityOptions[Math.floor(Math.random() * severityOptions.length)];
      
      // Generate precautions
      const precautions = [
        "Avoid scratching or touching the affected area",
        "Keep the skin clean and moisturized",
        "Use gentle, fragrance-free skin products",
        "Protect the area from sun exposure"
      ];
      
      resolve({
        disease: selectedDisease.name,
        confidence,
        description: selectedDisease.description,
        treatment: selectedDisease.treatment,
        severity,
        precautions,
      });
    }, 1500 + Math.random() * 1500); // Variable delay between 1.5-3 seconds
  });
};
