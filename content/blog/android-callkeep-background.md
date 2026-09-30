---
title: "Android: React Native CallKeep, background / killed app, and RTC calls"
date: "2026-07-12"
type: "article"
excerpt: "A complete guide on wiring react-native-callkeep on Android, handling background calls, and integrating real-time media."
tags: ["Android", "CallKeep", "React Native", "RTC"]
---

# Android: React Native CallKeep, background / killed app, and RTC calls

This document describes how **this repository** wires **react-native-callkeep** on Android, how calls are handled when the app is backgrounded, and how real-time media is integrated. It is derived from the **PrjNetwork** codebase (React Native **0.72.3**, `react-native-callkeep` **^4.3.16**) so you can reuse the same configuration in another project.

> **Media stack in this repo:** incoming/outgoing calls use **Twilio Video** (`react-native-twilio-video-webrtc`) inside `CallContext` and `CallScnerio.js`. There is **no** `react-native-agora` dependency here. The CallKeep / Telecom / foreground-service pieces are **RTC-agnostic**; see [§ Porting the media layer to Agora](#porting-the-media-layer-to-agora) at the end.

---

## 1. What CallKeep does on Android

- **ConnectionService / Telecom**: CallKeep registers a system **incoming call UI** (full-screen incoming call surface) via `io.wazo.callkeep.VoiceConnectionService`, bound to Android’s `ConnectionService` API.
- **Foreground service**: While a call is active, Android may require a **foreground service** with appropriate types (`microphone`, `camera` for video). This project declares those types on the CallKeep service and configures an optional notification channel in JS (`App.js`).
- **JS bridge**: Your app calls `RNCallKeep.displayIncomingCall`, `answerIncomingCall`, `endCall`, and listens to `answerCall` / `endCall` / `didChangeAudioRoute`.

**Killed vs background:** When the process is **not** running, something must still **start JS** long enough to call `RNCallKeep.displayIncomingCall` with a stable `callUUID`. In this repo:

- **iOS** uses VoIP push + `VoipNotificationHandler.displayIncomingCall` (see `index.js` + `src/utils/VoipNotificationHandler.js`).
- **Android** registers a headless task name **`RNCallKeepBackgroundMessage`** in `index.js`. The handler in this repo currently only **logs** and resolves; for **FCM data-message → ringing UI** when killed, you typically extend that task to parse the payload and call `RNCallKeep.displayIncomingCall` (same UUID you will use when the user answers). See [§ 7](#7-headless-task-rncallkeepbackgroundmessage-killed--background-fcm).

---

## 2. Dependencies (from `package.json`)

Relevant packages for this flow:

| Package | Role |
|--------|------|
| `react-native-callkeep` | Native incoming call UI, Telecom integration, events |
| `react-native-twilio-video-webrtc` | Video/audio room (this app’s RTC) |
| `react-native-incall-manager` | Speaker / audio route (used with CallKeep events in UI) |
| `@sayem314/react-native-keep-awake` | Keep screen on during calls |
| `@pusher/pusher-websocket-react-native` | Signaling for call state (ringing, ended, etc.) |
| `react-native-push-notification` + Firebase | FCM listener service declared in `AndroidManifest` |

Install CallKeep and link/autolink per library docs; match versions to your RN release.

---

## 3. Android manifest (`android/app/src/main/AndroidManifest.xml`)

### 3.1 CallKeep-related permissions

Declared in this project:

```xml
<!-- CallKeep-specific Permissions -->
<uses-permission android:name="android.permission.BIND_TELECOM_CONNECTION_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.CALL_PHONE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MICROPHONE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_CAMERA" />
```

Also present and relevant for calls / RTC:

- `RECORD_AUDIO`, `CAMERA`, `MODIFY_AUDIO_SETTINGS`, `READ_PHONE_STATE`, `WAKE_LOCK`, `INTERNET`, `BLUETOOTH`, `ACCESS_NETWORK_STATE`, etc.

### 3.2 CallKeep services (inside `<application>`)

```xml
<!-- CallKeep Services -->
<service
    android:name="io.wazo.callkeep.VoiceConnectionService"
    android:exported="true"
    android:label="Wazo"
    android:permission="android.permission.BIND_TELECOM_CONNECTION_SERVICE"
    android:foregroundServiceType="camera|microphone">
    <intent-filter>
        <action android:name="android.telecom.ConnectionService" />
    </intent-filter>
</service>

<service android:name="io.wazo.callkeep.RNCallKeepBackgroundMessagingService" />
```

- **`VoiceConnectionService`**: Required for the system call UI and call audio routing through Telecom.
- **`RNCallKeepBackgroundMessagingService`**: Used with CallKeep’s background messaging path; pairs with the **`RNCallKeepBackgroundMessage`** headless task in JS.

### 3.3 Main activity

```xml
<activity
    android:name=".MainActivity"
    ...
    android:launchMode="singleTask"
    ...>
```

`singleTask` helps when returning from the full-screen incoming UI or external intents so you do not stack multiple activity instances.

### 3.4 FCM (push) service (same manifest)

This app includes `react-native-push-notification`’s listener bound to Firebase messaging:

```xml
<service
    android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
    android:exported="false"
    ...>
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

Use **data messages** or notification + data as required by your server; for waking the app to ring, prefer patterns compatible with CallKeep’s background service + headless JS.

---

## 4. Gradle / native application

### 4.1 Root `android/build.gradle` (excerpt)

- `minSdkVersion = 24`, `compileSdkVersion = 34`, `targetSdkVersion = 33` (as in this repo).
- Google Services classpath for Firebase.

### 4.2 App `android/app/build.gradle`

- `apply plugin: 'com.google.gms.google-services'`
- `implementation project(':react-native-twilio-video-webrtc')` (Twilio native package; **replace with Agora** if you port media).

### 4.3 `MainApplication.java`

- `TwilioPackage` is added manually: `packages.add(new TwilioPackage());`  
  For Agora, you would add Agora’s package per their RN install guide instead.

### 4.4 `MainActivity.java`

No CallKeep-specific overrides; standard `ReactActivity` + splash. CallKeep does not require changes here in this project.

---

## 5. JavaScript: CallKeep setup

### 5.1 Entry file `index.js` (global setup + headless task)

- Imports `RNCallKeep` and calls **`RNCallKeep.setup(callKeepOptions)`** once at startup (iOS + Android options).
- Registers:

```js
AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () => async ({ name, callUUID, handle }) => {
    console.log('📞 CallKeep Background task triggered:', { name, callUUID, handle });
    return Promise.resolve();
  }
);
```

**In this repository** the headless task does **not** call `displayIncomingCall`; it is a placeholder. Extend it when your push pipeline delivers incoming-call payloads on Android while the app is killed.

### 5.2 `App.js` (Android-only richer setup)

On `Platform.OS === 'android'`, the app calls **`RNCallKeep.setup`** again with:

- **`additionalPermissions`**: `RECORD_AUDIO`, `CALL_PHONE`, `READ_PHONE_STATE` (runtime requests via CallKeep).
- **`foregroundService`**: maps to notification channel used while the connection service runs:
  - `channelId` / `channelName`: from `CHANEL` enum — `com.network.callchannel`
  - `notificationTitle`: e.g. `'Network is active'`
  - `notificationIcon`: `'ic_launcher'` (must exist as a drawable resource)

Enum source: `src/enums/AppEnumData.ts`:

```ts
export enum CHANEL {
  CHANNEL_NAME = 'com.network.callchannel',
  CHANNEL_ID = 'com.network.callchannel'
}
```

Having **two** `setup` calls (`index.js` and `App.js`) is how this project is structured; when porting, consider consolidating to **one** `setup` on Android to avoid confusion (library behavior may use the last setup wins — verify against your CallKeep version).

---

## 6. Global call handling (`useGlobalCallHandler.js`)

Mounted from `AppContext` via **`useGlobalCallHandler()`** so it is always active.

### 6.1 Persistent CallKeep listeners

```js
RNCallKeep.addEventListener('answerCall', onAnswer);
RNCallKeep.addEventListener('endCall', onEnd);
```

- **`answerCall`**: If there is a stored `incomingCall`, runs **`acceptCall`**.
- **`endCall`**: Runs **`declineCall`** if there is an incoming call.

### 6.2 Accept flow (native answer → navigate to call screen)

1. `RNCallKeep.answerIncomingCall(callUUID)` — syncs native UI with answered state.
2. Navigates to **`SCREEN.CALL_SCENERIO`** with `callType`, `item` (caller), `callingData`, `callUUID`.
3. Clears local incoming-call state and may resubscribe Pusher after a delay.

### 6.3 Signaling (Pusher)

- Subscribes to channels (e.g. `create-call`, `calling-request`).
- When call status is **ended**, calls **`RNCallKeep.endCall(callUUIDRef.current)`** and clears refs.

### 6.4 Relating UUID to your backend

The handler stores **`callUUID`** from the incoming path (VoIP on iOS; on Android you should set the same from your push/display path). Pusher events merge server call metadata with that UUID so **answer** and **end** stay consistent with CallKeep.

---

## 7. Headless task `RNCallKeepBackgroundMessage` (killed / background FCM)

CallKeep’s Android integration can deliver work to JS under the task name **`RNCallKeepBackgroundMessage`**. This project registers it in **`index.js`**.

**To mirror “ringing while killed” end-to-end:**

1. Server sends a **high-priority data message** (or the format CallKeep documents for your version) so `RNCallKeepBackgroundMessagingService` can wake JS.
2. In the headless task, parse `callUUID`, caller id/name, video flag, and any tokens/channel ids your RTC layer needs.
3. Call **`RNCallKeep.displayIncomingCall(callUUID, handle, localizedCallerName, 'number', isVideo)`** (or `'generic'` for non-phone handles — see `CallContext` iOS helpers for handle typing).
4. Ensure the **same** `callUUID` is passed into your navigation / RTC join when the user answers (as `useGlobalCallHandler` + `CallScenario` expect).

**iOS note (for parity only):** `VoipNotificationHandler.displayIncomingCall` implements the same `RNCallKeep.displayIncomingCall` for VoIP push; Android should follow the same UUID discipline.

---

## 8. In-call screen and Twilio (`CallScnerio.js` + `CallContext.js`)

- **`CallContext`**: Initializes Twilio, tokens from your API (`WebHandler` / `Routes.CREATE_JOIN_CALL`), manages `TwilioVideo` ref, tracks, speaker/mic/camera, and **iOS-only** outgoing CallKeep (`startCall` / `endCall`). Android incoming still uses **`answerIncomingCall`** / **`endCall`** from `useGlobalCallHandler` and `CallScnerio`.
- **`CallScnerio.js`**: Renders `TwilioVideoLocalView` / `TwilioVideoParticipantView`, uses **`react-native-incall-manager`** for speaker, **`RNCallKeep.endCall(callUUID)`** when Pusher reports **`CALL_STATE.ENDED`**, and subscribes to Pusher for disconnect while on the call screen.
- **`CustomCallModal.js`**: Listens to **`RNCallKeep.addEventListener('didChangeAudioRoute', ...)`** for Bluetooth / speaker UI.

This is the **“background mode”** media path in practice: Telecom + foreground service keep the process eligible for mic/camera; Twilio runs in the foreground activity after navigation.

---

## 9. Optional / duplicate setup hooks

- **`src/hooks/useIncomingCallNotification.js`**: Calls `RNCallKeep.setup` on Android with minimal options; **`displayIncomingCall`** and local notification examples are **commented out**. Not required for the main flow if `App.js` / `index.js` already set up CallKeep.
- **iOS `VoipNotificationHandler`**: Not used on Android; keep Android push logic separate or unify UUID handling in shared code.

---

## 10. Checklist to copy into another project

1. Add **`react-native-callkeep`**; run pod install (iOS) and rebuild Android.
2. Copy **CallKeep permissions** and **both `<service>` entries** into `AndroidManifest.xml`.
3. Ensure **`foregroundServiceType`** matches your use (audio-only → you may use `microphone` only; this repo uses `camera|microphone` for video).
4. Create the **notification channel** / drawable icon referenced by `foregroundService.notificationIcon`.
5. Call **`RNCallKeep.setup`** on Android with **`foregroundService`** + **`additionalPermissions`** as in `App.js`.
6. Register **`RNCallKeepBackgroundMessage`** in `index.js` and implement **`displayIncomingCall`** for your FCM payload if you need killed-state ringing.
7. Mount global **`answerCall` / `endCall`** listeners and **`answerIncomingCall`** on accept (pattern from `useGlobalCallHandler.js`).
8. On disconnect, call **`RNCallKeep.endCall(uuid)`** everywhere the call can end (Pusher, hangup, remote hangup) — see `useGlobalCallHandler` and `CallScnerio.js`.
9. Request **POST_NOTIFICATIONS** on Android 13+ if you show notifications (this repo has helpers in `PsuhNotification.js`).

---

## Porting the media layer to Agora

This document’s **Android Telecom / CallKeep / manifest / headless task** sections stay the same. Replace:

- `react-native-twilio-video-webrtc` → **`react-native-agora`** (or Agora UI Kit) per Agora’s RN guide.
- `TwilioPackage` in `MainApplication` → Agora’s autolinking / manual package if required.
- `CallContext` / `CallScnerio` Twilio components → Agora engine init, `joinChannel` / token, and your video views.
- Keep **`react-native-incall-manager`** (or Agora’s audio routing APIs) aligned with **`didChangeAudioRoute`** if you still use CallKeep for route events.

CallKeep only needs a **stable `callUUID`** and correct **`displayIncomingCall` / `answerIncomingCall` / `endCall`** sequencing; the RTC vendor is interchangeable once signaling and tokens are wired after `answerCall`.

---

## File map (quick reference)

| Area | Path |
|------|------|
| Manifest permissions & services | `android/app/src/main/AndroidManifest.xml` |
| CallKeep setup + headless task | `index.js` |
| Android CallKeep `foregroundService` + permissions | `App.js` |
| Global answer/end + Pusher | `src/hooks/useGlobalCallHandler.js` |
| VoIP → CallKeep display (iOS; reference for UUID) | `src/utils/VoipNotificationHandler.js` |
| Twilio + iOS outgoing CallKeep | `src/context/CallContext.js` |
| In-call UI + `endCall` on ENDED | `src/screens/callstab/CallScnerio.js` |
| Audio route UI | `src/components/CustomCallModal.js` |
| Channel id/name constants | `src/enums/AppEnumData.ts` |
| App-wide hook mount | `src/context/AppContext.js` |

---

*Generated from the PrjNetwork codebase for reuse as integration context. Update SDK versions, notification icons, and the headless FCM handler to match your product and server contract.*
