
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface UpgradeSectionProps {
  handleLogin: () => void;
}

const UpgradeSection = ({ handleLogin }: UpgradeSectionProps) => {
  return (
    <div className="mt-12 text-center">
      <p className="text-navy/60 mb-4">Want a more detailed analysis with actionable insights?</p>
      <Button onClick={handleLogin} variant="navyGradient" className="px-8 py-6 text-lg">
        Upgrade to Full Report
      </Button>
    </div>
  );
};

export default UpgradeSection;
