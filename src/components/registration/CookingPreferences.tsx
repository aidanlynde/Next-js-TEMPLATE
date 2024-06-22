import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface CookingPreferencesProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
}

const CookingPreferences: React.FC<CookingPreferencesProps> = ({ nextStep, prevStep }) => {
  const [cookingSkillLevel, setCookingSkillLevel] = useState('');
  const [preferredCookingMethods, setPreferredCookingMethods] = useState('');
  const [timeAvailableForCooking, setTimeAvailableForCooking] = useState('');
  const [kitchenEquipmentAvailable, setKitchenEquipmentAvailable] = useState('');

  const handleNext = () => {
    const cookingPreferences = {
      cookingSkillLevel,
      preferredCookingMethods,
      timeAvailableForCooking,
      kitchenEquipmentAvailable,
    };
    nextStep(cookingPreferences);
  };

  return (
    <div className={styles.container}>
      <h1>Cooking Preferences</h1>
      <select
        className={styles.input}
        value={cookingSkillLevel}
        onChange={(e) => setCookingSkillLevel(e.target.value)}
      >
        <option value="">Cooking Skill Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <input
        className={styles.input}
        type="text"
        placeholder="Preferred Cooking Methods"
        value={preferredCookingMethods}
        onChange={(e) => setPreferredCookingMethods(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Time Available for Cooking"
        value={timeAvailableForCooking}
        onChange={(e) => setTimeAvailableForCooking(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Kitchen Equipment Available"
        value={kitchenEquipmentAvailable}
        onChange={(e) => setKitchenEquipmentAvailable(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default CookingPreferences;
