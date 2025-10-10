import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Content - x402 Next.js App',
  description: 'Access premium content with x402 payments',
};

/**
 * Premium content page component
 * @returns JSX element
 */
export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Premium Content
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This content is protected by x402 payment middleware
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Exclusive Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Exclusive data insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Priority support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Custom integrations</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">API Access</h3>
              <p className="text-sm text-gray-600 mb-3">
                Access the premium API endpoint:
              </p>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                GET /api/premium/content
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              This page demonstrates x402 payment middleware integration. When you
              access protected routes, the middleware will:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Check if payment is required for the requested resource</li>
              <li>Present payment options if no valid payment is found</li>
              <li>Allow access once payment is verified</li>
              <li>Cache payment status for subsequent requests</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
