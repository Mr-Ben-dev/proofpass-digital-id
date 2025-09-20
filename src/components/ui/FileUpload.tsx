import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File as FileIcon, X } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-emerald-400 bg-emerald-500/10' : 'border-emerald-200 hover:border-emerald-300'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative">
          <button
            onClick={removeFile}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
          {file?.type.startsWith('image/') ? (
            <img src={preview} alt="File preview" className="max-h-48 mx-auto" />
          ) : (
            <div className="flex flex-col items-center">
              <FileIcon size={48} className="text-emerald-400" />
              <p className="mt-2">{file?.name}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
          </p>
          <p className="text-sm text-muted-foreground">
            PDF, DOC, DOCX, JPG, PNG up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};
