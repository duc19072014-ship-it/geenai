/**
 * Client-side image compressor & optimizer.
 * Resizes large images (e.g. 5MB-10MB mobile photos) to a max dimension of 768px
 * and compresses to JPEG ~0.8 quality (~50KB-120KB).
 * This maximizes upload speed and minimizes AI inference latency.
 */
export async function compressImage(
  input: File | string,
  maxDimension: number = 768,
  quality: number = 0.8
): Promise<{ dataUrl: string; originalSize: number; compressedSize: number }> {
  return new Promise((resolve, reject) => {
    let originalSize = 0;
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Calculate scaled dimensions
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Không thể khởi tạo Canvas để xử lý ảnh.'));
        return;
      }

      // Draw with smooth image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);

      resolve({
        dataUrl: compressedDataUrl,
        originalSize,
        compressedSize,
      });
    };

    img.onerror = () => {
      reject(new Error('Không thể đọc dữ liệu hình ảnh.'));
    };

    if (input instanceof File) {
      originalSize = input.size;
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc tệp ảnh.'));
      reader.readAsDataURL(input);
    } else {
      originalSize = Math.round((input.length * 3) / 4);
      img.src = input;
    }
  });
}
