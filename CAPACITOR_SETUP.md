# Building Android App with Capacitor

This guide will help you convert the School-Wp React web app into a native Android application using Capacitor.

## Prerequisites

Before starting, ensure you have:

1. **Node.js** (v18+)
2. **Java Development Kit (JDK)** (v17+)
   - Download: https://www.oracle.com/java/technologies/downloads/
3. **Android SDK** 
   - Download: https://developer.android.com/studio
4. **Android Studio** (recommended)
   - Download: https://developer.android.com/studio

### Environment Setup (macOS/Linux)

```bash
# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home)

# Set ANDROID_SDK_ROOT and ANDROID_HOME
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export ANDROID_HOME=~/Library/Android/sdk

# Add to PATH
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/tools
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### Environment Setup (Windows)

```cmd
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
setx ANDROID_SDK_ROOT "C:\Users\YourUsername\AppData\Local\Android\Sdk"
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
setx PATH "%PATH%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools"
```

---

## Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
```

---

## Step 2: Initialize Capacitor

```bash
npx cap init
```

**When prompted, enter:**
- **App name:** `School WP`
- **App Package:** `com.schoolwp.app`
- **Web dir:** `dist`

This creates a `capacitor.config.ts` file.

---

## Step 3: Build Your React App

```bash
npm run build
```

This generates the optimized web files in the `dist/` folder.

---

## Step 4: Add Android Platform

```bash
npx cap add android
```

This creates an `android/` folder with the native Android project.

---

## Step 5: Configure Capacitor (Optional but Recommended)

Edit `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.schoolwp.app',
  appName: 'School WP',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
```

---

## Step 6: Install Optional Capacitor Plugins (Recommended)

```bash
# For camera access (if needed)
npm install @capacitor/camera

# For file access
npm install @capacitor/filesystem

# For notifications
npm install @capacitor/local-notifications

# For geolocation (if needed for school location features)
npm install @capacitor/geolocation
```

---

## Step 7: Sync Files to Android

After rebuilding, sync the web files:

```bash
npx cap sync android
```

---

## Step 8: Open in Android Studio

```bash
npx cap open android
```

This opens the Android project in Android Studio.

---

## Step 9: Build APK

### Option A: Debug APK (for testing)

In Android Studio:
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. APK will be in `android/app/build/outputs/apk/debug/`

### Option B: Release APK (for production)

```bash
cd android
./gradlew build -x lint
```

Or in Android Studio:
1. Click **Build** → **Generate Signed Bundle / APK...**
2. Follow the wizard to create a signing key
3. Select **APK** and **release**

---

## Step 10: Test on Device or Emulator

### Using Android Emulator:
1. In Android Studio, click **AVD Manager** → Create a virtual device
2. Click **Play** to start the emulator
3. In Android Studio, click **Run 'app'**

### Using Physical Device:
1. Enable Developer Mode on your Android device
2. Connect via USB
3. In Android Studio, select your device from the device dropdown
4. Click **Run 'app'**

---

## Development Workflow

After initial setup, when you make changes:

```bash
# 1. Make code changes in your React app
# 2. Rebuild the web app
npm run build

# 3. Sync changes to Android
npx cap sync android

# 4. Rebuild and run
npx cap run android
```

---

## Troubleshooting

### Issue: "Could not find tools.jar"
**Solution:** Make sure `JAVA_HOME` is set correctly:
```bash
echo $JAVA_HOME
# Should output something like: /usr/libexec/java_home
```

### Issue: "Could not find android.jar"
**Solution:** Install Android SDK Platform through Android Studio:
1. Open Android Studio
2. Tools → SDK Manager
3. Install "Android SDK Platform 34" (or latest)

### Issue: Capacitor plugin not working
**Solution:** 
```bash
npx cap sync android
npx cap build android
```

### Issue: App crashes on startup
**Solution:** Check the logs:
```bash
npx cap open android
# In Android Studio, open Logcat (View → Tool Windows → Logcat)
```

---

## Useful Commands

```bash
# Build and run
npx cap run android

# Update capacitor core
npm install @capacitor/core@latest

# Check capacitor status
npx cap list

# Open in Android Studio
npx cap open android
```

---

## Next Steps

1. Test the app on an emulator or device
2. Add native plugins if needed (camera, location, etc.)
3. Configure app signing for Google Play
4. Submit to Google Play Store

For more info: https://capacitorjs.com/docs/android
