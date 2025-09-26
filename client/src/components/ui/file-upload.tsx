import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  uploadProgress?: number;
  className?: string;
}

export function FileUpload({ onUpload, isUploading = false, uploadProgress = 0, className }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        isUploading && "pointer-events-none opacity-50",
        className
      )}
      data-testid="file-upload-dropzone"
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4">
        {isUploading ? (
          <>
            <Upload className="w-12 h-12 text-primary animate-bounce" />
            <div className="w-full max-w-xs">
              <Progress value={uploadProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          </>
        ) : (
          <>
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                {isDragActive ? "Drop the image here" : "Drag & drop an image"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to select a file
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPEG, PNG, WebP (max 5MB)
              </p>
            </div>
            <Button variant="outline" className="mt-2" data-testid="file-upload-button">
              Choose File
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
