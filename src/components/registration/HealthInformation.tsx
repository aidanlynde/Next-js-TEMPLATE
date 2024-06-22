import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface HealthInformationProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
}

const HealthInformation: React.FC<HealthInformationProps> = ({ nextStep, prevStep }) => {
  const [healthStatus, setHealthStatus] = useState('');
  const [allergies, setAllergies] = useState('');
  const [healthGoals, setHealthGoals] = useState('');

  const handleNext = () => {
    const healthInfo = {
      healthStatus,
      allergies,
      healthGoals,
    };
    nextStep(healthInfo);
  };

  return (
    <div className={styles.container}>
      <h1>Health Information</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Current Health Status"
        value={healthStatus}
        onChange={(e) => setHealthStatus(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Allergies"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Health Goals"
        value={healthGoals}
        onChange={(e) => setHealthGoals(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default HealthInformation;
