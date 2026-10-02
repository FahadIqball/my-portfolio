---
title: "Miss Stitch — Bespoke Luxury Ethnic E-Commerce & Atelier Management"
summary: "A full-stack luxury Pakistani couture platform bridging unstitched designer fabrics with bespoke made-to-measure tailoring, featuring role-based workshop operations, real-time tailoring lifecycle tracking, and localized payment reconciliation built with Next.js 16, React 19, Supabase, and Tailwind CSS."
tech:
  - "Next.js 16 (App Router)"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS v4"
  - "Supabase (PostgreSQL & RLS)"
  - "Zustand"
  - "Resend API"
  - "Server Actions"
github: "https://github.com/FahadIqball/Miss-Stitch-Web"
live: "https://miss-stitch.vercel.app"
role: "Full Stack Architect & Lead Developer"
period: "2026"
layout: "split"
images:
  - "/images/projects/miss-stitch/missstitch1.png"
  - "/images/projects/miss-stitch/missstitch2.png"
---

## Overview
Miss Stitch is an end-to-end bespoke luxury ethnic e-commerce platform and workshop atelier operations system designed to modernize Pakistani haute couture. In traditional South Asian fashion retail, purchasing unstitched luxury lawn, chiffon, and velvet suits online forces customers—particularly in the overseas diaspora across North America, the UK, and the Gulf—to navigate the friction of finding trusted master tailors, providing physical measurements, and guessing stitching quality. Miss Stitch solves this by integrating high-fashion retail directly with a full-service tailoring atelier (*karkhana*), allowing customers to buy unstitched fabric or order tailored outfits customized to their exact measurements and luxury finishing specifications.

The platform serves two distinct user personas: fashion-forward domestic and diaspora shoppers seeking seamless sizing customization, and atelier workshop staff (administrators and master tailors) managing custom cutting queues, manual payment audits, and localized courier dispatches. 

Architecturally, the application is built on **Next.js 16 (App Router)** and **React 19**, powered by **Supabase PostgreSQL** with Row-Level Security (RLS), **Tailwind CSS v4**, and **Zustand** client state stores. Engineered for a **100% free-tier architecture** ($0 operating cost across Supabase, Vercel, and Resend), it features an adaptive data layer that delivers dynamic PostgreSQL updates while preserving instantaneous static fallbacks if cloud services are offline or paused.

## The Challenge
* **Complex Multi-Variant Sizing & Pricing Matrix**: Unlike standard apparel e-commerce with static SKU pricing, Miss Stitch requires dynamic pricing combinations per line item: base fabric cost, bespoke stitching modes (unstitched, standard XS–XXL, or made-to-measure custom fit), and granular artisan finishing add-ons (cotton/silk *shameez* lining, *pico/patti/latkan* tassels, sleeve linings).
* **Client-Side Price Tampering Prevention**: Because users can toggle complex measurement parameters, finishing options, and localized coupon discounts (`FESTIVE10`, `SILAI500`), all cart calculation logic had to be executed and strictly verified server-side inside Server Actions to prevent price manipulation vulnerabilities.
* **Pakistani Payment Gateway & Proof Verification Friction**: Operating in a market dominated by Cash on Delivery (COD), Inter-Bank Funds Transfers (IBFT), and mobile wallets (JazzCash, EasyPaisa) required designing an asynchronous payment verification engine with mandatory Transaction ID (TID) validation, base64 receipt screenshot uploads, and an administrative approval workflow.
* **Physical Workshop Integration (*Karkhana* Workflow)**: Bridging digital orders with physical cutting tables required a specialized role-based operations portal (`admin` vs. `tailor`), stage-by-stage *Silai* lifecycle state machines (`order_placed` → `fabric_cut` → `tailor_stitching` → `quality_check` → `dispatched` → `delivered`), and printable 8.5x11 Master Tailor Job Cards (*کارخانہ پرچی*).
* **Zero-Touch Role Elevation & RBAC Protection**: Bootstrapping initial administrative privileges without exposing open privilege escalation endpoints, backed by database triggers on `auth.users` and server-side self-demotion prevention guards.

## My Role & Contributions
### Architecture & Infrastructure
* **Next.js 16 App Router & Server Actions**: Architected the full-stack system utilizing React Server Components for SEO-indexed catalog browsing and Incremental Static Regeneration (ISR), coupled with type-safe Server Actions for mutating orders, inventory, and CMS content.
* **Relational Database & RLS Security**: Designed the Supabase PostgreSQL schema spanning `profiles`, `products`, `orders`, `order_items`, `sizing_profiles`, and `site_content`. Implemented granular Row-Level Security (RLS) policies isolating user data and restricting catalog/order mutation to verified admin sessions.
* **Storage CDN Buckets**: Configured Supabase Storage buckets (`product-media` and `payment-receipts`) with public CDN distribution for optimized web images and secured bucket policies for customer transaction slips.
* **Resend Transactional Email Engine**: Built a reactive email notification subsystem with responsive HTML/CSS templates dispatching branded order confirmations, IBFT payment verification receipts, and dispatch notices with courier tracking links.
* **Zustand Client State Architecture**: Engineered decoupled client stores for Cart state (handling bespoke stitching calculation and local persistence), Multi-Currency conversion (PKR, USD, GBP, AED), Customer Measurement Vault, and Wishlist.

### Core Features Implementation
* **Atelier Measurement Studio & Sizing Vault**:
  * Interactive modal allowing shoppers to enter exact body measurements (shirt length, chest, waist, hips, shoulder, sleeve length, armhole, neck depth, and trouser styles like cigarette, bell bottom, or tulip *shalwar*).
  * Persistent Customer Sizing Vault allowing authenticated users to save named measurement profiles (e.g., "My Standard Fit", "Formal Eid Cut") for 1-click reordering.
* **1-Page Express Pakistani Checkout**:
  * Localized address validation with Pakistani mobile phone regex enforcement (`+92 / 03xx`).
  * Dynamic payment selector supporting COD, Debit/Credit Card, IBFT Direct Bank Transfer, and JazzCash/EasyPaisa with embedded recipient bank details, QR displays, and receipt screenshot uploaders.
  * Server-side coupon verification and automated nationwide free-shipping rules.
* **Workshop Operations & Silai Management Portal (`/admin`)**:
  * **Master Silai Queue**: Real-time order monitoring categorized by production status with 1-click status advancing.
  * **IBFT Receipt Audit**: Dedicated verification modal displaying customer transaction slips alongside banking details with instant approve/reject actions.
  * **Printable Tailor Job Cards**: A dedicated print stylesheet (`/print-job-card`) transforming digital orders into a bilingual workshop job card (*کارخانہ پرچی*) formatted for physical clipboard printing.
* **Visual Content CMS & Product Studio (`/admin/content` & `/admin/products/new`)**:
  * Live visual CMS empowering non-technical workshop staff to edit hero banner sliders, announcement tickers, and category rails with live hydration.
  * Atelier product creation studio featuring base64 image uploading directly to Supabase Storage CDN, fabric composition tags, and box contents breakdown.
* **Public Order & Silai Progress Tracker (`/track-order`)**:
  * Customer-facing real-time tracking interface displaying visual timeline steppers from fabric cutting to courier handoff (TCS, Leopards, CallCourier, DHL).

## Key Technical Achievements & Learnings
* **Dual-Mode Resilient Data Layer**: Engineered catalog and content actions to query live Supabase PostgreSQL tables with automatic fallback to static seed structures if external database connections are offline, ensuring 100% storefront uptime and seamless zero-config local demos.
* **Server-Authoritative Pricing Guarantee**: Completely abstracted price computation away from client state. Even if client-side payloads are manipulated, Server Actions recalculate each suit's base price, selected stitching mode tariff, addon fees, and coupon deductions against the live database before writing to PostgreSQL.
* **Optimistic UI with Confetti Micro-Interactions**: Integrated smooth drawer interactions, optimistic cart adjustments, and canvas confetti checkout celebrations for a premium, high-touch luxury user experience.
* **Zero-Operating-Cost Full Stack Deployment**: Achieved high-performance enterprise-grade scalability on completely free-tier serverless infrastructure without sacrificing relational data integrity or real-time storage capabilities.

## Live Demo & Resources
* **Live Web Application**: [https://miss-stitch.vercel.app](https://miss-stitch.vercel.app)
* **GitHub Repository**: [https://github.com/FahadIqball/Miss-Stitch-Web](https://github.com/FahadIqball/Miss-Stitch-Web)
* **Platform Availability**: Modern Web (Fully responsive desktop, tablet, and mobile web app)
