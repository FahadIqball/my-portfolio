---
title: "Ziuu"
summary: "A dual-sided mobile marketplace application for gas cylinder and water can ordering, tracking, and fulfillment built with React Native and TypeScript."
tech: ["React Native", "TypeScript", "Google Maps API", "Push Notifications"]
github: "https://github.com/FahadIqball"
live: ""
role: "Lead Mobile Developer"
period: "2024"
---

### Overview

**Ziuu** is a specialized logistics marketplace providing real-time ordering and delivery of heavy household essentials, specifically gas cylinders and water canisters. The platform features two core mobile products: a Customer App for ordering and tracking, and a Driver App for task assignment, route calculation, and order fulfillment.

### The Challenge

Logistics apps require persistent location synchronization, seamless map displays, and instant notification updates. 
1. **Background Location Sync**: Driver tracking must run continuously in the background without draining the device battery.
2. **Double-Ended Sync**: Orders must transition instantly from the customer portal to the nearest available driver's dashboard.

### My Role & Contributions

I served as the Lead Developer responsible for building the twin application packages:

* **Dual Interface System**: Created a single codebase split configuring both customer and driver modes using dynamic environment variables and configurations.
* **Map Tracking Engine**: Integrated the Google Maps API, drawing live routes, vehicle markers, and computing ETA estimations.
* **Location Processing**: Implemented native location hooks using `react-native-background-actions` and background location APIs to transmit telemetry updates.

### Key Features

* **Live Order Dispatching**: Dispatches order cards to drivers based on geographical proximity.
* **Interactive Live Map**: Customers can see the delivery vehicle move towards their home in real-time.
* **Seamless Push Alerts**: Automatically updates clients on order acceptance, departure, and arrival.
