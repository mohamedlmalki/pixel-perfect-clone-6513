import { useState, useCallback } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export function FileUpload({ 
  onFileSelect, 
  accept = ".csv,.txt", 
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.size <= maxSize) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  }, [maxSize, onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= maxSize) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [maxSize, onFileSelect]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragging 
            ? "border-primary bg-primary/10 scale-105" 
            : "border-border bg-card"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4 animate-bounce-in">
            <div className="flex items-center justify-center space-x-2">
              <File className="w-8 h-8 text-primary" />
              <span className="text-foreground font-medium">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className={cn(
              "w-12 h-12 mx-auto transition-all duration-200",
              isDragging ? "text-primary scale-110" : "text-muted-foreground"
            )} />
            <div className="space-y-2">
              <p className="text-foreground font-medium">
                Drop your CSV file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports CSV and TXT files up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}
      </div>
      
      <input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}