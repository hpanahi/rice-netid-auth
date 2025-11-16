/**
 * CAS logout callback endpoint
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/?logged_out=true', request.url));
}
