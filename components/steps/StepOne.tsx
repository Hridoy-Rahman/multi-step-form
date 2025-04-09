
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Must be at least 10 digits'),
});

export default function StepOne({ nextStep, updateFormData, defaultValues }: any) {
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
        <label>Full Name</label>
        <input className="input" {...register('fullName')} />
        {errors.fullName?.message && (
          <p className="text-red-500 text-sm">{String(errors.fullName.message)}</p>
        )}
      </div>
      <div>
        <label>Email</label>
        <input className="input" {...register('email')} />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>
      <div>
        <label>Phone Number</label>
        <input className="input" {...register('phoneNumber')} />
        {errors.phoneNumber?.message && (
          <p className="text-red-500 text-sm">{String(errors.phoneNumber.message)}</p>
        )}
      </div>
      <button type="submit" className="btn-primary">Next</button>
    </form>
  );
}
