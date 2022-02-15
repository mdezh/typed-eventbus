# A simple strictly typed eventbus

A simple bus for sending strictly typed events from publishers to subscribers.

- Allows autocomplete in VS Code
- Tiny and lightweight
- Dependency-free (uses devDependencies only)
- 100% unit test coverage

# Usage

```typescript
import { EventBus } from '@mdezh/typed-eventbus';

// create a list of all possible events and signatures
// of their handlers for the event bus
type MyEvents = {
  myEvent: (arg1: number, argN: string) => void;
};

const myEventBus = new EventBus<MyEvents>();

const unsubscribe = myEventBus.subscribe('myEvent', (a: number, b: string) =>
  console.log(a, b)
);

myEventBus.publish('myEvent', 1, 'foo');

unsubscribe();
```
