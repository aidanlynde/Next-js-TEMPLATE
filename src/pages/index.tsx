import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signup');
  }, [router]);

  return null; // Optional: You can display a loading spinner or message here
}


