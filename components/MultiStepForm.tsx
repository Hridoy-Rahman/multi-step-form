
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import Summary from './steps/Summary';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    street: '',
    city: '',
    zip: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitFormData = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted to API:', data);
        resolve(data);
      }, 1000);
    });
  };

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      alert('Form submitted successfully!');
    },
  });
  

  const handleSubmit = () => {
  const { confirmPassword, ...finalData } = formData;
  mutate(finalData);
};

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-600 dark:text-white p-6 rounded-xl shadow-md">
      {step === 1 && <StepOne nextStep={nextStep} updateFormData={updateFormData} defaultValues={formData} />}
      {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} defaultValues={formData} />}
      {step === 3 && <StepThree nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} defaultValues={formData} />}
      {step === 4 && <Summary formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default MultiStepForm;