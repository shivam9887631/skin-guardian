
/**
 * Converts a File object to a data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Captures an image from the device camera
 */
export const captureImage = async (): Promise<string | null> => {
  try {
    // Try to access the camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Create a video element to show the camera feed
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    
    // Wait for video to load
    await new Promise(resolve => {
      video.onloadedmetadata = resolve;
    });
    
    // Create a canvas to capture the image
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Stop all video tracks to turn off the camera
    stream.getTracks().forEach(track => track.stop());
    
    // Convert canvas to data URL
    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Error capturing image:', error);
    return null;
  }
};
