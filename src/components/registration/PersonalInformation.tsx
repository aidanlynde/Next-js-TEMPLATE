import { useState } from 'react';
import styles from '../../styles/Registration.module.css';

// Define the prop types
interface PersonalInformationProps {
  nextStep: (data: any) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ nextStep }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const handleNext = () => {
    const personalInfo = {
      fullName,
      age,
      gender,
      height,
      weight,
      activityLevel,
    };
    nextStep(personalInfo);
  };

  return (
    <div className={styles.container}>
      <h1>Personal Information</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select
        className={styles.input}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        className={styles.input}
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select
        className={styles.input}
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option value="">Activity Level</option>
        <option value="sedentary">Sedentary</option>
        <option value="lightly active">Lightly Active</option>
        <option value="moderately active">Moderately Active</option>
        <option value="very active">Very Active</option>
      </select>
      <button className={styles.button} onClick={handleNext}>Next</button>
    </div>
  );
};

export default PersonalInformation;
