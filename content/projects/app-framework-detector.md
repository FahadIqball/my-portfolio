---
title: "App Framework Detector"
summary: "Advanced Android app intelligence tool that detects mobile application frameworks and libraries through deep APK scanning, signature matching, and metadata analysis"
tech: ["React Native", "TypeScript", "Kotlin", "Android", "APK Analysis", "Cross-Platform Mobile"]
github: "https://github.com/FahadIqball/AppFrameworkDetector"
live: "https://appetize.io/app/b_zht6uqrwhetakondaz3ebcj33e"
role: "Full Stack Mobile Developer & Security Researcher"
period: "2024-2025"
layout: "split"
images:
  - "/images/projects/app-framework-detector/screenshot1.png"
  - "/images/projects/app-framework-detector/screenshot2.png"
---

## Overview

**App Framework Detector** is a sophisticated Android mobile application that enables developers, security researchers, and analysts to identify the underlying mobile development frameworks and third-party libraries integrated within any Android app. Built with React Native for the frontend and Kotlin for native Android capabilities, this tool performs deep analysis of APK packages to extract valuable intelligence about app composition and dependencies.

## The Challenge

Android applications built with obfuscation techniques (ProGuard, R8) remove standard symbol tables and package naming conventions, making direct identification impossible. Detecting specific framework integrations and SDK usage requires:

- **Deep APK scanning** through multiple abstraction layers
- **Pattern matching** across various package structures and asset layouts
- **Metadata extraction** from compiled Dart snapshots, React Native bundles, and native libraries
- **Version identification** from disparate source files and configuration structures

## My Role & Contributions

### Full-Stack Architecture Design
- Architected the complete cross-platform solution bridging React Native (TypeScript) frontend with native Kotlin backend
- Designed bridge-based communication protocol between JavaScript and native Android modules using React Native Bridge
- Implemented comprehensive error handling and fallback mechanisms for graceful degradation

### Core Detection Engine
**Signature-Matching & Analysis System** (`DetectorModule.kt`):
- **Framework Detection Pipeline**: Scans APK archives for framework-specific artifacts
  - Flutter detection via `libflutter.so` and asset structures
  - React Native detection via `libreactnativejni.so` and `index.android.bundle` files
  - Native/Unknown app classification for unidentified frameworks
- **Multi-layered Package Extraction**: Implemented 7-point scanning strategy

**Flutter Package Detection**:
1. `pubspec.lock` YAML parsing with SnakeYAML library for dependency resolution
2. Asset folder hierarchy scanning (`assets/packages/*`, `flutter_assets/packages/*`)
3. Binary library detection (`.so` files with package name pattern matching)
4. META-INF signature file parsing
5. Dart snapshot binary analysis (`libapp.so`, `app.dill`, `kernel_blob.bin`)
6. Package reference extraction from snapshot content via regex patterns
7. Asset file content scanning for embedded package references

**React Native Package Detection**:
- JavaScript bundle parsing from `index.android.bundle`
- Multiple regex patterns to capture package imports:
  - CommonJS `require()` statements
  - ES6 `import...from` declarations
  - Metro bundler function markers `__d('package'...)`
  - Scoped packages (`@scope/package` format)
- Native module detection via compiled `.so` library scanning
- META-INF signature file analysis

### Technical Implementations

**Native Integration**:
- React Native Bridge module for Java/Kotlin interoperability
- APK file access via PackageManager and ZipFile APIs
- Drawable-to-Base64 conversion for icon serialization
- Error recovery and defensive programming patterns

## Key Features Implemented

### Core Capabilities

1. **Instant Framework Detection**
   - Recognizes Flutter, React Native, React, and Native Java/Kotlin apps in seconds
   - Scans 100+ installed applications on-device
   - Provides real-time framework identification with visual indicators

2. **Deep Dependency Fingerprinting**
   - Extracts 50+ package dependencies per app
   - Identifies version information where available
   - Discovers both direct and transitive dependencies
   - Finds obfuscated library references through multi-layer analysis

3. **Comprehensive Metadata Auditing**
   - Extracts application metadata (names, icons, package names)
   - Discovers native library usage and binary modules
   - Parses configuration files and signature manifests
   - Identifies development framework specifics

## Challenges Overcome

1. **APK Format Complexity**: Navigated the complexities of DEX files, asset folders, and binary formats within APK archives
2. **Framework Variations**: Handled multiple packaging strategies across Flutter, React Native, and native apps
3. **Performance**: Optimized scanning algorithm to handle 100+ apps without UI blocking
4. **Error Handling**: Built robust error recovery for inaccessible apps and corrupted APK structures
5. **Type Safety**: Established comprehensive TypeScript types bridging JavaScript and native layers

## Learning Outcomes

- Deep expertise in Android APK internals and package structure analysis
- Advanced React Native performance optimization techniques
- Native module development and React Native Bridge integration
- Security research methodologies for app reverse engineering

## Live Demo & Resources

- **Demo**: [Appetize.io Interactive Demo](https://appetize.io/app/b_zht6uqrwhetakondaz3ebcj33e)
- **GitHub**: [FahadIqball/AppFrameworkDetector](https://github.com/FahadIqball/AppFrameworkDetector)
- **Documentation**: Complete README with setup instructions and prerequisites

