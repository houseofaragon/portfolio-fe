---
title: "React internals"
date: "2024-12-09"
excerpt: "All the different way to navigate through an iterable"
---

# React Internals

## Hooks

1) Trigger - a change in state triggers a render. When state is changed, the new render call is queued.
2) Render - After a trigger occurs, a component is called (remember a component is just a function). The changes are calculated while rendering. Each components render method returns some JSX.
3) Commit - After the render method() is called, the DOM nodes are modified.

Hooks are special functions (conventially starting with `use`) that are only available while a component's render method is called (this is called rendering).

## Component rendering

Components get rendered twice. The first time is triggered from `createRoot` normally with the `root` html Dom node. Then calling the render() method of the initial component.

For further renders, a component's state change will trigger a re-render, and the re-rendering of all it's nested components, also called children. Children are components in the render method.

## useState

useState enables your component to store information.
```javascript
    const [state, stateSetter] = useState(0)
```

Variables and event handlers don't survive between renders, each render has its own.

## state update cycle

Normally, in javascript if you initialize and declare a variable, then say console.log() it, you'd expect to see the value `const number = 0` //expect 0

It works a bit differently in react. When state is updated
```javascript
    const [state, stateSetter] = useState(0)
    stateSetter(5)
    render (<div>{state}</div>)
```
it requests a new render, and that render is put on a state request queue.

## where does the actual state variable live?

When you use useState, the data is stored in RAM (Random Access Memory) which is a physical chip inside the device you are using (laptop, phone).
The state is stored in RAM while the app is running and disappears on refresh.

RAM is divded into two parts:
1) The Stack which stores primitive values and function calls
2) The Heap which stores objects, arrays, and complex data
```javascript
const [user, setUser] = useState({ name: "Karen" });
```
`user` is a pointer in the stack that points to the object in the heap

## what happens with multiple state updates in a single component



## useRef 

useRef enables you to store information, but unlike useState, when the useRef changes it does not trigger a render. So if you need to keep track of some information that doesnt effect the UI, useRef is handy.

On each render call, the same useRef object is returned.
```javascript
    const myRef = useRef(0)
```

I've personally used it for manipulating DOM elements like playing and pausing a video.

Props passed in don't automatically mean the component is going to be re-rendered. But sometimes you want access to data or update some data without a re-render.

A state change, via useState or useEffect are designed in such away that it will force a re-render of the component.

- and object with one property exposes - current.
The current object is the same regardless of renders.

React can create and destroy an element whenever it wants.

render() 

## memo

If the props passed into your component have not changed, don't render the component.

## useReducer

If youre familiar with state manager like Redux, useReducer functions in similar fashion.

It's great for creating a centralized location for state changes and for doing valildations.

```javascript
    function reducer(state, action) {

    }
    const [gameState, dispatch] = useReducer(reducer, )
```

## useMemo
Memoizes expensive functions.
only recalculate when a variable in the dependency array changes.

## useCallback

useCallback returns a memoized function while useMemo returns a memoized value (it calls the supplied function and returns the value). So useCallback is helpful if you are passing a function as a callback to another hook like useEffect (because hooks what you to pass them a callback function, not a value). Learn more about the differences in the React docs


## useEffect
happens on the next tick after a render call ends, asynchronously

## useLayoutEffect
happens immediately after a render call ends, synchronously


## What to do with many many useEffects in your component


## React Compiler

Does some static analysis useing useMemo and useCallback
https://github.com/btholt/citr-v9-project/tree/master/17-react-compiler

babel-plugin-react-compiler

Expo - runs react on all platforms


## Tanstack Query

