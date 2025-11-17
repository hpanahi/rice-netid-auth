import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import AnimatedOwl from '@/components/AnimatedOwl';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              logged in as: <span className="text-blue-600 dark:text-blue-400">{session.netId}</span>
            </h2>
            {session.affiliation && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                affiliation: <span className="text-green-600 dark:text-green-400 font-medium">{session.affiliation}</span>
              </p>
            )}
          </div>
          <a
            href="/api/auth/logout"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            logout
          </a>
        </div>

        <AnimatedOwl />
      </div>
    </main>
  );
}
