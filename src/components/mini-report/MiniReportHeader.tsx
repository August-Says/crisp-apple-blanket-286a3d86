
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

interface MiniReportHeaderProps {
  handleBack: () => void;
  handleViewFullReport: () => void;
}

const MiniReportHeader = ({ handleBack, handleViewFullReport }: MiniReportHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Button variant="ghost" className="flex items-center gap-2" onClick={handleBack}>
        <ArrowLeft size={16} />
        Back to Home
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2" onClick={handleViewFullReport}>
        <FileText size={16} />
        View Full Report
      </Button>
    </div>
  );
};

export default MiniReportHeader;
