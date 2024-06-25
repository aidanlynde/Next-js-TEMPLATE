import Link from 'next/link';
import { useState, useEffect } from 'react';
import firebase from '../firebaseConfig';
import { useRouter } from 'next/router';
import styles from '../styles/center.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Checking authentication state...");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is already authenticated, checking profile completeness...");
        localStorage.setItem('userUid', user.uid);
        checkUserProfile(user);
      } else {
        console.log("No authenticated user found.");
      }
    });
  }, [router]);

  const checkUserProfile = async (user: firebase.User | null) => {
    if (!user) {
      console.error("No user is authenticated.");
      return;
    }

    try {
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);
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
      console.log("User profile fetched:", userData);

      if (isProfileComplete(userData)) {
        console.log("Profile complete, redirecting to chatbot...");
        router.push('/chatbot');
      } else {
        console.log("Profile incomplete, redirecting to profile page...");
        router.push('/profile');
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const isProfileComplete = (profile: any) => {
    return profile.full_name && profile.age && profile.gender && profile.height && profile.weight;
  };

  const handleLogin = async () => {
    console.log("Attempting to log in...");
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
      console.log("Custom Token:", customToken);

      console.log("Signing in with custom token...");
      await firebase.auth().signInWithCustomToken(customToken);
      const user = firebase.auth().currentUser;

      if (user) {
        console.log("User signed in, fetching ID token...");
        const idToken = await user.getIdToken();
        console.log("ID Token:", idToken);

        console.log("Fetching user profile...");
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
        console.log("User profile fetched:", userData);

        localStorage.setItem('userUid', user.uid);

        if (isProfileComplete(userData)) {
          console.log("Profile complete, redirecting to chatbot...");
          router.push('/chatbot');
        } else {
          console.log("Profile incomplete, redirecting to profile page...");
          router.push('/profile');
        }
      } else {
        setMessage('No user is signed in.');
      }
    } catch (error: any) {
      console.error("Error during login process:", error);
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

