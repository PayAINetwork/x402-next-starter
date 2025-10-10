import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'x402 Next.js App',
  description: 'A Next.js app with x402 payment integration',
};

/**
 * Home page component
 * @returns JSX element
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to x402 Next.js
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A Next.js application with x402 payment protocol integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Free Weather API
            </h2>
            <p className="text-gray-600 mb-4">
              Get current weather information for free.
            </p>
            <a
              href="/api/weather"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Weather API
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Premium Content
            </h2>
            <p className="text-gray-600 mb-4">
              Access premium content with x402 payments.
            </p>
            <a
              href="/premium"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              View Premium Content
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              1. Copy <code className="bg-gray-100 px-2 py-1 rounded">env.example</code> to{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
            </p>
            <p>
              2. Update your wallet address and facilitator URL in the environment file
            </p>
            <p>3. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></p>
            <p>4. Visit the protected routes to test x402 payments</p>
          </div>
        </div>
      </div>
    </main>
  );
}
