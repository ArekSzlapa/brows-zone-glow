import { removeBackground, loadImage } from './backgroundRemoval';

const browImages = [
  'src/assets/brow-straight.png',
  'src/assets/brow-upward.png', 
  'src/assets/brow-soft-arch.png',
  'src/assets/brow-medium-arch.png',
  'src/assets/brow-high-arch.png',
  'src/assets/brow-s-shape.png',
  'src/assets/brow-round.png',
  'src/assets/brow-round-arch.png'
];

export const processBrowImages = async () => {
  console.log('Starting to process brow images...');
  
  for (const imagePath of browImages) {
    try {
      console.log(`Processing ${imagePath}...`);
      
      // Load the image
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      const imageElement = await loadImage(imageUrl);
      
      // Remove background
      const processedDataUrl = await removeBackground(imageElement);
      
      // Clean up the temporary URL
      URL.revokeObjectURL(imageUrl);
      
      // Convert data URL to blob and download
      const processedResponse = await fetch(processedDataUrl);
      const processedBlob = await processedResponse.blob();
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(processedBlob);
      link.download = imagePath.split('/').pop() || 'processed-brow.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      console.log(`Processed ${imagePath} successfully`);
    } catch (error) {
      console.error(`Error processing ${imagePath}:`, error);
    }
  }
  
  console.log('Finished processing all brow images');
};