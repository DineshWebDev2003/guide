# 🚀 Chapter 8: Publishing Your App (App Stores)

## 🎯 Goals
- Prepare app for iOS & Android
- Understand signing and builds
- Learn to submit to App Store and Play Store

## 🔵 Quick Android Build
```bash
# Generate release AAB
cd android
./gradlew bundleRelease
```

## 🟢 Quick iOS Build (macOS)
```bash
cd ios
xcodebuild -workspace YourApp.xcworkspace -scheme YourApp archive
```

## 🟡 Signing Keys
- Android: `keystore` generated with `keytool`
- iOS: Apple Developer signing certificate

## 🎮 Practice Exercises
1. Create a signed debug build and test on a device.
2. Prepare screenshots for the store listing.

## ✅ Recap
Publishing takes care: sign, test, and submit!

## 🛠️ Publishing Checklist (practical)

- [ ] Update `version` and `buildNumber` in `package.json` and native manifests
- [ ] Run a release build on a real device and test all features
- [ ] Generate screenshots for required screen sizes
- [ ] Prepare release notes and privacy policy URL
- [ ] Create Keystore (Android) and keep it secure
- [ ] Archive iOS build (macOS) and upload to App Store Connect

## 🔁 Helpful Scripts (add to package.json)

```json
"scripts": {
	"android:bundle": "cd android && ./gradlew bundleRelease",
	"android:install": "cd android && ./gradlew installDebug",
	"ios:archive": "cd ios && xcodebuild -workspace YourApp.xcworkspace -scheme YourApp archive"
}
```

Note: Use Fastlane to automate the upload process for production releases.