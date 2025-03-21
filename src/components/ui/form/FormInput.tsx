
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const FormInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className
}: FormInputProps) => {
  return (
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "bg-navy/5 border-navy/30 text-navy placeholder:text-navy/60 focus-visible:ring-navy",
        error ? "border-red-400" : "",
        className
      )}
    />
  );
};
