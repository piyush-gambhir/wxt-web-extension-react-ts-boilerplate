import { storage as wxtStorage } from '#imports';

import { useEffect, useState } from 'react';

type StorageKey = `local:${string}` | `sync:${string}` | `session:${string}`;

/**
 * React hook for reactive WXT storage
 * Uses WXT's built-in storage utility with watch support
 *
 * @example
 * const [count, setCount] = useStorage('local:count', 0);
 */
export function useStorage<T>(
  key: StorageKey,
  defaultValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial value
  useEffect(() => {
    wxtStorage
      .getItem<T>(key)
      .then((storedValue: T | null) => {
        setValue(storedValue ?? defaultValue);
        setIsInitialized(true);
      })
      .catch((error: Error) => {
        console.error(`Error loading storage key "${key}":`, error);
        setIsInitialized(true);
      });
  }, [key, defaultValue]);

  // Watch for changes using WXT's built-in watch
  useEffect(() => {
    if (!isInitialized) return;

    const unwatch = wxtStorage.watch<T>(key, (newValue: T | null) => {
      setValue(newValue ?? defaultValue);
    });

    return unwatch;
  }, [key, defaultValue, isInitialized]);

  // Update storage
  const updateValue = (newValue: T) => {
    setValue(newValue);
    wxtStorage.setItem(key, newValue).catch((error: Error) => {
      console.error(`Error saving storage key "${key}":`, error);
    });
  };

  return [value, updateValue];
}
