import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface ShoppingPreferencesProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
  completeRegistration: () => void;
}

const ShoppingPreferences: React.FC<ShoppingPreferencesProps> = ({ nextStep, prevStep, completeRegistration }) => {
  const [preferredShoppingFrequency, setPreferredShoppingFrequency] = useState('');
  const [preferredShoppingDays, setPreferredShoppingDays] = useState('');
  const [budgetConstraints, setBudgetConstraints] = useState('');
  const [preferredGroceryStores, setPreferredGroceryStores] = useState('');

  const handleNext = () => {
    const shoppingPreferences = {
      preferredShoppingFrequency,
      preferredShoppingDays,
      budgetConstraints,
      preferredGroceryStores,
    };
    nextStep(shoppingPreferences);
    completeRegistration();
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Preferences</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Preferred Shopping Frequency"
        value={preferredShoppingFrequency}
        onChange={(e) => setPreferredShoppingFrequency(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Preferred Shopping Days"
        value={preferredShoppingDays}
        onChange={(e) => setPreferredShoppingDays(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Budget Constraints"
        value={budgetConstraints}
        onChange={(e) => setBudgetConstraints(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Preferred Grocery Stores"
        value={preferredGroceryStores}
        onChange={(e) => setPreferredGroceryStores(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Complete</button>
    </div>
  );
};

export default ShoppingPreferences;
