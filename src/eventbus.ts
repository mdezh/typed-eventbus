type EventMap = {
  [eventName: string]: (...args: any[]) => void;
}

export class EventBus<T extends EventMap> {
  private listeners: Map<keyof T, Set<T[keyof T]>> = new Map();

  publish<E extends keyof T>(eventName: E, ...args: Parameters<T[E]>): void {
    const eventListeners = this.listeners.get(eventName);
    if (!eventListeners) return;

    eventListeners.forEach((listener) => listener(...args));
  }

  subscribe<E extends keyof T>(eventName: E, listener: T[E]): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    const eventListeners = this.listeners.get(eventName)!;
    eventListeners.add(listener);

    return () => {
      const eventListeners = this.listeners.get(eventName);
      if (!eventListeners?.has(listener)) return;

      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  }
}

export default EventBus;
