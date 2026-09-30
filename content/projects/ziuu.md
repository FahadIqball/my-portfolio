---
title: "ZiuuGas"
summary: "A comprehensive cross-platform mobile marketplace application for gas delivery and automotive accessories, featuring multi-role support (customers, delivery partners, promoters) with real-time order tracking, advanced payment integration, and serverless backend infrastructure"
tech: ["React Native", "TypeScript", "Swift", "Firebase", "Firestore", "FCM", "Vercel", "Google Ads", "ImageKit", "React Navigation", "Zustand"]
github: "https://github.com/FahadIqball/ZiuuGas"
role: "Full Stack Mobile Developer & Product Architect"
period: "2025-Present"
layout: "split"
images:
  - "/images/projects/ziuu/screenshot1.png"
  - "/images/projects/ziuu/screenshot2.png"
---

## Overview

**ZiuuGas** is a sophisticated cross-platform mobile marketplace application built with React Native that enables customers to order gas cylinders and automotive accessories with real-time delivery tracking. The platform supports multiple user roles (customers, delivery partners, promoters) and features advanced e-commerce capabilities, Firebase-powered authentication, real-time database synchronization, and a serverless Vercel backend for notifications and media management.

## The Challenge

Building a scalable multi-platform marketplace required solving several complex architectural problems:

- **Multi-role Authorization**: Different user types (customer, seller, delivery partner, promoter) with distinct screens and capabilities
- **Real-time Synchronization**: Instant order status updates, notifications, and inventory changes across distributed users
- **Payment Integration**: Secure transaction handling with multiple payment providers
- **Performance Optimization**: Managing hundreds of products and concurrent users without degradation
- **Scalability**: Building infrastructure to handle growth without backend bottlenecks

## My Role & Contributions

### Architecture & Infrastructure Design
- Established Firebase ecosystem integration (Authentication, Firestore, Cloud Messaging, Storage)
- Built serverless Vercel backend for FCM push notifications and ImageKit authentication
- Designed role-based navigation system supporting customer, seller, delivery partner, and promoter flows
- Created reusable component library with unified design system

### Core Features Implementation

**Customer Features**:
- **HomeScreen**: Product catalog with category filtering, search functionality, and dynamic filtering
- **Product Discovery**: Featured products, accessories, gas cylinders with detailed information
- **Cart & Checkout**: Multi-item cart management with payment integration
- **Order Tracking**: Real-time GPS-based delivery tracking with map integration using React Native Maps
- **Order Management**: Order history, status tracking, cancellation, and reviews
- **Notifications**: Real-time push notifications using Firebase Cloud Messaging

**Marketplace Features**:
- **Offers System**: Customers request custom offers, sellers respond with pricing
- **Product Reviews & Ratings**: Community-driven ratings and reviews
- **Wallet System**: Digital wallet for transactions and earnings tracking
- **Address Management**: Multiple saved addresses for convenient checkout

**Seller Features**:
- **Inventory Management**: Add, edit, delete products in real-time
- **Order Management**: Accept/reject orders, manage fulfillment
- **Analytics Dashboard**: Sales metrics, earnings tracking, performance insights
- **Notifications**: Real-time order alerts and customer messages

**Delivery Partner Features**:
- **Active Deliveries**: Queue of assigned deliveries with priority management
- **Delivery Confirmation**: Photo evidence, signature capture, delivery updates
- **Earnings Dashboard**: Real-time earnings tracking and payout management
- **Route Optimization**: Efficient delivery route suggestions

**Promoter Features**:
- **Referral Tracking**: Unique referral codes, network metrics
- **Commission Management**: Real-time commission calculation
- **Payout System**: Scheduled payouts and earnings history
- **Network Analytics**: Referral performance and conversion metrics

## Challenges Overcome

1. **Multi-Role Complexity**: Implemented flexible navigation system supporting 4+ user roles with distinct feature sets
2. **Real-Time Synchronization**: Leveraged Firestore listeners for instant data synchronization across users
3. **Payment Security**: Integrated secure payment gateways with PCI compliance
4. **Scale & Growth**: Serverless architecture for automatic scaling without infrastructure management
5. **Localization**: Type-safe i18n system supporting multiple languages and regional variations

## Advanced Features

- **Real-time Notifications**: Firebase Cloud Messaging integration for push notifications
- **Geolocation Tracking**: GPS-based delivery tracking with map visualization
- **Image Optimization**: ImageKit integration for responsive image delivery
- **Monetization**: Google Mobile Ads integration for revenue generation
- **Serverless Backend**: Vercel functions for scalable microservices

## Project Impact

- **Scalable Architecture**: Supports thousands of concurrent users
- **Real-Time Features**: Instant order updates and notifications
- **Monetization**: Multiple revenue streams (commissions, ads, subscriptions)
- **User Growth**: Referral system driving organic growth
- **Operational Efficiency**: Automated delivery assignment and optimization

## Live Demo & Resources

- **GitHub**: [FahadIqball/ZiuuGas](https://github.com/FahadIqball/ZiuuGas)
- **Type**: Private repository (proprietary mobile application)
- **Status**: Active development and deployment
