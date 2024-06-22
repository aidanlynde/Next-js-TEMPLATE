import { useState } from 'react';
import PersonalInformation from '../components/registration/PersonalInformation';
import HealthInformation from '../components/registration/HealthInformation'; // Import the new step
// Import other steps here

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <PersonalInformation nextStep={nextStep} />;
    case 2:
      return <HealthInformation nextStep={nextStep} prevStep={prevStep} />;
    // Add other steps here
    default:
      return <div>Registration Complete</div>;
  }
};

export default Registration;


