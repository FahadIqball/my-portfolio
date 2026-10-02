---
title: "Miss Stitch"
summary: "A full-stack bespoke luxury ethnic e-commerce platform and atelier operations system combining designer fabrics with custom made-to-measure tailoring."
tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Zustand"]
github: "https://github.com/FahadIqball/Miss-Stitch-Web"
live: "https://miss-stitch-web.vercel.app/"
role: "Full Stack Developer"
period: "2026"
layout: "split"
images:
  - "/images/projects/miss-stitch/missstitch1.png"
  - "/images/projects/miss-stitch/missstitch2.png"
---

### Overview

**Miss Stitch** is an end-to-end bespoke luxury fashion e-commerce platform that connects unstitched designer fabrics with full-service custom tailoring. Customers can purchase unstitched fabrics or order completely customized outfits tailored to their exact measurements and finishing preferences. The platform also includes a dedicated workshop atelier portal for tailors and administrators to manage cutting queues, verify payments, and process orders.

### The Challenge

1. **Custom Sizing & Dynamic Pricing**: Handling complex pricing variations per item (base fabric cost, custom sizing, and add-ons like linings or tassels) while keeping calculations strictly verified server-side.
2. **Flexible Payment Verification**: Managing localized payment methods (Cash on Delivery, direct bank transfers, and mobile wallets) with an audit flow for customer receipt uploads.
3. **Workshop Workflow**: Bridging online customer orders with physical cutting and stitching queues through an easy-to-use operations interface.

### My Role & Contributions

* **Full-Stack Architecture**: Built the application with Next.js 16 App Router and React 19, backed by Supabase PostgreSQL with Row-Level Security (RLS) for secure, high-performance data access.
* **Custom Measurement Engine**: Designed an interactive sizing modal and saved measurement vault, allowing users to save their personalized measurements for one-click reordering.
* **Workshop Operations Portal**: Created a dedicated admin dashboard for workshop staff to track orders through every stage (fabric cut, stitching, quality check, and dispatch).
* **Payment & Order Audit**: Developed a streamlined checkout and payment verification workflow with automated email notifications via Resend.

### Key Features

* **Bespoke Measurement Studio**: Save and select custom sizing profiles for shirts, trousers, and custom styling options.
* **Real-Time Order Tracking**: Visual progress tracker showing customers the exact stage of their custom outfit.
* **Express Checkout**: Quick 1-page checkout supporting multi-currency, coupon codes, and bank transfer receipt uploads.
* **Printable Tailor Job Cards**: Clean printable job sheets formatted for physical workshop clipboards.
