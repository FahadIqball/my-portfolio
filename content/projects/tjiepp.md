---
title: "Tjiepp"
summary: "A universal e-commerce and delivery platform allowing users to shop standard catalogs or purchase custom products from any third-party website via AI-powered URL scraping."
tech: ["React Native", "TypeScript", "AI Web Scraping", "Payment Gateways"]
github: "https://github.com/FahadIqball"
live: ""
role: "React Native Developer"
period: "2025"
layout: "split"
images:
  - "/images/projects/tjiepp/hero.png"
---

### Overview

**Tjiepp** is a hybrid e-commerce system that dismantles the barriers of traditional online cataloging. While users can purchase products from direct partner shops, they can also paste a URL from *any* store globally. The system uses AI scraping on the backend to automatically parse name, price, dimensions, and images, rendering it instantly as a purchasable cart item.

### The Challenge

Parsing unstructured HTML pages inside a webview sandbox or backend parser and converting it into validated, checkout-ready catalog items requires heavy schema validation.
1. **Dynamic Content Scraping**: Reading pricing from pages loading dynamic client-side Javascript.
2. **Checkout Integration**: Managing payments, currency conversions, and customs estimations for arbitrary items.

### My Role & Contributions

I designed the app integration for web view parsing and custom checkout options:

* **WebView Scraping Integration**: Built a React Native WebView implementation running custom Javascript injections to extract product details from pages.
* **AI Parser Bridging**: Connected the mobile frontend to AI extraction APIs, displaying extracted data to users for verification before payment.
* **Payment Gateways**: Integrated Stripe SDK and custom Apple Pay/Google Pay routines to handle dynamic transactions.

### Key Features

* **Universal Cart Checkout**: Put items from different global vendors into a single, unified shopping basket.
* **Smart URL Loader**: Paste any product page link, and the app builds the product page details page dynamically.
* **AI Catalog Extraction**: Auto-fills colors, sizing, and pricing models directly from arbitrary HTML.
