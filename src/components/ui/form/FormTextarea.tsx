
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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
        "bg-navy/10 border-navy/30 text-navy placeholder:text-navy/60 focus-visible:ring-navy",
        error ? "border-red-400" : "",
        className
      )}
      rows={rows}
    />
  );
};

