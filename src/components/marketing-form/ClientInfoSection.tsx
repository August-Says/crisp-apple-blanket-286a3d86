
import { FormField, FormSelectWithCustomOption, FormInput } from '@/components/ui/FormComponents';
import { FormData } from '@/hooks/useFormSubmission';
import * as options from '@/constants/formOptions';

interface ClientInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (field: keyof FormData, value: string) => void;
}

const ClientInfoSection = ({ formData, errors, onChange }: ClientInfoSectionProps) => {
  return (
    <>
      <FormField 
        label="Client Name" 
        htmlFor="clientName" 
        error={errors.clientName}
      >
        <FormInput
          id="clientName"
          value={formData.clientName || 'Brand_Name'}
          onChange={(e) => onChange('clientName', e.target.value)}
          placeholder="Enter client name"
          error={errors.clientName}
          className="w-full"
        />
      </FormField>
      
      <FormField 
        label="Client Industry/Vertical" 
        htmlFor="clientIndustry" 
        error={errors.clientIndustry}
      >
        <FormSelectWithCustomOption
          id="clientIndustry"
          value={formData.clientIndustry}
          onChange={(value) => onChange('clientIndustry', value)}
          options={options.industryOptions}
          placeholder="Select industry"
          error={errors.clientIndustry}
          customOptionLabel="Other industry (specify)"
        />
      </FormField>
    </>
  );
};

export default ClientInfoSection;
