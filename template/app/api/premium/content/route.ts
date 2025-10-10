import { NextRequest, NextResponse } from 'next/server';

/**
 * Premium content API endpoint
 * @param request - Next.js request object
 * @returns Premium content response
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    content: 'This is premium content that requires payment to access',
    features: [
      'Exclusive data insights',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    timestamp: new Date().toISOString(),
  });
}
