export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageProcessingError";
  }
}

/**
 * Processes an uploaded image file, handling size validation and HEIC conversion.
 * @param file The uploaded File object
 * @returns A Promise that resolves to a Blob (JPEG or original format if supported)
 */
export async function processUploadedImage(file: File): Promise<Blob> {
  if (!file) {
    throw new ImageProcessingError("No file selected.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new ImageProcessingError(
      `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`
    );
  }

  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  if (isHeic) {
    try {
      const heic2any = (await import("heic2any")).default;
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8,
      });

      // heic2any can return an array of blobs if the image is an animation/burst
      if (Array.isArray(convertedBlob)) {
        return convertedBlob[0];
      }
      return convertedBlob as Blob;
    } catch (error) {
      console.error("HEIC conversion failed:", error);
      throw new ImageProcessingError(
        "Failed to convert HEIC image. Please try a different photo."
      );
    }
  }

  // Ensure it's a valid image type if not HEIC
  if (!file.type.startsWith("image/")) {
    throw new ImageProcessingError(
      "Unsupported file format. Please upload a valid image."
    );
  }

  return file;
}

/**
 * Converts a Blob to a data URL (base64) for immediate rendering.
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image blob."));
    reader.readAsDataURL(blob);
  });
}
