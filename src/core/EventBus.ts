type Handler<T = unknown> = (payload: T) => void;

class EventBusImpl {
  private listeners = new Map<string, Set<Handler>>();

  on<T = unknown>(event: string, handler: Handler<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as Handler);
    return () => this.off(event, handler);
  }

  off<T = unknown>(event: string, handler: Handler<T>): void {
    this.listeners.get(event)?.delete(handler as Handler);
  }

  emit<T = unknown>(event: string, payload?: T): void {
    this.listeners.get(event)?.forEach((handler) => handler(payload));
  }

  clear(): void {
    this.listeners.clear();
  }
}

export const EventBus = new EventBusImpl();

export const GameEvents = {
  PLAYER_MOVED: 'player:moved',
  PLAYER_STATS_CHANGED: 'player:statsChanged',
  INVENTORY_CHANGED: 'inventory:changed',
  ITEM_EQUIPPED: 'inventory:itemEquipped',
  SAVE_REQUESTED: 'save:requested',
} as const;
