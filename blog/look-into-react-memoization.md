---
title: "How does React decide what to render?"
date: "2025-02-09"
excerpt: "Building a mental model for react reconciliation and memoization."
tags: "React"
---

# React Memoization: When and How to Use It

> In this post, we’ll develop a mental model to understand when React decides to re-render components, and how memoization can help optimize this process.

When I first learned about memoization in React (via React.memo, useMemo, and useCallback), I was eager to apply it everywhere! Re-rendering is expensive, and anything that prevents unnecessary re-renders must be a good idea, right? So, naturally, I wrapped all stateful components in React.memo, all expensive calculations in useMemo, and all callbacks in stateful components in useCallback.

However, it wasn’t until I truly understood how reconciliation works (a fancy term for how React decides what to re-render) that I realized I was doing more harm than good by overusing these hooks. In some cases, components were still re-rendering despite being memoized!

To understand when to use memoization effectively, I had to build a better mental model of how React decides when to re-render.

## Shallow Comparison
Let’s start by discussing shallow comparison. When we use the triple equals (===), JavaScript checks if two items are of the same type and if their values are equal.

```javascript
const num1 = 1;
const num2 = 1;
console.log(num1 === num2); // returns true because the values are equal

const component1 = { type: 'input' };
const component2 = { type: 'input' };
```

What do you think this would return?
`console.log(component1 === component2);` If you guessed false, you’re correct! This is because when we create a variable with an object, it points to a reference in memory. Even if two objects have identical values, they can still point to different places in memory.

## Virtual DOM
Now, let’s talk about the Virtual DOM. The Virtual DOM is essentially an object representing the component tree. React uses it to determine what needs to be re-rendered.

For example, consider the following component:

```javascript
const Component = () => {
    return (
        <ChildComponent>
            <ul>
                {data.map((d) => (<li>{d.name}</li>))}
            </ul>
        </ChildComponent>
    );
};
```
React sees this as a tree of components, like so:

```javascript
{
    type: Component,
    children: [
        {
            type: ChildComponent,
            children: [
                {
                    type: 'ul',
                    children: [
                        { type: 'li' },
                        { type: 'li' },
                        { type: 'li' }
                    ]
                }
            ]
        }
    ]
}
```

## React.memo
When you wrap a component in React.memo, React will perform a shallow comparison of the component's props. If the props haven’t changed, React will skip re-rendering the component.

Let’s consider an example:

```javascript
const MemoChildComponent = React.memo(({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
});

const Component = () => {
    const [state, setState] = useState(false);

    return (
        <MemoChildComponent>
            <ul>
                {data.map((d) => (<li>{d.name}</li>))}
            </ul>
        </MemoChildComponent>
    );
};
```

You might expect MemoChildComponent to not re-render when Component re-renders, but this isn’t the case. This happens because the children prop is a new object reference each time Component renders, even if its contents remain the same.

## Why Does This Happen?
To clarify, let’s rewrite the example:

```javascript
const List = () => {
    return (
        <ul>
            {data.map((d) => (<li>{d.name}</li>))}
        </ul>
    );
};

<MemoChildComponent children={<List />} />
```

Even though MemoChildComponent is wrapped with React.memo, the children prop is recreated every time Component re-renders. This means React sees a new object reference for children and performs a re-render of MemoChildComponent.

## Using useMemo
To prevent unnecessary re-renders of MemoChildComponent, we can use useMemo to memoize the List component. This ensures that React compares the same reference every time, avoiding re-renders unless the content actually changes.

```javascript
const Component = () => {
    const [state, setState] = useState(false);

    // Memoize the List to prevent unnecessary re-renders
    const memoizedList = useMemo(() => <List />, []);

    return (
        <MemoChildComponent>
            {memoizedList}
        </MemoChildComponent>
    );
};
```

Now, memoizedList retains the same reference across renders, so React will only re-render MemoChildComponent if the content inside List changes.

## When to Use Memoization
To wrap up, here are some situations where memoization is beneficial:

1. When the prop is used as a dependency in another hook in a downstream component.
2. When the component is wrapped in React.memo, and you want to avoid unnecessary re-renders triggered by changing prop references.

By understanding when React re-renders components, we can use memoization wisely and avoid prematurely optimizing our applications!