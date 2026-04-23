/**
 * Centralized API client utility handling correct headers and CSRF tokens.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  // Attempt to extract CSRF token from cookies if applicable (if using session cookies over JWT)
  if (typeof document !== 'undefined') {
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];

    if (csrfToken && !headers.has('X-CSRFToken')) {
      headers.set('X-CSRFToken', csrfToken);
    }
    
    // Add JWT Token from localStorage if present
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || 'API Request Failed');
  }

  // Handle 204 No Content
  if (response.status === 204) return null;
  
  return response.json();
}
