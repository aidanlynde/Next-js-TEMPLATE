import { useState } from 'react';
import PersonalInformation from '../components/registration/PersonalInformation';
import HealthInformation from '../components/registration/HealthInformation';
import DietaryPreferences from '../components/registration/DietaryPreferences';
import DietaryRestrictions from '../components/registration/DietaryRestrictions';
import NutritionalPreferences from '../components/registration/NutritionalPreferences';
import CookingPreferences from '../components/registration/CookingPreferences';
import ShoppingPreferences from '../components/registration/ShoppingPreferences';

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

  const completeRegistration = () => {
    // Handle registration completion (e.g., send data to the server, navigate to the dashboard, etc.)
    console.log('Registration complete:', formData);
  };

  switch (step) {
    case 1:
      return <PersonalInformation nextStep={nextStep} />;
    case 2:
      return <HealthInformation nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <DietaryPreferences nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <DietaryRestrictions nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <NutritionalPreferences nextStep={nextStep} prevStep={prevStep} />;
    case 6:
      return <CookingPreferences nextStep={nextStep} prevStep={prevStep} />;
    case 7:
      return <ShoppingPreferences nextStep={nextStep} prevStep={prevStep} completeRegistration={completeRegistration} />;
    default:
      return <div>Registration Complete</div>;
  }
};

export default Registration;



