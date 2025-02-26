---
title: "What I learned working at a vertical farming company"
date: "2025-02-09"
excerpt: "It all felt like science fiction"
---

Each crop has a camera placed above it taking an image every five minutes.

Computer vision model that has been trained to detect if the plant is or is not a plant.

Computer vision model that has been trained to detect discoloration in the leaves. Red bounding box to detect.

Video service called Cyclops that takes the images and stitches them into videos.

We automatically alert systems or alert human operators to take action.

High throughput systems.

Resource allocation.

Highly available, fault tolerant.

FFmpeg

Oban broadcasting - ensuring data warehouse is up to date. 
Transactionality - Oban starts where tasks end - why Oban when elixir OTP out of the gate. 


Taken an initiative to help Identify db-connection and cpu utilization issues and lead efforts into
our Case Data retention.
2. Lead the Transshipping and Transplanting refactor projects
3. Document/understand the Transplanting flow - this include a deeper technical dive into the code
and a whimsical diagram.

Automating the Crop Transplanting Process
At Bowery Farming, I helped automate the manual process of transplanting crops by integrating a machine into the workflow. Previously, farm workers manually moved seedlings from trays to larger containers — a time-consuming, repetitive task prone to human error.

I collaborated closely with backend engineers and farm operators to design and implement a frontend interface that communicated with the transplanting machine. Using React and WebSockets, I built a real-time dashboard that displayed machine status, progress metrics, and error alerts. This allowed workers to monitor operations and intervene only when necessary.

By automating this workflow, we reduced transplanting time by X%, decreased human error, and freed up workers for more complex tasks. This project strengthened my ability to translate physical processes into intuitive digital interfaces, work with IoT devices, and contribute directly to efficiency gains.

Migrating an Application from Vue to React
I led the migration of a critical application from Vue to React, modernizing the codebase and improving maintainability. The app was central to farm operations, so the migration had to be seamless to avoid disruption.

I started by auditing the existing Vue components, mapping them to equivalent React patterns, and creating a phased migration plan to minimize downtime. I introduced React hooks, improved state management with Redux, and leveraged React Router for cleaner navigation.

The migration not only improved performance but also unified the tech stack, making it easier for engineers to contribute across projects. It also reduced bundle size by X%, speeding up load times. This experience honed my ability to make architectural decisions, lead incremental migrations, and balance short-term needs with long-term scalability.


Developing a frontent / backend data contract
At Bowery Farming, we struggled with data inconsistencies and evolving API requirements that slowed down frontend development. Our backend, built in Elixir, served REST endpoints, while the frontend used React. As features grew more complex, the lack of a clear, enforceable contract between the two caused frequent misalignment — small backend changes could break UI components, and frontend teams often had to wait for backend updates to test new features.

Solution:
I spearheaded the adoption of GraphQL to establish a well-defined data contract between the frontend and backend. This approach gave the frontend precise control over the data it needed, eliminating issues like over-fetching and under-fetching. On the backend, we leveraged Absinthe (GraphQL library for Elixir) to define the schema and resolvers, while on the frontend, we used Apollo Client to handle queries and mutations.

Process:

Schema Design: I collaborated closely with backend engineers to design the GraphQL schema, aligning it with domain models and ensuring it met real-time data needs.
Type Safety & Code Generation: We generated TypeScript types from the GraphQL schema, providing end-to-end type safety and reducing runtime errors.

Mocking & Parallel Development: Frontend teams could develop features against a mocked schema using Apollo's mocking tools, decoupling frontend and backend development cycles.
Performance Optimization: We optimized queries and used field-level resolvers in Absinthe to avoid N+1 query issues and improve response times.
Schema Versioning & Deprecation: To prevent breaking changes, we established a versioning strategy and used deprecation directives, enabling gradual migrations.

Result:
This shift to a GraphQL-based contract significantly improved development speed and system stability. The frontend team could iterate rapidly without waiting for backend changes, and production incidents due to data mismatches dropped dramatically. The clear, self-documenting schema also streamlined onboarding for new team members, making it easier to understand the data flow across the stack.



Dataloader - Elixir - to help batch and cache requests
GraphQL reduces over-fetching and under-fetching of data. It lets you define your data needs in queries, which can act as a "self-documenting" contract.

query GetPlant($id: ID!) {
  plant(id: $id) {
    name
    environment {
      temperature
      humidity
    }
  }
}


Fix re-rendering issues

Virtual DOM
