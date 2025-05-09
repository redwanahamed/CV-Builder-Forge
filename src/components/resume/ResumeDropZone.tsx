
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ResumeDropZoneProps {
  onFileAccepted: (file: File) => void;
}

export default function ResumeDropZone({ onFileAccepted }: ResumeDropZoneProps) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        onFileAccepted(file);
        toast({
          title: 'File uploaded successfully',
          description: `${file.name} has been uploaded and is being processed.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: 'Please upload a PDF or DOCX file.',
        });
      }
    }
  }, [onFileAccepted, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`glass-card p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragActive ? 'border-primary border-dashed border-2' : ''
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        {isDragActive ? (
          <>
            <Upload className="h-12 w-12 text-primary animate-bounce" />
            <h3 className="text-xl font-semibold">Drop your resume here</h3>
          </>
        ) : (
          <>
            <FileText className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Drag & drop your resume</h3>
              <p className="text-muted-foreground mb-4">Supported formats: PDF, DOCX</p>
              <Button>Browse Files</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
