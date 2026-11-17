import { GAME_CONFIG } from '@/config/gameConfig';

export interface SaveData {
  version: number;
  player: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
}

const CURRENT_VERSION = 1;

/** Gestor de guardado local versionado. */
class SaveManagerImpl {
  save(data: Omit<SaveData, 'version' | 'createdAt' | 'updatedAt'>): SaveData {
    const now = new Date().toISOString();
    const existing = this.load();
    const full: SaveData = {
      version: CURRENT_VERSION,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      ...data,
    };
    try {
      localStorage.setItem(GAME_CONFIG.SAVE_KEY, JSON.stringify(full));
    } catch (error) {
      console.warn('[SaveManager] No se pudo guardar:', error);
    }
    return full;
  }

  load(): SaveData | null {
    try {
      const raw = localStorage.getItem(GAME_CONFIG.SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as SaveData;
      if (data.version !== CURRENT_VERSION) {
        console.warn('[SaveManager] Versión distinta, migración pendiente.');
        return null;
      }
      if (typeof data.player?.x !== 'number' || typeof data.player?.y !== 'number') return null;
      return data;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(GAME_CONFIG.SAVE_KEY);
  }

  export(): string | null {
    return localStorage.getItem(GAME_CONFIG.SAVE_KEY);
  }

  import(json: string): boolean {
    try {
      const data = JSON.parse(json) as SaveData;
      if (!data || typeof data.version !== 'number' || typeof data.player?.x !== 'number' || typeof data.player?.y !== 'number') return false;
      localStorage.setItem(GAME_CONFIG.SAVE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }
}

export const SaveManager = new SaveManagerImpl();
