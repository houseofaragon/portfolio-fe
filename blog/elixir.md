---
title: "Running your own private server"
date: "2024-12-09"
excerpt: ""
---

# React with Phoenix + Absinthe Backend

to Liveview

liveview
vue

https://podcast.thinkingelixir.com/156

Honestly, a Phoenix back-end (with REST or GraphQL API endpoints and Phoenix Channels for web-socket stuff) and a React (etc.) front-end is a very fine way to build software. No shame in that game.


Currently we have migrated most of the app to a GraphQL API using Absinthe and the UI calls such graphql with Apollo.

It’s even simpler for us to develop features so an engineer can focus on the frontend and another one in the backend.

Frontend Backend Data Contract
Graphql

# Hacker news
https://news.ycombinator.com/item?id=36414037

I recently converted an entire React / TypeScript frontend to LiveView (will open-source the project soon). I've gone much faster with LiveView. Something which use to take me 4-5 weeks to build with React / TypeScript now takes 4-5 days.
The main reason for that is, the LiveView test framework is super simple to work with. I didn't write any tests when I was doing React / TypeScript just because it seemed so cumbersome to setup. Having a test suite that works out of the box made me write more tests for my front-end.

Not having to build API endpoints for my react components is also a huge accelerator in productivity.

In the end I ended up writing less code, with more polished / well tested front-end.

You can watch the video of what I built with LiveView here https://instellar.app


https://elixirforum.com/t/elixirconf-2023-tim-gremore-replacing-react-how-liveview-solved-our-performance-problems/61104?utm_source=elixir-merge


1. Centralizing state management on the server
2. Achieve faster real-time updates with less client-side Javascript
3. Server-rendered HTML


Component system

Yes, discussing a migration from React to LiveView can be a strong example, even for a React-focused role — if framed correctly. It highlights your ability to make architectural decisions, understand trade-offs, and think about long-term system design. Let’s break it down:

Technical Breadth: You can explain why the migration was necessary. For example, if the goal was to simplify state management, reduce client-side complexity, or improve real-time performance, those are valuable insights. Even if the company primarily uses React, showing that you can evaluate and choose the right tool for the job is impressive.

React Knowledge: You can frame the migration by discussing the challenges you faced with React — maybe the app had performance bottlenecks, or SSR complexities that LiveView solved. This lets you show deep knowledge of React's limitations and how to mitigate them, which is valuable even if the company sticks with React.

Leadership & Collaboration: Migrations are complex and require coordination across teams. You can highlight how you guided the team, communicated trade-offs, trained engineers on LiveView, or incrementally rolled out the migration to minimize risk.

Adaptability & Learning: Talking about moving to LiveView shows you’re not tied to a single framework. Companies value engineers who can adapt to new tech when needed, and it demonstrates that your engineering decisions are guided by the product's needs rather than personal preference.

If you want to tailor this for a React-heavy role, you might want to frame the migration as something you carefully considered, weighing whether React could be optimized before ultimately deciding on LiveView. Or, you could even mention scenarios where you’d recommend sticking with React (e.g., for highly interactive UIs or complex component state), reinforcing your React expertise.

That’s even better — it adds a concrete technical reason for the migration, not just a team preference! You can frame this as solving a systemic issue through thoughtful architecture. Let’s refine the narrative:

Context and Problem Statement:

The app was built with React on the frontend and Phoenix on the backend.
It served as a UI for searching and managing vertical farming data (crops, trays, tasks, etc.).
The React frontend had frequent issues with the frontend-backend data contract:
API changes required constant coordination between teams.
Mismatches or versioning issues led to bugs and slower development.
State had to be carefully synchronized between client and server, adding complexity.
Decision to Migrate:

Chose to migrate to Phoenix LiveView to eliminate the API layer complexity and data contract issues.
LiveView let the UI render directly from server-side templates, reducing the need for manual API handling.
The real-time nature of LiveView was a natural fit for database-driven views, as updates could propagate automatically.
Migration Process:

Incrementally migrated features, starting with simpler views.
Consolidated data logic entirely in the backend, so the UI always reflected the server state.
Reduced the amount of frontend state management and eliminated API-handling boilerplate.
Outcome and Impact:

Eliminated data contract issues, as the UI and server shared the same code and data structures.
Reduced bugs and sped up development since engineers no longer had to coordinate API changes.
Simplified the architecture, making it easier to onboard new engineers (especially those already familiar with Elixir).
What You’d Do Differently (or Key Takeaways):

Acknowledge trade-offs: LiveView simplifies most cases but might not be ideal for highly interactive, client-heavy features.
Emphasize the value of alignment between team skill sets and technology choices — balancing developer experience with product needs.
This frames you as someone who understands both technical and organizational factors, and who can lead migrations that genuinely improve productivity and system health.


If you want to present a balanced view — which can show thoughtful decision-making — it’s smart to acknowledge situations where sticking with React might be a better choice. Here are some arguments for keeping React, especially in a context like yours:

Highly Interactive UIs:

React shines for complex, interactive components (e.g., drag-and-drop interfaces, rich text editors) where frequent small UI updates are needed without round-tripping to the server.
Client-Side Performance & Offline Capabilities:

React apps can handle interactions locally, reducing server load and enabling offline features with service workers. For apps that need to work even when disconnected, a purely server-driven model like LiveView might not be ideal.
Ecosystem & Libraries:

React’s massive ecosystem provides access to a wealth of third-party libraries (charts, forms, state management, etc.) that might not have LiveView equivalents or would be more effort to re-implement.
Scalability for Large Teams:

In larger teams, a clear separation between frontend and backend can allow more parallel work. While LiveView simplifies development, it might introduce bottlenecks if frontend and backend teams need to coordinate tightly.
Granular State Management:

For apps where state changes frequently and independently across components, React's local component state or libraries like Redux/Zustand provide fine-grained control. LiveView's state is centralized on the server, which could cause unnecessary re-renders for certain patterns.
Component Reusability & Design Systems:

React’s component model is incredibly powerful for building and sharing reusable UI components across projects. If your app relied heavily on component libraries or design systems, React might offer more flexibility.
Progressive Enhancement & Partial Adoption:

React can be incrementally adopted in an existing app, making it easier to modernize specific parts of a UI without a full rewrite. LiveView often encourages a more holistic shift to server-side rendering.
Front-End-Heavy Apps:

For apps where users expect immediate, local feedback (like a real-time collaborative editor or complex dashboards), React (or a hybrid approach) might provide a snappier user experience compared to LiveView’s server round-trips.
In your interview, you might say something like:

"React is still a great choice for apps with highly interactive elements or when leveraging the rich library ecosystem is essential. In our case, the simplicity of LiveView and the benefits of eliminating API contracts outweighed the downsides — but if the app had required more complex client-side logic, I would have considered a hybrid approach or stuck with React."



Why I was hesitant about this migration.

Liveview communicates near-realtime events and state changes over WebSockets - so that means you can validate form inputs as the user types which also means more latency. But the latency of LiveView should typically be lower than doing things over a full HTTP requests and responses - since Liveview runs over an open Websocket.
For anything that requires a server roundtrip, we can expect lower latencies with Liveview than the normal REST-driven SPA apps.

Liveview sends as little data as possible by initially calculating what parts of a template can change and then only sending diffs when state does change. This means it would send less data than a typical JSON payload to achieve a change.

Liveview enables you to build client apps for the browser in Elixir with minimal amounts of JS (you still need some). It is ideal for real-time applications since it uses WebSockets under the hood.

It is a Server Side Renderer. All stateful server side rendering frameworks will have a few features/contraints



https://think-it.io/insights/vertical-farming-infrastructure

Rendering Speed.
Excessive re-renders in React.

Built and maintained a unified
System Integration: Advanced technology is essential for monitoring and optimizing growing conditions. Integrating various systems for environmental control, nutrient delivery, and data collection can be complex and error-prone.

Real-time Monitoring and Decision Making: There's a necessity for sophisticated software that can process data in real-time and provide actionable insights for optimal crop management.

Real-time Monitoring and Decision Making Solution:

The platform supports real-time data processing and analytics, enabling vertical farms to monitor their operations continuously and make informed decisions promptly. By integrating with IoT devices and sensors, it can ingest real-time data streams and apply machine learning models to predict crop health, optimize resource usage, and enhance overall productivity. The ability to provide actionable insights in real-time ensures that farms can respond swiftly to any changes in growing conditions.


Frontend Performance
- Load Times: Slow page loads, large asset sizes, or unoptimized images and scripts.
- nRendering Speed: Inefficient DOM manipulations, excessive re-renders in frameworks like React.
- Network Latency: Delays caused by large API payloads or too many server requests.
- Memory Leaks: Unreleased resources that degrade performance over time.


 REST is a framework on how to structure APIs over HTTP. GraphQL doesn't tell you how to structure your APIs and doesn't care about the transport method.