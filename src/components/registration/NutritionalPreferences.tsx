import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface NutritionalPreferencesProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
}

const NutritionalPreferences: React.FC<NutritionalPreferencesProps> = ({ nextStep, prevStep }) => {
  const [macroPreferences, setMacroPreferences] = useState('');
  const [caloricIntakeGoal, setCaloricIntakeGoal] = useState('');
  const [nutrientFocus, setNutrientFocus] = useState('');

  const handleNext = () => {
    const nutritionalPreferences = {
      macroPreferences,
      caloricIntakeGoal,
      nutrientFocus,
    };
    nextStep(nutritionalPreferences);
  };

  return (
    <div className={styles.container}>
      <h1>Nutritional Preferences</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Macro Preferences"
        value={macroPreferences}
        onChange={(e) => setMacroPreferences(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Caloric Intake Goal"
        value={caloricIntakeGoal}
        onChange={(e) => setCaloricIntakeGoal(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Nutrient Focus"
        value={nutrientFocus}
        onChange={(e) => setNutrientFocus(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default NutritionalPreferences;
