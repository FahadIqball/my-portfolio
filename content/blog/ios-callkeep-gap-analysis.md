---
title: "iOS CallKeep / VoIP — Gap Analysis"
date: "2026-07-12"
type: "note"
excerpt: "An in-depth gap analysis focusing on iOS killed-state wake-up and accept-from-CallKit UI issues."
tags: ["iOS", "VoIP", "CallKit", "React Native"]
---

# iOS CallKeep / VoIP — Gap Analysis (Zola vs Reference)

> Focus: **iOS killed-state wake-up** and **accept-from-CallKit UI** — the two broken scenarios.  
> Twilio ↔ Agora differences are irrelevant to the PushKit/CallKit plumbing; every gap below applies regardless of media SDK.

---

## Quick Verdict

The **native layer (AppDelegate.mm) is correct** — PushKit is wired, `reportNewIncomingCall:fromPushKit:YES` is called, and Info.plist has `voip` + `audio`. iOS *will* wake the process and show the CallKit screen from killed state.

The problem is entirely in **what happens after the user taps "Accept"**:

1. The JS side has **no `didLoadWithEvents` handler**, so events that fired before the bridge was ready are silently dropped.
2. The `voipListeners.js` `notification` listener is registered inside `App.useEffect`, which **runs after the bridge, after the Redux store, after navigation** — too late to serve a killed-state answer event.
3. `VoipPushNotification.onVoipNotificationCompleted()` is **never called**, which can cause Apple to throttle/kill future VoIP pushes.
4. The VoIP token is **never uploaded to the backend** (the upload is commented out in LoginScreen).
5. The `AppDelegate.h` is **missing the `voipRegistry` property** and `UNUserNotificationCenterDelegate`, though this is cosmetic for the current runtime.

---

## Gap-by-Gap Breakdown

### 🔴 GAP 1 — `didLoadWithEvents` is not handled (most critical)

**What the reference does:**

```js
// VoipNotificationHandler.js (reference)
VoipPushNotification.addEventListener('didLoadWithEvents', (events) => {
  events.forEach(event => {
    if (event.name === 'RNVoipPushRemoteNotificationsRegisteredEvent') { … }
    if (event.name === 'RNVoipPushRemoteNotificationReceivedEvent') {
      onCallPushData(event.data);   // ← re-processes the VoIP push
    }
  });
});
```

**What Zola does:**  
`voipListeners.js` only registers `'notification'` — **zero** handling of `'didLoadWithEvents'`.

**Why this breaks killed state:**  
When iOS wakes the app via PushKit from a killed state, the VoIP push fires **before** the JS bridge exists. `RNVoipPushNotificationManager` queues the event internally. Once the bridge comes up, it fires `didLoadWithEvents` with the buffered payload. Without a listener, the payload is lost on the JS side. `reportNewIncomingCall` in native already showed the CallKit UI — so the call rings — but when the user taps "Accept", `onAnswerCall` in `CallKeepService` has **no cached payload** (the `incomingByUuid` map is empty) and cannot find `callId`, `channelName`, etc. The call is silently dropped.

---

### 🔴 GAP 2 — `voipListeners.js` is registered too late for killed-state answer

**What the reference does:**

```js
// index.js (reference)
voipNotificationHandler.init();   // ← runs BEFORE App component mounts
voipNotificationHandler.addCallback(…displayIncomingCall…);
```

Registration happens in `index.js` — the very first JS code that executes, even in headless/killed launch.

**What Zola does:**

```js
// App.js useEffect
const unsubscribeVOIP = registerVoipForegroundListener?.()
```

`App.useEffect` fires **after** the React tree mounts, fonts load, Redux hydrates, etc. For a killed-state launch this is typically 1–3 seconds after the bridge comes up. If `didLoadWithEvents` fires before this point (which it often does), the listener isn't even attached yet.

**Fix:** Move `VoipPushNotification.addEventListener('didLoadWithEvents', …)` (and optionally `'notification'`) into `index.js`, before `registerRootComponent`.

---

### 🟠 GAP 3 — `onVoipNotificationCompleted(uuid)` is never called

**What the reference does:**

```js
VoipPushNotification.onVoipNotificationCompleted(uuid);
```

Called after processing each VoIP push (in both `notification` and `didLoadWithEvents` handlers).

**What Zola does:**  
Neither `voipListeners.js` nor any other file calls `onVoipNotificationCompleted`.

**Why this matters:**  
Apple's PushKit contract requires you to call `PKPushRegistry`'s completion handler (exposed as `onVoipNotificationCompleted` in the RN library). If you don't, Apple logs a violation. After repeated violations, iOS will **stop delivering VoIP pushes** to the app (silent throttling, then full suppression). Your app will appear to stop ringing on iOS after some uses.

---

### 🟠 GAP 4 — VoIP token is never uploaded to the backend

**What the reference does:**

```js
// NetworkHomeScreen.js
VoipPushNotification.registerVoipToken();
VoipPushNotification.addEventListener('register', token => {
  api.post(SAVE_DEVICE_TOKEN, { voip_token: token, … });
});
```

**What Zola does:**

```js
// LoginScreen.js  (lines 90-100)
// const voipToken = isIOS() ? await getVoipToken() : null   ← COMMENTED OUT
// voipToken: voipToken || '',                               ← COMMENTED OUT
```

`getVoipToken()` helper exists in `Helpers.js` but the call site is commented out. There is no other place that uploads the VoIP token.

**Why this breaks killed state:**  
If the backend never received the VoIP token, it cannot send PushKit pushes. Without PushKit pushes, iOS will never wake the app from killed state. This is the **root cause** of the entire feature not working end-to-end if the token upload was never restored after being commented out.

---

### 🟡 GAP 5 — `AppDelegate.h` is missing `voipRegistry` property and `UNUserNotificationCenterDelegate`

**What the reference declares:**

```objc
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate, PKPushRegistryDelegate>
@property (nonatomic, strong) PKPushRegistry *voipRegistry;
@end
```

**What Zola has:**

```objc
@interface AppDelegate : EXAppDelegateWrapper <PKPushRegistryDelegate>
// no voipRegistry property
// no UNUserNotificationCenterDelegate
@end
```

The `voipRegistry` property **is** declared in `AppDelegate.mm` as a category extension (`@interface AppDelegate () <PKPushRegistryDelegate>`) so it compiles fine. However, formally declaring it in the header is best practice and required if any other file or extension needs to access it. Not a runtime bug, but clean it up.

---

### 🟡 GAP 6 — No `getInitialEvents` / `didLoadWithEvents` hook in `CallKeepService`

**What the reference does:**  
`useGlobalCallHandler` calls `RNCallKeep.getInitialEvents()` to replay answer/end events that fired before listeners were registered.

**What Zola does:**  
`initCallSystem` already does call `RNCallKeep.getInitialEvents()` — ✅ this part is correct. The gap is only that the VoIP notification equivalent (`didLoadWithEvents`) is missing, as noted in Gap 1.

---

### ✅ What IS Correct (no change needed)

| Item | Status |
|------|--------|
| `AppDelegate.mm` — PushKit registry setup | ✅ Correct |
| `AppDelegate.mm` — `reportNewIncomingCall:fromPushKit:YES` | ✅ Correct |
| `AppDelegate.mm` — `RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:` | ✅ Correct |
| `AppDelegate.mm` — `RNVoipPushNotificationManager didUpdatePushCredentials:` | ✅ Correct |
| `AppDelegate.mm` — `RNCallKeep setup:` with `supportsVideo:YES` | ✅ Correct |
| `AppDelegate.mm` — bridge event `voipRemoteNotificationReceived` | ✅ Correct |
| `Info.plist` — `UIBackgroundModes` includes `voip` + `audio` | ✅ Correct |
| `index.js` — `RNCallKeep.setup()` at cold-start | ✅ Correct |
| `index.js` — `RNCallKeepBackgroundMessage` headless task | ✅ Registered |
| `CallKeepService.js` — `RNCallKeep.getInitialEvents()` on init | ✅ Correct |
| `CallKeepService.js` — `answerCall` / `endCall` listener + AsyncStorage fallback | ✅ Correct |

---

## Required Fixes (iOS focus only)

### Fix A — Add `didLoadWithEvents` in `index.js` (before `registerRootComponent`)

```js
// index.js  — add this block BEFORE registerRootComponent(App)
import VoipPushNotification from 'react-native-voip-push-notification';
import { Platform } from 'react-native';
import { onCallPushData } from './app/calling/CallPushHandler';
import { onIncomingPushPayload } from './app/calling/CallKeepService';

if (Platform.OS === 'ios') {
  // Handle VoIP events that fired BEFORE the bridge was ready (killed-state launch)
  VoipPushNotification.addEventListener('didLoadWithEvents', (events) => {
    if (!events || !events.length) return;
    events.forEach(async (event) => {
      if (event.name === 'RNVoipPushRemoteNotificationReceivedEvent') {
        const data = event.data;
        if (data?.uuid) {
          // Pre-cache payload so answerCall handler can find callId
          onIncomingPushPayload({
            uuid: data.uuid,
            callId: String(data.callId || ''),
            callerId: String(data.callerId || ''),
            callerName: String(data.callerName || 'Unknown'),
            channelName: String(data.channelName || ''),
            callerImage: String(data.callerImage || ''),
            type: String(data.callType || 'voice').toLowerCase() === 'video' ? 'video' : 'voice',
            receivedAt: Date.now(),
          });
          // Notify JS — but native CallKit UI is already shown by AppDelegate
          // Do NOT call displayIncomingCall again (would duplicate the CallKit UI)
          await onCallPushData(data).catch(console.warn);
          // ✅ Fulfill Apple's VoIP completion contract
          VoipPushNotification.onVoipNotificationCompleted(data.uuid);
        }
      }
    });
  });

  // Also handle foreground VoIP pushes here (fires when app is alive)
  VoipPushNotification.addEventListener('notification', async (notification) => {
    const data =
      typeof notification?.getData === 'function'
        ? notification.getData()
        : notification?.data || notification;
    if (!data) return;
    await onCallPushData(data).catch(console.warn);
    // ✅ Fulfill Apple's VoIP completion contract
    if (data?.uuid) {
      VoipPushNotification.onVoipNotificationCompleted(data.uuid);
    }
  });
}
```

> **Note:** After this, you can remove or simplify `registerVoipForegroundListener()` in `App.js` since foreground VoIP pushes are now handled in `index.js`.

### Fix B — Avoid duplicate `displayIncomingCall` on iOS

In `voipListeners.js` / `onCallPushData`, when running on iOS and the payload already has a native CallKit UI (shown by `AppDelegate`), **do not call `displayIncomingCall` again**. Only cache the payload and call `onVoipNotificationCompleted`. The current code in `showIncomingCall` calls `RNCallKeep.displayIncomingCall()` which will create a *second* CallKit sheet on top of the native one.

Add a guard in `CallPushHandler.js`:

```js
// In onCallPushData, incoming branch — before showIncomingCall
if (Platform.OS === 'ios') {
  // Native AppDelegate already called reportNewIncomingCall.
  // Just cache the payload; do NOT call displayIncomingCall.
  onIncomingPushPayload(payload);
  return;
}
// Android path continues as normal:
await showIncomingCall({ … });
```

### Fix C — Restore VoIP token upload

Uncomment and restore the VoIP token upload in `LoginScreen.js` (and/or `OTPScreen.js`):

```js
// LoginScreen.js — inside the login success handler
const voipToken = isIOS() ? await getVoipToken() : null;
// Include in the device token API call:
await saveDeviceToken({
  fcmToken,
  voipToken: voipToken || '',   // ← restore this
});
```

Without this, the backend cannot send PushKit pushes and killed-state wake never happens.

### Fix D — Call `onVoipNotificationCompleted` everywhere a VoIP push is processed

Both `didLoadWithEvents` and `notification` handlers must call:

```js
VoipPushNotification.onVoipNotificationCompleted(uuid);
```

This is already included in Fix A above.

---

## Summary Table

| Gap | Severity | File to Fix | Impact |
|-----|----------|-------------|--------|
| `didLoadWithEvents` missing | 🔴 Critical | `index.js` | Killed-state answer drops payload → can't join Agora call |
| VoIP listener too late (`App.useEffect`) | 🔴 Critical | `index.js` | Same as above for race-condition cases |
| `onVoipNotificationCompleted` never called | 🟠 High | `index.js` | Apple will throttle VoIP pushes over time |
| VoIP token never uploaded | 🔴 Critical | `LoginScreen.js` | Backend can't send PushKit → killed-state never wakes |
| Duplicate `displayIncomingCall` on iOS | 🟠 High | `CallPushHandler.js` | Double CallKit UI on foreground/background calls |
| `voipRegistry` missing from `.h` | 🟡 Low | `AppDelegate.h` | Cosmetic / best practice only |
