---
title: "Killed-State Call Lifecycle Fixes"
date: "2026-07-12"
type: "note"
excerpt: "Resolving issues surrounding incoming calls received while the app is in a killed (quit) state, ensuring seamless transitions from native notifications."
tags: ["React Native", "CallKeep", "Agora", "Lifecycle"]
---

# Killed-State Call Lifecycle Fixes

We have successfully resolved the issues surrounding incoming calls received while the app is in a **killed (quit) state**. The solution ensures a seamless transition from answering a native notification to speaking in the Agora `CallRoomScreen`, with proper cleanup of native UI and navigation stacks.

## 🚀 Key Issues Resolved

### 1. Headless Hook & API Failures
- **Problem**: When the app was killed, the headless JS context attempted to confirm the "Answer" action via `acceptCall`. However, `CallApi` required React context (Providers), which didn't exist yet, causing the API to fail and the caller to drop the call after a few seconds.
- **Solution**: Implemented a **Headless Fallback** in `CallApi.js`. It now detects when React isn't ready and uses `apiClient` directly, fetching the user's authentication token from `AsyncStorage` to notify the backend immediately.

### 2. The "Second Popup" & Setup Cache
- **Problem**: `RNCallKeep` setup often fails in headless mode because no Android `Activity` exists. Our `setupPromise` was caching this failure, causing all subsequent retry attempts in the main app to fail instantly without actually retrying.
- **Solution**: 
    - Updated `setupCallKeep` to reset its promise on failure, allowing the main app to successfully retry.
    - Added an exponential backoff retry loop (500ms, 1500ms, 3000ms) during app initialization.
    - Added a best-effort direct native UI dismissal in the headless context.

### 3. Call Dropping due to Unmounting
- **Problem**: During cold boot, the Deep Link would open `CallRoomScreen`. In parallel, `SplashScreen` would finish loading and execute `navigation.replace(SCREEN.DRAWER)`. This swallowed the `CallRoomScreen`, unmounting it and triggering Agora's `leaveChannel`, which killed the call.
- **Solution**: Refactored `SplashScreen.js` to detect if a call has already been navigated to. If so, it now **returns early** and does nothing, allowing the `CallRoomScreen` to remain safely on top of the stack.

### 4. Navigation Stack Stranding
- **Problem**: After a cold-boot call ended, `navigation.goBack()` would take the user back to the `SplashScreen`, which was frozen because it had skipped its transition to the Home screen.
- **Solution**: Upgraded `safeGoBack` in `CallRoomScreen.js` with **Stack Introspection**. It now checks the navigation state before popping; if the screen underneath is the Splash screen or the stack is empty, it resets the entire root to the `DrawerNavigator`.

### 5. Deep Link Logic Safety
- **Problem**: Native "End Call" events were firing deep links that `App.js` was interpreting as requests to navigate to the call screen.
- **Solution**: Modified `handleDeepLink` in `App.js` to explicitly check for the `action=accept` parameter. Action strings for `end` are now ignored for navigation purposes.

## 📱 Verification Results

| Scenario | Behavior | Result |
| :--- | :--- | :--- |
| **App Killed -> Receive Call -> Accept** | UI opens directly to CallRoom; API confirms instantly; Caller stays connected. | ✅ Fixed |
| **Call Room Active -> Caller Ends** | CallRoom closes and user is redirected to Home Drawer (not Splash). | ✅ Fixed |
| **Stale Native UI** | Persistent notifications are dismissed automatically within 1-2 seconds of app boot. | ✅ Fixed |
| **UI Reset Flash** | SplashScreen transition is bypassed during active calls, preventing the UI "flicker". | ✅ Fixed |
