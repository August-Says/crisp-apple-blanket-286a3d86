
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface FormRadioGroupProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  error?: string;
  className?: string;
}

export const FormRadioGroup = ({
  id,
  value,
  onChange,
  options,
  error,
  className
}: FormRadioGroupProps) => {
  return (
    <RadioGroup 
      value={value} 
      onValueChange={onChange}
      className={cn("space-y-2", className)}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem 
            id={`${id}-${option.value}`} 
            value={option.value} 
            className="border-navy/40 text-navy bg-white/10 focus:ring-navy"
          />
          <Label 
            htmlFor={`${id}-${option.value}`}
            className="text-navy font-normal"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
