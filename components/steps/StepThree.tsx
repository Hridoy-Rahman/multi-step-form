
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().min(4, 'Minimum 4 characters'),
  password: z.string().min(6, 'Minimum 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function StepThree({ nextStep, prevStep, updateFormData, defaultValues }: any) {
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
        <label>Username</label>
        <input className="input" {...register('username')} />
        {errors.username && <p className="text-red-500 text-sm">{String(errors.username.message)}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" className="input" {...register('password')} />
        {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" className="input" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn-secondary" onClick={prevStep}>Previous</button>
        <button type="submit" className="btn-primary">Next</button>
      </div>
    </form>
  );
}
