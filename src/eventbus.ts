export type EventMap = {
  [eventName: string]: (...args: any[]) => void;
};

export class EventBus<T extends EventMap> {
  private _eventListeners: Map<keyof T, Set<T[keyof T]>> = new Map();

  publish<E extends keyof T>(eventName: E, ...args: Parameters<T[E]>): void {
    const listeners = this._eventListeners.get(eventName);
    if (!listeners) return;

    listeners.forEach((listener) => listener(...args));
  }

  subscribe<E extends keyof T>(eventName: E, listener: T[E]): () => void {
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, new Set());
    }
    const listeners = this._eventListeners.get(eventName)!;
    listeners.add(listener);

    return () => {
      const listeners = this._eventListeners.get(eventName);
      if (!listeners?.has(listener)) return;

      listeners.delete(listener);
      if (listeners.size === 0) {
        this._eventListeners.delete(eventName);
      }
    };
  }
}
