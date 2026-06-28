import { sampleMusic } from '../data/sampleMusic.js';

const STORAGE_KEY = 'sama_music_library';
const VERSION_KEY = 'sama_storage_version';
const CURRENT_VERSION = 1;

export function getInitialMusicItems() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData && Array.isArray(parsedData.items) && parsedData.version === CURRENT_VERSION) {
        return parsedData.items;
      } else {
        localStorage.removeItem(STORAGE_KEY);
        return sampleMusic;
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  return sampleMusic;
}

export function saveMusicItems(items) {
  try {
    const storageData = {
      items,
      version: CURRENT_VERSION,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

export function clearMusicItems() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

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