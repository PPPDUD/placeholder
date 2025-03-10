import {error} from '@sveltejs/kit';
import * as db from './db';

export const validateOwnership = (projectId: string, givenToken: unknown) => {
  if (typeof givenToken !== 'string') {
    throw error(400, 'ownership token missing or invalid type');
  }

  const isValid = db.isValidOwnershipToken(projectId, givenToken);
  if (!isValid) {
    throw error(401, 'invalid ownership token');
  }
};

export const getFileFromBody = (formData: FormData, filename: string): File | null => {
  const file = formData.get(filename) as File;
  if (!file.arrayBuffer) {
    return null;
  }
  return file;
};
