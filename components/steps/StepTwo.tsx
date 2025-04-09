
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  street: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().regex(/^[0-9]{5,}$/, 'Zip Code must be at least 5 digits'),
});

export default function StepTwo({ nextStep, prevStep, updateFormData, defaultValues }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Street Address</label>
        <input className="input" {...register('street')} />
        {errors.street && <p className="text-red-500 text-sm">{String(errors.street.message)}</p>}
      </div>
      <div>
        <label>City</label>
        <input className="input" {...register('city')} />
        {errors.city && <p className="text-red-500 text-sm">{String(errors.city.message)}</p>}
      </div>
      <div>
        <label>Zip Code</label>
        <input className="input" {...register('zip')} />
        {errors.zip && <p className="text-red-500 text-sm">{String(errors.zip.message)}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn-secondary" onClick={prevStep}>Previous</button>
        <button type="submit" className="btn-primary">Next</button>
      </div>
    </form>
  );
}