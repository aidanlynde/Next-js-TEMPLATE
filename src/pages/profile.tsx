import { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from '../firebaseConfig';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = async () => {
      console.log("Checking authentication state in profile...");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User is authenticated, setting UID and fetching profile data...");
          setUid(user.uid);
          setEmail(user.email || ''); // Set email state
        } else {
          console.log("User is not authenticated, redirecting to login...");
          router.push('/login');
        }
      });
    };

    checkAuthState();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting profile:", { uid, email, fullName, age, gender, height, weight });

    const userProfile = {
      uid,
      email, // Include email in the user profile
      full_name: fullName,
      age: parseInt(age),
      gender,
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save_profile`, userProfile);
      if (response.data.status === "success") {
        alert("Profile saved successfully!");
        router.push('/dashboard'); // Redirect to dashboard or home page after successful submission
      } else {
        console.log("Failed to save profile:", response.data);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          className={styles.input}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="age">Age</label>
        <input
          id="age"
          className={styles.input}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="gender">Gender</label>
        <select
          id="gender"
          className={`${styles.input} ${styles.selectInput}`}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label className={styles.label} htmlFor="height">Height (cm)</label>
        <input
          id="height"
          className={styles.input}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="weight">Weight (kg)</label>
        <input
          id="weight"
          className={styles.input}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
