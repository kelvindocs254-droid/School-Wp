# Android APK Installation Guide

This guide explains how to install your School-Wp APK on Android devices.

## 📱 Installation Methods

### Method 1: Direct Installation via USB (Recommended)

**Requirements:**
- Android device with USB debugging enabled
- Computer with ADB (Android Debug Bridge) installed
- USB cable

**Steps:**

1. **Enable USB Debugging on Android:**
   - Settings → About Phone → Build Number (tap 7 times)
   - Go back to Settings → Developer Options → USB Debugging (ON)

2. **Connect device via USB:**
   ```bash
   # Verify device is connected
   adb devices
   # You should see your device listed
   ```

3. **Install APK:**
   ```bash
   adb install SchoolWP-debug-X.apk
   ```

4. **App will appear on your home screen!**

---

### Method 2: Transfer via File Manager (Easiest for Beginners)

**Steps:**

1. Download APK from GitHub Releases to your computer

2. Connect Android phone via USB cable

3. On computer file explorer:
   - Open your phone storage
   - Paste APK into Downloads folder

4. On Android phone:
   - Open Files app
   - Go to Downloads
   - Tap the APK file
   - Tap "Install"
   - Grant permissions if prompted

5. App will install and appear on home screen!

---

### Method 3: Email Yourself

**Steps:**

1. Download APK from GitHub Releases

2. Email it to yourself

3. Open email on Android phone

4. Tap the APK attachment

5. Tap "Install"

---

### Method 4: Cloud Storage (Google Drive, Dropbox, OneDrive)

**Steps:**

1. Download APK from GitHub Releases

2. Upload to Google Drive/Dropbox/OneDrive

3. Open on Android phone

4. Download the APK

5. Tap to install from Downloads

---

## 🔗 Where to Download Your APK

### From GitHub Releases:

1. Go to: https://github.com/kelvindocs254-droid/School-Wp
2. Click **Releases** on the right side
3. Find the latest release
4. Download `SchoolWP-debug-X.apk`

### From GitHub Actions Artifacts:

1. Go to **Actions** tab
2. Click latest "Build Android APK" workflow
3. Scroll to "Artifacts"
4. Download `school-wp-apk`

---

## ⚙️ Installation Issues & Solutions

### Issue: "Unknown source" or "Untrusted app"

**Solution:**
1. Settings → Apps → Special App Access
2. Allow installation from unknown sources for your browser/file manager
3. Try installing again

### Issue: "Installation failed - parse error"

**Solution:**
- APK may be corrupted
- Download again from GitHub Releases
- Try a different download method

### Issue: "Insufficient storage"

**Solution:**
- Free up space on your device
- Delete unused apps
- Clear cache: Settings → Storage → Cached Data

### Issue: "App crashes on startup"

**Solution:**
1. Check device compatibility (Android 7+)
2. Check internet connection
3. Check if GEMINI_API_KEY is set in .env
4. Reinstall: Uninstall completely first

---

## ✅ How to Know It Worked

After installation:
- App icon appears on home screen
- You can tap to open
- App loads without errors

---

## 🔄 Update Your App

When you push new code to `main` branch:

1. GitHub Actions automatically builds new APK
2. New release is created
3. Download latest APK
4. Uninstall old version
5. Install new version

---

## 🗑️ Uninstall App

1. Long press app icon on home screen
2. Tap "Uninstall"
3. Confirm

Or:
1. Settings → Apps → School WP
2. Tap "Uninstall"
3. Confirm

---

## 📋 System Requirements

- **Android Version:** 7.0 or higher
- **RAM:** 2GB minimum (4GB+ recommended)
- **Storage:** ~100MB free space
- **Internet:** Required for Gemini AI features

---

## 📞 Troubleshooting Help

If you get an error:

1. Check the exact error message
2. Try a different installation method
3. Check GitHub Actions logs for build errors
4. Ensure all dependencies are installed

---

## Next Steps

After installation:
1. Open the app
2. Grant necessary permissions
3. Configure settings
4. Start using School-Wp! 🚀

---

For more help, see **GITHUB_ACTIONS_SETUP.md** or **CAPACITOR_SETUP.md**
