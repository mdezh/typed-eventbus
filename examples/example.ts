import EventBus from "../src";

type MyEvents = {
  next: (next: number) => void;
}

const eventBus = new EventBus<MyEvents>();

const unsubscribe = eventBus.subscribe(
  'next',
  (value: number) => { console.log('receive', value) }
);

let counter = 0;

const interval = setInterval(() => {
  console.log('publish', ++counter);
  eventBus.publish('next', counter);
}, 500);

setTimeout(() => {
  console.log('unsubscribe!');
  unsubscribe();
}, 5000);

setTimeout(() => {
  clearInterval(interval);
}, 10000);
