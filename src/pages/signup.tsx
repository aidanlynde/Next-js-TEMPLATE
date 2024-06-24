import { useState } from 'react';
import firebase from '../firebaseConfig';
import { useRouter } from 'next/router';
import styles from '../styles/center.module.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Send email verification
        await user.sendEmailVerification();

        // Ensure user.email is not null or undefined
        if (user.email) {
          setMessage('Verification email sent. Please check your inbox and then visit this page to verify: /check-verification');

          // Optionally, redirect to login page after sign-up
          setTimeout(() => {
            router.push('/check-verification');
          }, 3000); // Redirect after 3 seconds
        } else {
          setMessage('Error: Email is null or undefined');
        }
      } else {
        setMessage('No user is signed in.');
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/assets/UrbanAg.png" alt="Urban-Ag Logo" className="logo" />
      <h1>sign-up</h1>
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleSignUp}>Sign Up</button>
      <p>{message}</p>
      <p>
        Already have an account? <a href="/login">Sign in here</a>
      </p>
    </div>
  );
}



