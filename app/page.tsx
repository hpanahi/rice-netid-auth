import { Suspense } from 'react';
import LoginContent from '@/components/LoginContent';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400">loading...</div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
