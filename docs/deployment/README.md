# Deployment Guide

This guide covers the deployment process for both iOS and Android platforms, as well as setting up CI/CD pipelines.

## Table of Contents
1. [App Store Submission](#app-store-submission)
2. [Play Store Guidelines](#play-store-guidelines)
3. [CI/CD Pipeline Setup](#cicd-pipeline-setup)

## App Store Submission

### Prerequisites
- Apple Developer Account ($99/year)
- Xcode installed on macOS
- App Store Connect setup completed

### Preparing Your App

1. **Update App Version**
```json
// package.json
{
  "version": "1.0.0",
  "buildNumber": "1"
}
```

2. **Configure Info.plist**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>Your App Name</string>
    <key>CFBundleIdentifier</key>
    <string>com.yourcompany.appname</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <!-- Add other required keys -->
</dict>
</plist>
```

3. **Generate App Icons**
```bash
# Using react-native-make
npx react-native generate-bootsplash assets/bootsplash_logo_original.png \
  --background-color=FFFFFF \
  --logo-width=100 \
  --assets-path=assets
```

### Building for Production
```bash
# Clean build
cd ios
xcodebuild clean

# Install pods
pod install

# Archive build
xcodebuild archive -workspace YourApp.xcworkspace \
  -scheme YourApp \
  -configuration Release \
  -archivePath build/YourApp.xcarchive
```

### App Store Connect Submission Checklist
- [ ] App icon (All required sizes)
- [ ] Screenshots for all device sizes
- [ ] App description
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] Marketing URL (optional)
- [ ] Keywords
- [ ] Category selection
- [ ] Rating questionnaire completed
- [ ] Build uploaded and processed

## Play Store Guidelines

### Prerequisites
- Google Play Developer Account ($25 one-time fee)
- Keystore file for signing
- Privacy Policy URL

### Generating Keystore
```bash
keytool -genkey -v -keystore your-app-key.keystore \
  -alias your-app-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### Gradle Configuration
```gradle
android {
    signingConfigs {
        release {
            storeFile file('your-app-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'your-app-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                'proguard-rules.pro'
        }
    }
}
```

### Building AAB (Android App Bundle)
```bash
cd android
./gradlew bundleRelease
```

### Play Store Submission Checklist
- [ ] App icon (512x512 px)
- [ ] Feature graphic (1024x500 px)
- [ ] Screenshots for different devices
- [ ] Privacy policy URL
- [ ] App description
- [ ] Release notes
- [ ] Content rating questionnaire
- [ ] Pricing & distribution settings

## CI/CD Pipeline Setup

### GitHub Actions Example
```yaml
name: React Native CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install Dependencies
      run: npm install
    - name: Run Tests
      run: npm test

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
    - name: Install Dependencies
      run: npm install
    - name: Build Android Release
      run: cd android && ./gradlew assembleRelease
    - name: Upload Artifact
      uses: actions/upload-artifact@v2
      with:
        name: app-release
        path: android/app/build/outputs/apk/release/

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
    - name: Install Dependencies
      run: npm install
    - name: Install Pod Dependencies
      run: cd ios && pod install
    - name: Build iOS Release
      run: xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp archive
```

### Fastlane Configuration
```ruby
# fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Push a new release build to the App Store"
  lane :release do
    increment_build_number
    build_ios_app(
      scheme: "YourApp",
      export_method: "app-store"
    )
    upload_to_app_store(
      skip_screenshots: true,
      skip_metadata: true
    )
  end
end

platform :android do
  desc "Push a new release build to the Play Store"
  lane :release do
    gradle(
      task: "clean bundleRelease",
      project_dir: "android/"
    )
    upload_to_play_store(
      track: 'production',
      aab: '../android/app/build/outputs/bundle/release/app-release.aab'
    )
  end
end
```

## Environment-Specific Configuration

### Environment Variables
```javascript
// config/env.js
export const ENV = {
  dev: {
    apiUrl: 'http://localhost:8000',
    analyticsEnabled: false
  },
  staging: {
    apiUrl: 'https://staging-api.yourapp.com',
    analyticsEnabled: true
  },
  prod: {
    apiUrl: 'https://api.yourapp.com',
    analyticsEnabled: true
  }
};
```

### Build Variants
```gradle
// android/app/build.gradle
android {
    flavorDimensions "environment"
    productFlavors {
        development {
            dimension "environment"
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "YourApp Dev"
        }
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            resValue "string", "app_name", "YourApp Staging"
        }
        production {
            dimension "environment"
            resValue "string", "app_name", "YourApp"
        }
    }
}
```

## Monitoring and Analytics

### Firebase Integration
```javascript
import analytics from '@react-native-firebase/analytics';

// Track custom event
await analytics().logEvent('button_press', {
  button_id: 'signup',
  screen: 'welcome'
});

// Track screen view
await analytics().logScreenView({
  screen_name: 'HomeScreen',
  screen_class: 'HomeScreen'
});
```

### Crash Reporting
```javascript
import crashlytics from '@react-native-firebase/crashlytics';

// Log custom error
try {
  // Your code
} catch (error) {
  crashlytics().recordError(error);
}

// Log custom message
crashlytics().log('User signed in');
```