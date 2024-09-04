'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // 初期画面として /dashboard にリダイレクト
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div>
      <p>Redirecting to Dashboard...</p>
    </div>
  );
}
