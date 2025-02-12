---
title: "Building a portfolio with NextJs"
date: "2025-01-09"
excerpt: "Building a collaboritive editing tool using Yjs, React, Y-Webrtc, and IndexedDb"
---

# How I Built My Portfolio Site with Next.js and Strapi

_Published on May 15, 2023_

![Next.js and Strapi logos](/images/nextjs-strapi.png)

As a developer, having a portfolio website is crucial for showcasing your skills and projects to potential employers or clients. In this blog post, I'll share my experience building my portfolio site using Next.js for the frontend and Strapi as the headless CMS for managing content.

## Why Next.js and Strapi?

Before diving into the development process, let me explain why I chose Next.js and Strapi for my portfolio site:

### Next.js

* **React-based**: Next.js is built on top of React, which I'm already familiar with and enjoy using.
* **Server-side rendering**: This improves performance and SEO, which is essential for a portfolio site.
* **Static site generation**: Next.js allows for static site generation, making the site fast and easily deployable.
* **Built-in routing**: Next.js provides a simple and intuitive routing system out of the box.

### Strapi

* **Headless CMS**: Strapi allows me to manage my content separately from the frontend, providing flexibility in how I display and use the data.
* **Customizable**: I can create custom content types and fields to fit my specific needs.
* **API-driven**: Strapi provides a RESTful API, making it easy to fetch data for my Next.js frontend.
* **Self-hosted**: I have full control over my data and can host it wherever I want.

## Setting Up the Project

### Next.js Setup

1. First, I created a new Next.js project using the following command:

```bash
npx create-next-app@latest my-portfolio