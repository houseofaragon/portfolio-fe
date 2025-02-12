---
title: "WebRTC Video Chat Tutorial"
date: "2025-01-09"
excerpt: "Building a collaboritive editing tool using Yjs, React, Y-Webrtc, and IndexedDb"
---

**# WebRTC Video Chat Tutorial**

## Overview
This tutorial will guide you through building a simple WebRTC-based video chat application where multiple users can join a URL and see their video feeds in a grid.

## Tech Stack
- **Frontend**: React, WebRTC, PeerJS
- **Backend**: Node.js, Express, Socket.io
- **Signaling**: WebSockets via Socket.io
- **STUN/TURN**: Google STUN server (or Coturn for self-hosting)

---

## Step 1: Set Up the Full-Stack Project

### Install Dependencies
```sh
mkdir webrtc-video-chat && cd webrtc-video-chat
npm init -y
npm install express socket.io peer cors
npx create-react-app client
cd client
npm install peerjs socket.io-client
```

---

## Step 2: Set Up the Backend (Signaling Server)

### Create `server.js` in the Root Directory
```javascript
const express = require('express');
const { PeerServer } = require('peer');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Enable CORS to allow requests from frontend
app.use(cors());

// Create a PeerJS server to manage peer-to-peer connections
const peerServer = PeerServer({ port: 9000, path: '/' });

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // When a user joins a room, broadcast their presence
    socket.on('join-room', (roomId, userId) => {
        console.log(`User ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`User ${userId} disconnected`);
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));
```

### Explanation of the Server Code
1. **Setup**:
   - Creates an Express app and HTTP server.
   - Integrates Socket.io to handle real-time communication.
   - Uses CORS to allow frontend connections.

2. **PeerJS Server**:
   - Runs on port `9000` to help manage peer-to-peer WebRTC connections.

3. **Socket.io for Signaling**:
   - Listens for users joining a room and notifies existing users.
   - Handles disconnections and notifies the room members when a user leaves.

---

## Step 3: Set Up the Frontend (React + WebRTC)

### Modify `client/src/App.js`
```javascript
import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
const roomId = 'test-room';

function App() {
    const myVideoRef = useRef(null);
    const peersRef = useRef({});

    useEffect(() => {
        const peer = new Peer();

        peer.on('open', (id) => {
            socket.emit('join-room', roomId, id);
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (myVideoRef.current) myVideoRef.current.srcObject = stream;

                socket.on('user-connected', (userId) => {
                    const call = peer.call(userId, stream);
                    call.on('stream', (remoteStream) => {
                        addVideoStream(remoteStream, userId);
                    });
                });

                peer.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        addVideoStream(remoteStream, call.peer);
                    });
                });
            });
    }, []);

    function addVideoStream(stream, userId) {
        if (!peersRef.current[userId]) {
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            document.body.appendChild(videoElement);
            peersRef.current[userId] = videoElement;
        }
    }

    return (
        <div>
            <video ref={myVideoRef} autoPlay playsInline muted />
            <h2>WebRTC Video Chat</h2>
        </div>
    );
}

export default App;
```

### Explanation of the Frontend Code
1. **Setting Up WebSockets and PeerJS**:
   - Connects to the signaling server using Socket.io.
   - Creates a PeerJS instance to manage WebRTC connections.

2. **Handling Media Streams**:
   - Requests access to the user's webcam and microphone.
   - Displays the local video stream.

3. **Connecting to Other Users**:
   - When a user joins, they send their ID to the server.
   - The server notifies other users, who then attempt to establish a WebRTC connection using PeerJS.

4. **Handling Incoming Calls**:
   - When a user receives a call, they automatically answer and display the remote user's video feed.

5. **Dynamically Adding Video Elements**:
   - Creates a new `<video>` element for each remote user and appends it to the document.

---

## Step 4: Run the Application

### Start Backend
```sh
node server.js
```

### Start Frontend
```sh
cd client
npm start
```

Now, open multiple browser windows and visit `http://localhost:3000`. Each user should see themselves and any new users joining the room.

---

## Next Steps
- Add **Room Management** (Dynamic Room URLs)
- Implement **Screen Sharing**
- Add **Mute/Unmute & Video Toggle**
- Deploy to **Vercel (Frontend) + DigitalOcean/AWS (Backend)**

This setup gives you a fully functional WebRTC-based video chat in a **single project structure** with both frontend and backend together. 🚀

