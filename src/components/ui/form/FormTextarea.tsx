
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormTextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  rows?: number;
}

export const FormTextarea = ({
  id,
  value,
  onChange,
  placeholder,
  error,
  className,
  rows = 5
}: FormTextareaProps) => {
  return (
    <Textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "bg-white/10 border-white/20 text-navy placeholder:text-navy/50 focus-visible:ring-navy",
        error ? "border-red-400" : "",
        className
      )}
      rows={rows}
    />
  );
};
