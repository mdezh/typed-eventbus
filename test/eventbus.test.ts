import { EventBus } from '../src';

type TestEvents = {
  testEvent: (param: number) => void;
};

describe('testing EventBus', () => {
  let eventBus: EventBus<TestEvents>;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('shall publish even no subscribers', () => {
    expect(() => {
      eventBus.publish('testEvent', 1);
    }).not.toThrow();
  });

  it('shall call subscriber callback', () => {
    let receiver: number;

    eventBus.subscribe('testEvent', (n: number) => {
      receiver = n;
    });

    eventBus.publish('testEvent', 2);

    expect(receiver!).toBe(2);
  });

  it('shall call subscriber callback even if we have multiple subscribers', () => {
    let receiver1: number;
    let receiver2: number;

    eventBus.subscribe('testEvent', (n: number) => {
      receiver1 = n;
    });
    eventBus.subscribe('testEvent', (n: number) => {
      receiver2 = n;
    });

    eventBus.publish('testEvent', 3);

    expect(receiver1!).toBe(3);
    expect(receiver2!).toBe(3);
  });

  it('shall unsubscribe correctly', () => {
    let receiver1: number;
    let receiver2: number;

    const unsubscribe1 = eventBus.subscribe('testEvent', (n: number) => {
      receiver1 = n;
    });
    const unsubscribe2 = eventBus.subscribe('testEvent', (n: number) => {
      receiver2 = n;
    });

    eventBus.publish('testEvent', 4);

    unsubscribe1();

    eventBus.publish('testEvent', 5);

    expect(receiver1!).toBe(4);
    expect(receiver2!).toBe(5);

    unsubscribe2();

    eventBus.publish('testEvent', 6);

    expect(receiver1!).toBe(4);
    expect(receiver2!).toBe(5);

    expect(() => unsubscribe1()).not.toThrow();
  });
});
