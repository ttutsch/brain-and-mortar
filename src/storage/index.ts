import { LocalStorageAdapter } from './LocalStorageAdapter';
import type { StorageAdapter } from './StorageAdapter';

export type { StorageAdapter };
export { LocalStorageAdapter };

let _instance: StorageAdapter | null = null;
export function getStorage(): StorageAdapter {
  if (!_instance) _instance = new LocalStorageAdapter();
  return _instance;
}
