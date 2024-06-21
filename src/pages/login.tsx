import Link from 'next/link';
import { useState } from 'react';
import firebase from '../firebaseConfig';
import styles from '../styles/center.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const customToken = data.access_token;

      await firebase.auth().signInWithCustomToken(customToken);
      const user = firebase.auth().currentUser;

      if (user) {
        const idToken = await user.getIdToken();

        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Error: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        setMessage(`Logged in as ${userData.email}`);
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
      <h1>sign-in</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <p>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
