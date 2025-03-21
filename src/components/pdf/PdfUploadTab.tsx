
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FormField, 
  FormTextarea,
  FileUpload
} from '@/components/ui/FormComponents';

interface PdfUploadTabProps {
  pdfFile: File | null;
  extractedPdfText: string;
  additionalNotes: string;
  errors: Record<string, string>;
  onFileChange: (file: File | null, extractedText?: string) => void;
  onExtractedTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAdditionalNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PdfUploadTab: React.FC<PdfUploadTabProps> = ({
  pdfFile,
  extractedPdfText,
  additionalNotes,
  errors,
  onFileChange,
  onExtractedTextChange,
  onAdditionalNotesChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormField 
        label="Upload PDF Document" 
        htmlFor="pdfFile" 
        error={errors.file}
      >
        <FileUpload
          id="pdfFile"
          onFileChange={onFileChange}
          error={errors.file}
        />
      </FormField>
      
      {extractedPdfText && (
        <FormField
          label="Extracted PDF Text (Editable)"
          htmlFor="extractedText"
          className="mt-6"
        >
          <FormTextarea
            id="extractedText"
            value={extractedPdfText}
            onChange={onExtractedTextChange}
            placeholder="Extracted text from PDF..."
            rows={6}
          />
        </FormField>
      )}
      
      <FormField
        label="Additional Notes"
        htmlFor="additionalNotes"
        className="mt-6"
      >
        <FormTextarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={onAdditionalNotesChange}
          placeholder="Add any additional context or notes here..."
          rows={3}
        />
      </FormField>
      
      <div className="mt-8 flex justify-center">
        <Button 
          type="submit" 
          variant="navy"
          size="lg"
          disabled={!pdfFile}
        >
          Generate Canvas
        </Button>
      </div>
    </form>
  );
};

export default PdfUploadTab;
