
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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
        "bg-navy/10 border-navy/30 text-navy placeholder:text-navy/60 focus-visible:ring-navy",
        error ? "border-red-400" : "",
        className
      )}
    />
  );
};

