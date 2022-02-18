type EventMap = {
  [eventName: string]: (...args: any[]) => void;
};

export class EventBus<T extends EventMap> {
  private eventListeners: Map<keyof T, Set<T[keyof T]>> = new Map();

  publish<E extends keyof T>(eventName: E, ...args: Parameters<T[E]>): void {
    const listeners = this.eventListeners.get(eventName);
    if (!listeners) return;

    listeners.forEach((listener) => listener(...args));
  }

  subscribe<E extends keyof T>(eventName: E, listener: T[E]): () => void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    const listeners = this.eventListeners.get(eventName)!;
    listeners.add(listener);

    return () => {
      const listeners = this.eventListeners.get(eventName);
      if (!listeners?.has(listener)) return;

      listeners.delete(listener);
      if (listeners.size === 0) {
        this.eventListeners.delete(eventName);
      }
    };
  }
}

export default EventBus;
