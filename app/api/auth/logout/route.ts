/**
 * Logout endpoint - destroys session and redirects to homepage
 */

import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/session';

export async function GET(request: NextRequest) {
  await destroySession();
  return NextResponse.redirect(new URL('/?logged_out=true', request.url));
}
