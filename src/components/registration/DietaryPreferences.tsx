import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

interface DietaryPreferencesProps {
  nextStep: (data: any) => void;
  prevStep: () => void;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({ nextStep, prevStep }) => {
  const [dietType, setDietType] = useState('');
  const [preferredCuisines, setPreferredCuisines] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [mealTimingPreferences, setMealTimingPreferences] = useState('');

  const handleNext = () => {
    const dietaryPreferences = {
      dietType,
      preferredCuisines,
      favoriteFoods,
      dislikedFoods,
      mealTimingPreferences,
    };
    nextStep(dietaryPreferences);
  };

  return (
    <div className={styles.container}>
      <h1>Dietary Preferences</h1>
      <select
        className={styles.input}
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
      >
        <option value="">Diet Type</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="omnivore">Omnivore</option>
      </select>
      <input
        className={styles.input}
        type="text"
        placeholder="Preferred Cuisines"
        value={preferredCuisines}
        onChange={(e) => setPreferredCuisines(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Favorite Foods"
        value={favoriteFoods}
        onChange={(e) => setFavoriteFoods(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Disliked Foods"
        value={dislikedFoods}
        onChange={(e) => setDislikedFoods(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Meal Timing Preferences"
        value={mealTimingPreferences}
        onChange={(e) => setMealTimingPreferences(e.target.value)}
      />
      <button className={styles.button} onClick={prevStep}>Back</button>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default DietaryPreferences;
