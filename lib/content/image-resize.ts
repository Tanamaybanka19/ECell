"use client";

const MAX_WIDTH = 1280;

/** Downscale an image file to at most MAX_WIDTH px wide, re-encoding to a File. */
export function resizeImageFile(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
      const width = Math.round(img.naturalWidth * scale);
      const height = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      const isPng = file.type === "image/png";
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not encode image"));
            return;
          }
          resolve(
            new File([blob], file.name, {
              type: isPng ? "image/png" : "image/jpeg",
            }),
          );
        },
        isPng ? "image/png" : "image/jpeg",
        isPng ? undefined : 0.82,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image"));
    };
    img.src = objectUrl;
  });
}
