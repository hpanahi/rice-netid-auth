'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCASLoginURL } from '@/lib/cas-auth';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loggedOut, setLoggedOut] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if there's an error from the callback
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }

    // Check if user was just logged out
    const loggedOutParam = searchParams.get('logged_out');
    if (loggedOutParam) {
      setLoggedOut(true);
    }

    // Check if user is already authenticated
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push('/dashboard');
        }
      })
      .catch(() => {
        // User is not authenticated, stay on login page
      })
      .finally(() => {
        setChecking(false);
      });
  }, [router, searchParams]);

  const handleLogin = () => {
    window.location.href = getCASLoginURL('/dashboard');
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400">checking authentication...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          rice netid auth
        </h1>

        <div className="mb-12">
          <pre className="text-5xl mb-8 select-none">
            {`
    ___
   (o,o)
   {"-"}
   -"-"-
            `}
          </pre>
        </div>

        <p className="text-xl mb-12 text-gray-600 dark:text-gray-400">
          authenticate with your rice netid to see the animated owl!
        </p>

        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            <p className="font-semibold">authentication error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loggedOut && (
          <div className="mb-8 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
            <p className="font-semibold">successfully logged out</p>
            <p className="text-sm">see you next time!</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          login with rice netid
        </button>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          <p>this is a test application demonstrating rice cas authentication</p>
          <p className="mt-2">you will be redirected to netid.rice.edu for authentication</p>
        </div>
      </div>
    </main>
  );
}
