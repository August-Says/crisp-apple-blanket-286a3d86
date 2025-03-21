
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FormField, 
  FormTextarea
} from '@/components/ui/FormComponents';

interface TextInputTabProps {
  textContent: string;
  additionalNotes: string;
  errors: Record<string, string>;
  onTextContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAdditionalNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TextInputTab: React.FC<TextInputTabProps> = ({
  textContent,
  additionalNotes,
  errors,
  onTextContentChange,
  onAdditionalNotesChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormField 
        label="Paste Text Content" 
        htmlFor="textContent" 
        error={errors.text}
      >
        <FormTextarea
          id="textContent"
          value={textContent}
          onChange={onTextContentChange}
          placeholder="Paste the document text here..."
          error={errors.text}
          rows={10}
        />
      </FormField>
      
      <FormField
        label="Additional Notes"
        htmlFor="additionalNotesText"
        className="mt-6"
      >
        <FormTextarea
          id="additionalNotesText"
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
          disabled={!textContent.trim()}
        >
          Generate Canvas
        </Button>
      </div>
    </form>
  );
};

export default TextInputTab;
