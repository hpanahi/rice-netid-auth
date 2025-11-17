/**
 * CAS callback endpoint - handles the response from CAS server
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateCASTicket, removeURLParameter } from '@/lib/cas-auth';
import { createSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ticket = searchParams.get('ticket');
  const destination = searchParams.get('destination') || '/dashboard';

  if (!ticket) {
    return NextResponse.json(
      { error: 'No ticket provided' },
      { status: 400 }
    );
  }

  // Construct the service URL (without the ticket parameter)
  const serviceUrl = removeURLParameter(request.url, 'ticket');

  // Validate the ticket with CAS
  const validation = await validateCASTicket(ticket, serviceUrl);

  if (!validation.success || !validation.netId) {
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(validation.error || 'Authentication failed')}`, request.url));
  }

  // Create a session for the authenticated user
  await createSession(validation.netId, validation.affiliation);

  // Redirect to the destination
  return NextResponse.redirect(new URL(destination, request.url));
}
