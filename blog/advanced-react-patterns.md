---
title: "Advanced React Patterns"
date: "2024-12-09"
excerpt: "Hello this is an excert"
---

When not to memo

# Moving State Down the component tree
Performance / Optimization
Explain the react Re-rendering flow

Explain memoization
when is it necessary and not necessary
Explain react.useMemo
checks if props have changed - if they haven’t the re-render tree is stopped at this point
Explain react.callback
Explain react.memo

Explain state in a component
When a component has state - that means there is some interactivity. For example, a user may click a button to open and close a modal dialog. We would store whether the modal is currently open or closed with a state variable.

```javascript
    const useModalDialog = () => {
        const [isOpen, setIsOpen] = useState(false)

        return {
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false)
        }
    }

```

If a component’s state changes all nested components will be re-rendered regardless of their props except! If the component is wrapped in memo. The component wrapped in memo will first check if any of the props has changed. If no props have changed then re-renders will stop at this component and not affect any of the nested components.

Composition technique - what is it, give an example.

Really understanding react re-rendering. When does a component re-render?
A component re-renders when state changes. And if state within a component changes, all nested components will be re-rendered. Except if using memoization - if the component is memoized - props will be checked to see if they have changed.

One method to prevent expensive re-renders is to move state down as low as possible.

# Passing components as props
Another way to deal with state changes and expensive nested components is to pass components as props.

A component is a function that returns an element

const Parent = () => {
    return (
        <Child />
    )
}

const Parent = ({children}) => {
    return (
        {children}
    )
}

const Child = () => {
    return <h1> Hi </h1>
}

<Parent>
    <Child />
</Parent>

A component re-renders if there is a state change. If a component has state, and the state is updated then all nested components will be re-rendered, except if you pass the component as a prop to the component with state. 

1. The component function is called
2. Each element returned is diffed with Object.is(prev, next) 
3. If the object is the same -> the component is not rendered
4. If the object is different
    if type is same -> object re-rendered
    if type not same -> element is unmounted from the DOM and a new one is mounted

# Configuration Concerns

# Render Props

# When you need to use Memoization
Using render props causes all nested components to be re-rendered
```javascript

const ResizeDetector = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const width = window.getWidth()
        setWidth(width)
    }, [])

    return { 
        width
    }
}

const App = () => {
    return (
        <ResizeDetector>
            ({width}) => {
                width > 100 ? <Child /> : <Something />
            }
        </ResizeDetector>
    )
}

```