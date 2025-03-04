---
title: "Optimizing React Performance"
date: "2024-12-09"
excerpt: "Building a mental model for managing state and preventing unnecessary renders"
tags: "React"
---

# Optimizing React Performance: Managing State and Preventing Unnecessary Renders

> These are things I wish I internalized when I was first learning React. It has helped me to reason about state and scaffolding components and build performant apps.

Building fast, responsive React applications often comes down to understanding how React renders components — and more importantly, how to avoid unnecessary renders. In this guide, we’ll break down React’s rendering flow, dive into optimization techniques, and show you how to structure components for maximum performance.

## Understanding React’s Rendering Flow

React components render in two main scenarios:

Initial Render: Triggered when ReactDOM.createRoot calls the render() method on your root component.

Subsequent Renders: Triggered by state or prop changes, which queue a re-render for the affected component and all its children.

Every render goes through these phases:
1. **Trigger** - A state or prop change triggers a render.

2. **Render** - React calls the component function to generate the virtual DOM.

3. **Commit** - React diffs the virtual DOM and updates the actual DOM as needed.

Understanding this flow is crucial to preventing wasteful renders.

## Managing State for Performance

State is a powerful feature in React, but it comes with a cost — changing state triggers a re-render. Let’s break it down:

```javascript
const useModalDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    };
};
```

If a component's state changes, it (and all its children) will re-render. However, we can control this behavior with techniques like memoization.

What happens when multiple state updates occur at once? 

React batches state updates to prevent unnecessary re-renders.


## Where is the State Stored?
State lives in memory while the app is running:

Stack: Stores primitive values and function calls.
Heap: Stores objects, arrays, and complex data.

For example:

```javascript
const [user, setUser] = useState({ name: 'Karen' });
```
Here, user is a pointer on the stack, referencing an object in the heap.

## Storing Information Without Triggering a Re-render

**Side note**: What if you want to keep track of data without rendering the UI? That's where useRef comes into play

- **useRef** Unlike useState, useRef stores data that persists across renders without causing a re-render:

```javascript
const myRef = useRef(0);
```
useRef is ideal for keeping track of data like DOM elements, especially when updates do not affect the UI.



## Memoization Techniques

Memoization helps you cache values or components so React doesn’t need to re-run functions or re-render components unnecessarily.

- **React.memo** - Prevents a component from re-rendering if its props haven’t changed.

```javascript
const Child = React.memo(({ value }) => {
    console.log("Rendered!");
    return <div>{value}</div>;
});
```
- **useMemo** - Caches the result of an expensive computation.
```javascript
const result = useMemo(() => expensiveFunction(input), [input]);
```
- **useCallback** - Memoizes a function reference, useful for passing stable callbacks.
```javascript
const handleClick = useCallback(() => console.log("Clicked"), []);
```
These techniques help prevent unnecessary renders and keep your app snappy.

## Moving State Down the Component Tree

One simple optimization is state colocation — placing state as close to the components that need it as possible. This limits how many components re-render when state changes.

```javascript
const Parent = () => {
    const [count, setCount] = useState(0);

    return <Child count={count} />;
};
```

Here, if count were needed in only a deeply nested component, lifting it higher in the tree would cause unnecessary renders.

## Passing Components as Props

Sometimes, it makes sense to pass components as props to control rendering.

```javascript
const Parent = ({ children }) => {
    return <div>{children}</div>;
};
```

React will re-render only if the children prop changes, giving you more granular control.

## Handling Edge Cases: Render Props & Effects

Certain patterns, like render props, can cause excessive renders.

```javascript
const ResizeDetector = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};
```

Here, every resize event triggers a re-render, which can cascade through the component tree.

## Putting It All Together

By understanding React’s rendering flow and applying optimization techniques like memoization, state colocation, and controlled component composition, you can significantly improve your app’s performance.