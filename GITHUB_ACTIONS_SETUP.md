# GitHub Actions - Automatic APK Builder

This guide explains how to set up automatic APK building for your School-Wp Android app using GitHub Actions.

## What is GitHub Actions?

GitHub Actions is a CI/CD (Continuous Integration/Continuous Deployment) tool that automatically:
- ✅ Builds your React app
- ✅ Compiles it with Capacitor
- ✅ Creates an Android APK
- ✅ Releases it automatically
- ✅ Makes it downloadable from your repo

## Setup Instructions

### Step 1: Ensure You Have the Workflow File

Check if `.github/workflows/build-apk.yml` exists in your repository. If not, create it with the content provided.

### Step 2: Commit and Push to Main Branch

```bash
git add .github/workflows/build-apk.yml
git commit -m "Add automatic APK builder workflow"
git push origin main
```

### Step 3: GitHub Actions Automatically Starts

Once you push, GitHub Actions will:
1. Run the workflow automatically
2. Build your React app
3. Set up Android SDK
4. Compile to APK
5. Create a GitHub Release
6. Upload the APK for download

---

## How to Download Your APK

### Method 1: Download from GitHub Releases (Easiest!)

1. Go to your repository: https://github.com/kelvindocs254-droid/School-Wp
2. Click **Releases** on the right sidebar
3. Find the latest release
4. Download `SchoolWP-debug-X.apk` 

### Method 2: Download from Artifacts

1. Go to **Actions** tab in your repository
2. Click the latest workflow run
3. Scroll down to "Artifacts"
4. Download `school-wp-apk`

---

## How to Install APK on Android Device

### Option A: Direct Install (USB Cable)

```bash
# 1. Connect Android device via USB
# 2. Enable Developer Mode on device (Settings → About → tap Build Number 7 times)
# 3. Download APK to your computer

# 4. Install using ADB
adb install SchoolWP-debug-X.apk
```

### Option B: Transfer File

1. Download APK from GitHub Releases
2. Connect phone to computer via USB
3. Copy APK to your phone's download folder
4. On phone: Open Files → Downloads → Tap APK → Install

### Option C: Email/Cloud

1. Download APK from GitHub Releases
2. Email or upload to Google Drive
3. Open on Android device
4. Tap to install

---

## Workflow Details

### What the Workflow Does:

1. **Triggers on:**
   - Push to `main` branch
   - Manual trigger (Actions tab → Run workflow)

2. **Steps:**
   - Checks out your code
   - Sets up Node.js 18
   - Sets up Java 17
   - Sets up Android SDK 34
   - Installs npm dependencies
   - Builds your React app
   - Installs Capacitor
   - Adds Android platform
   - Builds APK with Gradle
   - Creates GitHub Release
   - Uploads APK to release

---

## Auto-Build on Every Push

The workflow automatically:
- **Builds APK** on every push to `main`
- **Creates a Release** for each build
- **Tags with version number** (v1, v2, v3, etc.)
- **Keeps APKs for 30 days**

---

## Trigger Manual Build

You can manually trigger a build without pushing:

1. Go to **Actions** tab
2. Click **Build Android APK** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait 5-10 minutes for build to complete
5. Check **Releases** for your APK

---

## Monitor Build Progress

1. Go to **Actions** tab in your repository
2. Click the latest workflow run
3. Watch the build progress in real-time
4. See logs if any errors occur

---

## Troubleshooting

### Build Failed: "Module not found"
**Solution:** Make sure all dependencies are in `package.json`
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Build Failed: "JAVA_HOME not set"
**Solution:** The workflow already sets up Java. Check the logs for the actual error.

### Build Failed: "Android SDK not found"
**Solution:** The workflow installs it automatically. Rebuild by pushing again.

### APK Size Too Large
**Solution:** Normal for debug APK. For production:
1. Create signed release APK
2. Enable ProGuard/R8 optimization

---

## Next: Release APK (Production)

For production release APK (smaller size, optimized):

1. Generate signing key:
```bash
keytool -genkey -v -keystore school-wp.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias school-wp
```

2. Store the keystore file securely

3. Update workflow to use signed APK

---

## View Your APKs

**Latest Releases:** https://github.com/kelvindocs254-droid/School-Wp/releases

Every time you push to `main`, a new APK is automatically built and released! 🚀

---

## Environment Variables (Optional)

If your app needs environment variables (like GEMINI_API_KEY):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add `GEMINI_API_KEY` and your value
4. Update workflow to use: `${{ secrets.GEMINI_API_KEY }}`

---

## More Info

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Gradle Build Docs](https://gradle.org/)
