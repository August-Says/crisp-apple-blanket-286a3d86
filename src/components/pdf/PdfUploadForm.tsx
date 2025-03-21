
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import PdfUploadTab from './PdfUploadTab';
import TextInputTab from './TextInputTab';

interface PdfUploadFormProps {
  onSubmit: (content: string, type: 'upload' | 'text') => void;
  initialTextContent?: string;
}

const PdfUploadForm = ({ onSubmit, initialTextContent = '' }: PdfUploadFormProps) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState(initialTextContent);
  const [extractedPdfText, setExtractedPdfText] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');

  const validateForm = (tabType: 'upload' | 'text') => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (tabType === 'upload') {
      if (!pdfFile) {
        newErrors.file = 'Please upload a PDF file';
        isValid = false;
      } else if (!extractedPdfText) {
        toast.warning('No text could be extracted from the PDF. The submission may not be as useful.');
        // Continue anyway since we have a file
      }
    }
    
    if (tabType === 'text' && !textContent.trim()) {
      newErrors.text = 'Please enter some text content';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (file: File | null, extractedText?: string) => {
    setPdfFile(file);
    if (extractedText) {
      setExtractedPdfText(extractedText);
    } else if (!file) {
      setExtractedPdfText('');
    }
  };

  const handleSubmit = (e: React.FormEvent, tabType: 'upload' | 'text') => {
    e.preventDefault();
    
    if (!validateForm(tabType)) {
      toast.error(`Please ${tabType === 'upload' ? 'upload a PDF file' : 'enter some text content'}`);
      return;
    }
    
    if (tabType === 'text') {
      const contentWithNotes = additionalNotes.trim() 
        ? `${textContent}\n\nADDITIONAL NOTES:\n${additionalNotes}`
        : textContent;
      onSubmit(contentWithNotes, 'text');
    } else {
      if (extractedPdfText) {
        const contentWithNotes = additionalNotes.trim() 
          ? `${extractedPdfText}\n\nADDITIONAL NOTES:\n${additionalNotes}`
          : extractedPdfText;
        onSubmit(contentWithNotes, 'text');
      } else {
        const fileNameWithNotes = additionalNotes.trim()
          ? `${pdfFile?.name || 'Uploaded PDF'}\n\nADDITIONAL NOTES:\n${additionalNotes}`
          : pdfFile?.name || 'Uploaded PDF';
        onSubmit(fileNameWithNotes, 'upload');
      }
    }
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 sm:p-8 shadow-lg">
      <Tabs 
        defaultValue="upload" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value as 'upload' | 'text')}
      >
        <TabsList className="grid w-full grid-cols-2 bg-white/10 text-navy">
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-navy font-medium"
          >
            Upload PDF
          </TabsTrigger>
          <TabsTrigger 
            value="text" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-navy font-medium"
          >
            Paste Text
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <PdfUploadTab 
            pdfFile={pdfFile}
            extractedPdfText={extractedPdfText}
            additionalNotes={additionalNotes}
            errors={errors}
            onFileChange={handleFileChange}
            onExtractedTextChange={(e) => setExtractedPdfText(e.target.value)}
            onAdditionalNotesChange={(e) => setAdditionalNotes(e.target.value)}
            onSubmit={(e) => handleSubmit(e, 'upload')}
          />
        </TabsContent>
        
        <TabsContent value="text" className="mt-6">
          <TextInputTab 
            textContent={textContent}
            additionalNotes={additionalNotes}
            errors={errors}
            onTextContentChange={(e) => setTextContent(e.target.value)}
            onAdditionalNotesChange={(e) => setAdditionalNotes(e.target.value)}
            onSubmit={(e) => handleSubmit(e, 'text')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PdfUploadForm;
