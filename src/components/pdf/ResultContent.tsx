
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResultDisplay from '@/components/ResultDisplay';

interface ResultContentProps {
  result: string;
  onBack: () => void;
  onNavigate: (direction: 'back' | 'forward') => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const ResultContent = ({ 
  result, 
  onBack, 
  onNavigate, 
  canGoBack, 
  canGoForward 
}: ResultContentProps) => {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="text-peach hover:text-peach hover:bg-navy-light"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Form
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => onNavigate('back')}
            variant="outline"
            disabled={!canGoBack}
            className="text-peach border-peach/20 hover:bg-navy-light disabled:opacity-50"
          >
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </Button>
          <Button
            onClick={() => onNavigate('forward')}
            variant="outline"
            disabled={!canGoForward}
            className="text-peach border-peach/20 hover:bg-navy-light disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
      </div>
      <div className="bg-navy-light/80 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-peach/5 max-w-4xl mx-auto">
        <ResultDisplay result={result} onBack={onBack} />
      </div>
    </div>
  );
};

export default ResultContent;
