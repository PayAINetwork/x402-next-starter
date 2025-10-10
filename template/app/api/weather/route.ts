import { NextRequest, NextResponse } from 'next/server';

/**
 * Weather API endpoint
 * @param request - Next.js request object
 * @returns Weather data response
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    report: {
      weather: 'sunny',
      temperature: 70,
      location: 'San Francisco, CA',
      timestamp: new Date().toISOString(),
    },
  });
}
