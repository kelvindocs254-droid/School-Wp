# Quick Start: Build Android App

Follow these steps to quickly build your School-Wp Android app:

## Prerequisites
- ✅ Node.js (v18+)
- ✅ Java JDK 17+
- ✅ Android SDK
- ✅ Android Studio

## Quick Steps (5 minutes)

### 1. Install Dependencies
```bash
npm install
npm install @capacitor/core @capacitor/cli
```

### 2. Build React App
```bash
npm run build
```

### 3. Initialize Capacitor
```bash
npx cap init
# Enter: School WP, com.schoolwp.app, dist
```

### 4. Add Android
```bash
npx cap add android
```

### 5. Open in Android Studio
```bash
npx cap open android
```

### 6. Run on Emulator or Device
In Android Studio:
- Select a device/emulator from the dropdown
- Click the green **Run** button (▶)

---

## Done! 🎉

Your app will now build and run on Android!

---

## After Making Code Changes

```bash
npm run build
npx cap sync android
npx cap run android
```

---

## Need Help?
See `CAPACITOR_SETUP.md` for detailed troubleshooting
