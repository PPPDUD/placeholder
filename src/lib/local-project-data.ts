import {browser} from '$app/environment';

const DATA_KEY = 'unshared:localProjectData';

interface LocalProjectData {
  ownershipToken: string;
  expires: number;
}

export function getLocalProjectData(): Record<string, LocalProjectData> {
  if (!browser) {
    return {};
  }
  try {
    const stored = localStorage.getItem(DATA_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // ignore
  }
  return {};
}

export function getOwnershipToken(projectId: string): string | null {
  const localData = getLocalProjectData()[projectId];
  return localData ? localData.ownershipToken : null;
}

export function storeLocalProjectData(projectId: string, ownershipToken: string, expires: number): void {
  if (!browser) {
    return;
  }
  const tokens = getLocalProjectData();
  tokens[projectId] = {
    ownershipToken,
    expires
  };
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(tokens))
  } catch (e) {
    // ignore
  }
};