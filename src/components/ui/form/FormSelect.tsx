
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FormSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const FormSelect = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  className
}: FormSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger 
        id={id} 
        className={cn(
          "bg-navy/5 border-navy/30 text-navy focus:ring-navy", 
          error ? "border-red-400" : "",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-peach/90 border-navy/20 text-navy backdrop-blur-md">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="text-navy focus:bg-navy/10 focus:text-navy"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
