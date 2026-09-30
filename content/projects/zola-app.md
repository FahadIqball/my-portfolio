---
title: "Zola App"
summary: "A full-featured dating and social connection platform featuring real-time messaging, VoIP calling, and personality-based matching."
tech: ["React Native", "TypeScript", "Agora", "CallKeep", "WebSockets"]
github: "https://github.com/FahadIqball"
live: ""
role: "Lead Mobile Architect"
period: "2025"
layout: "split"
images:
  - "/images/projects/zola-app/screenshot1.png"
  - "/images/projects/zola-app/screenshot2.png"
---

### Overview

**Zola App** is a next-generation social discovery platform designed to facilitate deeper, personality-based connections. By combining rich real-time communication tools with dynamic matching algorithms, Zola goes beyond the simple "swipe right" mechanics to offer high-fidelity interaction.

### The Challenge

Building cross-platform real-time communications inside a React Native sandbox presents significant challenges:
1. **Low-Latency Signaling**: Maintaining instant chat status sync across unstable mobile connections.
2. **Background VoIP Calling**: Handling inbound VoIP alerts when the device is locked or the app is killed.
3. **Audio-Video Streams**: Syncing Agora RTC connections dynamically across both iOS and Android native containers.

### My Role & Contributions

As the Lead Mobile Architect, I engineered the application core from scratch, establishing a clean MVVM architecture structure. 

* **VoIP Architecture**: Engineered native integration hooks utilizing `react-native-callkeep` and Apple Push Notification service (APNs) / Firebase Cloud Messaging (FCM) to trigger background call screens.
* **Agora RTC Stream Integration**: Wrapped Agora's native C++ rendering context into reusable React components, managing viewport rendering layouts dynamically.
* **WebSocket client**: Implemented a custom WebSocket reconnect manager handling backoff, heartbeat intervals, and offline cache storage.

### Key Features

* **Real-time Match Routing**: Staggered personality surveys feed an API which generates dynamic user discovery grids.
* **VoIP Call Notification Manager**: Receives silent pushes to wake up the system background, showing full call layout screens.
* **Secure Direct Chat**: Encrypted room sockets with instant status signals (typing indicators, read receipts).
