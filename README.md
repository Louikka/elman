# Elman

This library provides two main objects: [`Manager`](./src/index.ts#Manager) and [`ManagerElement`](./src/index.ts#ManagerElement).

`ManagerElement` is just a simple wrapper over `HTMLElement`, meaning it can be any element. `ManagerElement` also requires a parent element provided to which the element itself should be attached.

`Manager` is a main object that manages added to it `ManagerElement`s, primarily via [`updateElements`](./src/index.ts#Manager.updateElements) method. This method accepts a number that being tested against `ManagerElement.tf` timeframe: if that number is in the timeframe, element being diplayed.

## Example

One of the most obvious use-cases is adding a callback to the with video (or audio) element `currentTime` property:

```js
const manager = new Manager();

// `yourElement` will be attached to the `parentElement` when video playback
// time is in range between 5 and 10 seconds
manager.add(new ManagerElement(yourElement, parentElement, { start: 5, end: 10 }));

video.addEventListener('timeupdate', () => {
    // `updateElements` checks if `currentTime` is in element timeframe
    manager.updateElements(video.currentTime);
});
```
