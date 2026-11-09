/**
 * ImagePreprocessor - Fast client-side image compression and resizing.
 * Optimizes images to max 800px width/height and ~70KB-120KB payload
 * for sub-second network transmission and responsive AI analysis.
 */
export interface PreprocessedImage {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  mimeType: string;
}

export async function preprocessImage(
  input: File | string,
  maxDimension: number = 1024,
  quality: number = 0.85
): Promise<PreprocessedImage> {
  return new Promise((resolve, reject) => {
    let originalSize = 0;

    if (input instanceof File) {
      originalSize = input.size;
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(input.type.toLowerCase())) {
        reject(new Error('Định dạng ảnh không được hỗ trợ. Vui lòng chọn ảnh JPG, PNG hoặc WebP.'));
        return;
      }

      // Check max limit: 25MB before compression
      if (input.size > 25 * 1024 * 1024) {
        reject(new Error('Dung lượng ảnh quá lớn (>25MB). Vui lòng chọn ảnh nhỏ hơn.'));
        return;
      }
    }

    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width === 0 || height === 0) {
        reject(new Error('Kích thước ảnh không hợp lệ.'));
        return;
      }

      // Calculate proportional scale
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
        reject(new Error('Không thể khởi tạo môi trường đồ họa Canvas của trình duyệt.'));
        return;
      }

      // Fill solid white background so transparent regions in PNG/SVG do not turn black in JPEG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);

      resolve({
        dataUrl: compressedDataUrl,
        originalSize: originalSize || compressedSize,
        compressedSize,
        width,
        height,
        mimeType: 'image/jpeg',
      });
    };

    img.onerror = () => {
      reject(new Error('Không thể đọc dữ liệu hình ảnh. Tệp có thể bị hỏng.'));
    };

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc tệp ảnh từ thiết bị.'));
      reader.readAsDataURL(input);
    } else {
      originalSize = Math.round((input.length * 3) / 4);
      img.src = input;
    }
  });
}
