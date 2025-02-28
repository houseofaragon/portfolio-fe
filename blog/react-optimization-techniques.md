---
title: "What is an expensive calculation?"
date: "2025-02-09"
excerpt: "Deep dive into react reconciliation and optimization techniques"
---

# What is React re-rendering?

> We'll develop a nice mental model for how React decides when a component will re-render and all about memoization. 

When I first learned about **memoization** (React.memo and useMemo and useCallback) - I was like cool let's use it everywhere! Re-rendering is expensive and anything that keeps from re-rendering is great. Wrap all stateful components in React.memo, wrap all expensive calculations in useMemo, wrap all callbacks in stateful components in useCallback.

It wasn't until I really understood how **reconciliation** works (a fancy word for how react determines what components to re-render) that I realized this was actually doing more harm than good because I was using them in cases where components were still re-rendering despite being memoized!

To understand when to use memoization, I first had to build a mental model about how React decides when to re-render.

# Shallow Comparison

Let's first talk about the triple equal comparison (`===`) which means when evaluating two things check if they are of the same `type` and if their values are equal.

```javascript
    const num1 = 1
    const num2 = 1
    console.log(num1 === num2) // returns true because the values are equal

    const component1 = { type: 'input' }
    const component2 = { type: 'input' }
```

What do you think `console.log(component1 === component2)` will equal? If you guessed false, you're correct! This is because in javascript when we create a variable that is initialized with an object, the variable points to a reference in memory that stores that object. So even though component1 and component2 have the same value, they point to two different places in memory.

# Virtual DOM
Let's discuss the virtual DOM for a moment. The virtual DOM is nothing more than a giant object with components.This is what React uses to determine what needs to be re-rendered.

```javascript
    const Component = () => {
        return (
            <ChildComponent>
                <ul>
                    {data.map((d) => (<li>{d.name}</li>))}
                </ul>
            </ChildComponent>
        )
    }
```

We've seen code that looks like above. We have a nested tree structure. 
```javascript
    {
        type: Component,
        children: [
            {
                type: ChildComponent,
                children: [
                    {
                        type: 'ul'
                        children: [
                            { type: 'li'},
                            { type: 'li'},
                            { type: 'li'},
                        ]
                    }
                ]
            }
        ]
    }
```

# React.memo

When a component is wrapped in React.memo, React will shallow compare its props and if the props have not changed, the component will not re-render.

Let's think about the example above. 

What happens if I wrap ChildComponent in React.memo? Will `MemoChildComponent` re-render when `Component` get's re-rendered?

```javascript
    const MemoChildComponent = ({children}) => {
        return React.memo(
            <div>
                {children}
            </div>
        )
    }

    const MemoChildComponent = () => {
        // React.memo expects a component
        return React.memo(ChildComponent)
    }

    const Component = () => {
        const [state, setState] = useState(false)

        return (
            <MemoChildComponent>
                <ul>
                    {data.map((d) => (<li>{d.name}</li>))}
                </ul>
            </MemoChildComponent>
        )
    }
```

The unfortunate answer is yes, do you know why? It has to do with shallow comparison. We can look at `MemoChildComponent` differently if without the syntactic sugar. The `List` component is passed in as a children prop. 

```javascript
    const List = () => {
        // we fetch data in this component
        return (
            <ul>
                {data.map((d) => (<li>{d.name}</li>))}
            </ul>
        )
    }

    <MemoChildComponent children={<List />} />
```

The children prop object is different everytime because it gets re-created and points to a different place in memory, which despite the `MemoChildComponent` being wrapped in React.Memo still get's re-rendered.

```javascript
    {
        type: 'ul'
        children: [
            { type: 'li'},
            { type: 'li'},
            { type: 'li'},
        ]
    }
```

# useMemo

In order to prevent re-rendering of `MemoChildComponent` we can leverage useMemo to memoize the `ListComponent` this will store the reference to the ListComponent object so that when React compares the `ListComponent` it is comparing the same reference to the object.

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

# When to use memoization
1. When the prop is used as a dependency in another hook in the downstream component
2. When the component is wrapped in React.memo
