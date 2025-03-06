---
title: "Crop Monitoring"
date: "2025-02-09"
excerpt: "Building a crop monitoring system."
---



Variations of these precision agriculture technologies are also hard at work within the framework of Bowery’s indoor vertical farms, which are powered by our proprietary operating system, the BoweryOS. The BoweryOS acts as the central nervous system of every one of our farms. It receives information and data through external “appendages” or hardware, makes decisions based on that information, and directs mechanical processes based on those decisions. This integration of hardware, sensors, computer vision, machine learning, and software is what powers each Bowery farm’s ability to grow continuously and harvest efficiently.

https://bowery.co/agriculture-technology-how-its-changig-the-future-of-farming/

indoor vertical farm that runs a lot of elixir

how do people think about knowledge

functional programming
the type of guidance that the compiler provides
functional idioms
what is a pure function - why might it be useful

team processes - pairing - code review - how does building software with other people look like?

distributed systems (erlang/elixir) 
observability 
which processes are using what memory?
what sockets are they sitting on top of?

writer's retreat for programmers

seeing the farm - turning lights on/off, scanners, cameras, sensors

How we're using elixir?

Food security - farm your own food.
farms close to distribution hubs.

How are we using Elixir?
- BoweryOs was built on Rails -
- Nerves - devices that can do controlling and sensing
- User interfaces - to perform different tasks and manage crop lifecycles

~ clustering between farms
~ machine integration 
~ BoweryOS - all on Elixir - apps that are distributed in the cloud and on prem

What Elixir wins you?
- angel armstrong - how actor model provides good run time concurrency abstraction - physical processes - 
- real time features (phoenix + pubsub)
- can catch many typos by just ensuring a program compiles
- quality of libraries (ecto + phoenix) - high-level API's w/ good escape hatches

- versatility of ecosystem - didn't need specialized skills to build embedded systems. Nerves - tricks web devs to be embedded systems engineers. Can onboard engineers quickly.
- elixir school 

taking reg web dev and turning them into embedded system engineers

- Concurrency
    - 
- Real time
    - seeing a page that is reflecting current state 
    - physical device that is healthy - and having web page real time state - for streamlining physical workflows
    - observable physical state
    - websockets 
    - end user benefit
    - LiveView 

Joe Armstrong - object orientation didn't actually capture an accurate model of reality of the work -- but messaging between actors - reality is more immediate. 

Dashboards 
- alert when devices are down 
- sensors are off

Telemetry 



What did i do at bowery? 

I built applications that enabled farm task workflows in the farm. So it was a heavy data operation - where every little thing about a crop was tracked and monitored.

https://elixirforum.com/t/how-to-define-frontend-backend-contract-with-elixir-typescript/40466/11

My first

add up the cost of your mistake, that's basically the dollar value of the training you just received...you're now guaranteed to never make that mistake again so why would you be punished

What I did:
1. formalized a frontend and backend data contract: a formal agreement

- Full stack engineer working on a web application for management and improvement of farm workflows using React.js/ Typescript and Elixir

- Contributed to a variety of systems that integrate with Farm Workflow Management. 
- Implemented a Role Based Access Control layer to allow for deployment of Critical System Control features to safely manage farm resources. 
- Drafted project proposals that evaluated new and reconsidered old technology to align with software deployment needs of the company.

Implemented improvements to User Interfaces run on Android devices using a variety of technologies including Elixir, Phoenix LiveView, GraphQL, React, Vue.js.


 Led full-stack development and redesign of the assets workflow in support of Runway’s new enterprise-focused features