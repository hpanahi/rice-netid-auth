/**
 * CAS Authentication utilities for Rice NetID
 */

const CAS_SERVER = process.env.CAS_SERVER_URL || 'https://netid.rice.edu';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export interface CASValidationResponse {
  success: boolean;
  netId?: string;
  error?: string;
}

/**
 * Generate the CAS login URL
 */
export function getCASLoginURL(destination: string = '/'): string {
  const serviceUrl = `${APP_URL}/api/auth/callback`;
  const destinationParam = encodeURIComponent(destination);
  return `${CAS_SERVER}/cas/login?service=${encodeURIComponent(serviceUrl)}?destination=${destinationParam}`;
}

/**
 * Generate the CAS logout URL
 */
export function getCASLogoutURL(): string {
  const serviceUrl = `${APP_URL}/api/auth/logout-callback`;
  return `${CAS_SERVER}/cas/logout?service=${encodeURIComponent(serviceUrl)}`;
}

/**
 * Validate a CAS ticket with the CAS server
 */
export async function validateCASTicket(ticket: string, serviceUrl: string): Promise<CASValidationResponse> {
  try {
    const validateUrl = `${CAS_SERVER}/cas/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(serviceUrl)}`;

    const response = await fetch(validateUrl);
    const xmlText = await response.text();

    // Parse the XML response to extract the NetID
    const netId = parseXMLTag(xmlText, 'cas:user');

    if (netId) {
      return { success: true, netId };
    } else {
      return { success: false, error: 'Invalid ticket or user not found in CAS response' };
    }
  } catch (error) {
    console.error('CAS validation error:', error);
    return { success: false, error: 'Failed to validate ticket with CAS server' };
  }
}

/**
 * Parse XML tag content (simple XML parser for CAS response)
 */
function parseXMLTag(xmlString: string, tagName: string): string | null {
  const tag1Pos1 = xmlString.indexOf(`<${tagName}`);
  if (tag1Pos1 === -1) return null;

  const tag1Pos2 = xmlString.indexOf('>', tag1Pos1);
  if (tag1Pos2 === -1) return null;

  const tag2Pos1 = xmlString.indexOf(`</${tagName}`, tag1Pos2);
  if (tag2Pos1 === -1) return null;

  return xmlString.substring(tag1Pos2 + 1, tag2Pos1).trim();
}

/**
 * Remove a parameter from a URL
 */
export function removeURLParameter(url: string, parameter: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(parameter);
  return urlObj.toString();
}
