import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface DietaryRestrictionsProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
}

const DietaryRestrictions: React.FC<DietaryRestrictionsProps> = ({ nextStep, prevStep }) => {
  const [foodAllergies, setFoodAllergies] = useState('');
  const [intolerances, setIntolerances] = useState('');
  const [religiousRestrictions, setReligiousRestrictions] = useState('');
  const [personalRestrictions, setPersonalRestrictions] = useState('');

  const handleNext = () => {
    const dietaryRestrictions = {
      foodAllergies,
      intolerances,
      religiousRestrictions,
      personalRestrictions,
    };
    nextStep(dietaryRestrictions);
  };

  return (
    <div className={styles.container}>
      <h1>Dietary Restrictions</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Food Allergies"
        value={foodAllergies}
        onChange={(e) => setFoodAllergies(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Intolerances"
        value={intolerances}
        onChange={(e) => setIntolerances(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Religious Restrictions"
        value={religiousRestrictions}
        onChange={(e) => setReligiousRestrictions(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Personal Restrictions"
        value={personalRestrictions}
        onChange={(e) => setPersonalRestrictions(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default DietaryRestrictions;
