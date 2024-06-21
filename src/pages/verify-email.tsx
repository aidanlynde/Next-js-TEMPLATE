import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../firebaseConfig';
import styles from '../styles/center.module.css';

export default function VerifyEmail() {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { oobCode } = router.query;
        if (typeof oobCode === 'string') {
          await firebase.auth().applyActionCode(oobCode);
          setMessage('Your email has been verified.');
        } else {
          setMessage('Invalid verification code.');
        }
      } catch (error: any) {
        setMessage(`Error verifying email: ${error.message}`);
      }
    };

    if (router.isReady) {
      verifyEmail();
    }
  }, [router]);

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {message === 'Your email has been verified.' && (
        <button onClick={handleRedirect}>Click here to return to login</button>
      )}
    </div>
  );
}
