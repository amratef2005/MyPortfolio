/**
 * Compresses an image file client-side to ensure it:
 * 1. Fits within localStorage quota (~5MB total)
 * 2. Transmits instantly to the server
 * 3. Fits seamlessly in database storage
 * 4. Maintains high visual fidelity for Retina displays
 */
export const compressImageFile = (
  file: File,
  maxDimension = 320,
  quality = 0.88
): Promise<string> => {
  return new Promise((resolve) => {
    // If not an image, fallback to raw dataUrl
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Draw image with high quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export as JPEG with controlled quality
        const isPng = file.type === 'image/png';
        const outputFormat = isPng ? 'image/png' : 'image/jpeg';
        const compressed = canvas.toDataURL(outputFormat, quality);
        resolve(compressed);
      };

      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };

    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};
