import { nanoid } from 'nanoid';

const STORAGE_KEY = 'sama_collections';

export function hasStorage() {
  try {
    localStorage.setItem('__test__', '__test__');
    localStorage.removeItem('__test__');
    return true;
  } catch (error) {
    console.error('localStorage is not available:', error);
    return false;
  }
}

export function getAllCollections() {
  if (!hasStorage()) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error reading collections from localStorage:', error);
  }

  return [];
}

export function saveCollections(collections) {
  if (!hasStorage()) return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    return true;
  } catch (error) {
    console.error('Error saving collections to localStorage:', error);
    return false;
  }
}

export function addCollection(collection) {
  const collections = getAllCollections();
  const updated = [...collections, collection];
  saveCollections(updated);
  return updated;
}

export function updateCollection(updatedCollection) {
  const collections = getAllCollections();
  const index = collections.findIndex(c => c.id === updatedCollection.id);
  if (index === -1) return collections;

  const updated = [...collections];
  updated[index] = updatedCollection;
  saveCollections(updated);
  return updated;
}

export function deleteCollection(id) {
  const collections = getAllCollections();
  const updated = collections.filter(c => c.id !== id);
  saveCollections(updated);
  return updated;
}