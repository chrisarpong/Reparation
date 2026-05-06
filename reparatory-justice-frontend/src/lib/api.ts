const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getPressReleases() {
  try {
    const res = await fetch(`${API_BASE_URL}/press-releases/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch press releases');
    return res.json();
  } catch (error) {
    console.error('Error fetching press releases:', error);
    return [];
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getMissions() {
  try {
    const res = await fetch(`${API_BASE_URL}/missions/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch missions');
    return res.json();
  } catch (error) {
    console.error('Error fetching missions:', error);
    return [];
  }
}

export async function getPressReleaseBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/press-releases/${slug}/`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching press release ${slug}:`, error);
    return null;
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/services/${slug}/`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching service ${slug}:`, error);
    return null;
  }
}

export async function getMissionBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/missions/${slug}/`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching mission ${slug}:`, error);
    return null;
  }
}
