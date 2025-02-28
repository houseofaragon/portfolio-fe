---
title: "Building a local-first collaborative tool"
date: "2024-12-09"
excerpt: "Building a collaboritive editing tool using Yjs, React, Y-Webrtc, and IndexedDb"
---

# Building a local-first collaborative tool

This is my own personal journey into the field of local-first software and CRDT's (***C**onflict-free **R**eplicated Data **T**ypes* - an acronym I always have trouble remembering for some reason). 

I also walkthrough for how I built my own personal [digital garden](https://maggieappleton.com/garden-history/) which is a collaboritive editing tool solely used by myself and personal friends. I even have it hosted on my own [personal server](/posts/running-your-own-homelab)!

[garden-party.mp4](/images/garden-party.mp4)


A [digital garden](https://maggieappleton.com/garden-history/) is where ideas live and where ideas grow. Users write down thoughts, add links to things they want to share, add photos that inspire.

This particular digital garden is built with local-first software in mind which means your data is your own and data is stored primarily on your local machine - though it eventually can live in a central database. At it's core, its a distributed model.

This application is also built with the ethos of [home-cooked software](https://www.robinsloan.com/notes/home-cooked-app/). 

Home-cooked software is software you make for people you love, like a home cooked meal. You make it because it enriches your life, and not your pockets. Though if it lined your pocket, that couldn't hurt.


## Tenants of Local-first software

I learned about local-first software like many - via this Ink & Switch article [Local-first software You own your, data in spite of the cloud](https://www.inkandswitch.com/local-first/). The article explains "local-first software," which focuses on keeping your data on your device while still allowing you to collaborate online. It combines the convenience of cloud apps (like access from multiple devices) with the privacy of traditional software, using clever! tools to sync data smoothly without losing control or security.

1. **No spinners - meaning no waiting for requests.**
2. **Your work is not trapped on one device.**
3. **The network is optional.**
4. **Seamless collaboration with your colleagues.**
5. **The long now**
6. **Security and privacy by default**
7. **You retain ultimate ownership and control**

The *"You retain ultimate ownership and control"* is ultimately what peaked my interest in local-first. This should be a given with all software applications and it forced me to reflect on all the companies that own my data today. Google (drive, docs, photos, gmail), Notion, Apple, etc. etc.. 

Remember ... **There is no cloud, it's just someone else's computer** [source](https://www.chriswatterston.com/article/success-of-my-there-is-no-cloud-sticker?utm_source=redirect)

If any of these ceased to exist - would I have access to my data?

## Let's build a real-time digital garden
The rest of the blog with guide you through creating a React application that enables multiple users to collaborate on text documents, view media, and draw all in real-time.

**The main features**:
- Add text editors and edit text
- Add media types (videos)
- Draw on a canvas

**Tools used**:
- Yjs
- React
- Indexeddb

The full code in all its messy glory is [here](https://github.com/houseofaragon/digital-garden).



## Yjs

I chose to use Yjs mainly because I really enjoyed the dev community and it is written in javascript.

> Yjs is a high-performance CRDT for building collaborative applications that sync automatically.

> It exposes its internal CRDT model as shared data types that can be manipulated concurrently. Shared types are similar to common data types like Map and Array. They can be manipulated, fire events when changes happen, and automatically merge without merge conflicts.

Let's take a look at an example of what these shared types look like.

## Holding State via YDoc

In the context of Yjs, YDoc is the core data structure that holds shared state. It’s like a container where collaborative data lives. Remember, Yjs is a CRDT framework that makes it easy to build real-time collaborative applications, and YDocs are the backbone of that system.

In the digital garden application I need to keep track of users text they type into the text editor. We will be using Quill.

In the code below I initialize a **YDoc** - which is the main document container to hold all collaborative state. Then I create a root **YMap** to hold the text state in **docNodes**. For the record, I chose to use a map for the root state, so that I can hold other types of state, for example, storing strokes from the canvas. I can easily add `root.set("strokeNodes", strokNodes)`

```javascript
// App.tsx

// create YDoc instance
const ydoc = new Y.Doc();

// create a Ymap (key-value store)
const root = ydoc.getMap("root");

// create YArray (array store)
const docNodes = new Y.Array();

if (!root.has("docNodes")) {
  // attach document nodes to root
  root.set("docNodes", docNodes);
}
```

## Drag + Drop Quill Editor

In this application users can drag + drop new instances of Quill Editors to edit multiple docs at the same time.
This means that on top of storing the text, we need to keep track of the **x** and **y** position of the editor itself. For each new editor that is created we add it to the **root** in the ydoc we created.

```javascript
const addElement = (type: string, x: number, y: number) => {
  const id = uuidv4();
  const newDoc = new Y.Map({
    id,
    text: new Y.Text(),
    x,
    y,
  });

  ydoc.getMap("root").get("docNodes").push([newDoc]);
};
```

## Persisting data 

In this application I am using IndexedDB via Yj's `y-indexeddb`. We create a database called `digitial-garden-room` that will hold all the shared state persistently in the browser. When `synced` this means that when a user joins the session again, all the state will be synced from indexeddb - the browsers local database.

```javascript
import { IndexeddbPersistence } from "y-indexeddb";

useEffect(() => {
  const persistence = new IndexeddbPersistence("digital-garden-room", ydoc);

  persistence.on("synced", () => {
    updateDocumentList();
  });
}, [ydoc])

```

## Connection Provider (WebRTC)

Since this is a [home-cooked app](https://www.robinsloan.com/notes/home-cooked-app/) I know the users of the system will always remain within 2-5. This is the main reason I went with **y-webrtc** which is a connection provider for Yjs that synchronized shared state across clients using **WebRTC**. This means that users can collaborate in real time without relying on a central server for syncing data afer the initial connection.

**y-webrtc** is limited by the number of peers the web browser can create.

Clients connected to `digital-garden-room` which for now will be all of them share state updates.

```javascript
  const provider = new WebrtcProvider("digital-garden-room", ydoc);
```
```javascript
  <Editor document={document} ref={editorRef} provider={provider} />
```

When one peer updates yText via the Quill Editor, all connected peers will see the update. Yjs optimizes updates, sending only incremental changes rather than the full document state.

```javascript
  // in Editor.tsx
  const yText = document.get("text");
    const _binding = new QuillBinding(yText, quill, provider.awareness);
```

## Conclusion

There's still so much more to explore in this local-first field, but hopefully this walkthrough shows how easy it is to get started.

I'll definitely be keeping a close eye on this space and look forward to watching it evolve. Maybe i'll even contribute.