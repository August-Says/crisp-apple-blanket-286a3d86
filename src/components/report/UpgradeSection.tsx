
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface UpgradeSectionProps {
  handleLogin: () => void;
}

const UpgradeSection = ({ handleLogin }: UpgradeSectionProps) => {
  return (
    <div className="mt-12 text-center space-y-3">
      <h3 className="text-xl font-semibold text-navy">We're Getting Ready to Launch!</h3>
      <p className="text-navy/80 mb-2 max-w-2xl mx-auto">
        Be among the first to experience the full power of our sentiment analysis tool. 
        We're close to launching and we'd love for you to be part of our early access program.
      </p>
      <div className="flex justify-center">
        <ArrowDown className="text-navy animate-bounce" />
      </div>
    </div>
  );
};

export default UpgradeSection;
