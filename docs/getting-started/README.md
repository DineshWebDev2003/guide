# Getting Started with Full-Stack React Native Development

This guide will walk you through setting up your development environment and creating your first React Native application.

## Prerequisites

Before starting, ensure you have the following installed:

```bash
# Required Tools
node -v        # Node.js 16.0.0 or higher
npm -v         # NPM 8.0.0 or higher
git --version  # Git 2.0.0 or higher
```

## Development Environment Setup

### 1. Install Node.js and NPM

Download and install Node.js from [nodejs.org](https://nodejs.org)

### 2. Install React Native CLI

```bash
npm install -g react-native-cli
```

### 3. Platform-specific Setup

#### For iOS Development (macOS only):
```bash
# Install Xcode from the App Store
xcode-select --install

# Install CocoaPods
sudo gem install cocoapods
```

#### For Android Development:
1. Install Android Studio
2. Install Android SDK
3. Configure ANDROID_HOME environment variable

## Creating Your First Project

```bash
# Create a new React Native project
npx react-native init MyAwesomeApp

# Navigate to project directory
cd MyAwesomeApp

# Install dependencies
npm install

# Start the development server
npm start
```

## Project Structure

```
MyAwesomeApp/
├── android/          # Android-specific native code
├── ios/             # iOS-specific native code
├── src/             # Source code directory
│   ├── components/  # Reusable components
│   ├── screens/     # Screen components
│   ├── navigation/  # Navigation configuration
│   ├── services/    # API services
│   └── utils/       # Utility functions
├── App.js           # Root component
└── package.json     # Project dependencies
```

## Basic Component Example

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
```

## Running Your App

### iOS
```bash
# Run on iOS simulator
npx react-native run-ios
```

### Android
```bash
# Run on Android emulator or connected device
npx react-native run-android
```

## Next Steps

After setting up your development environment, you can proceed to:
1. [Frontend Development](../frontend/README.md) to learn about UI development
2. [Backend Development](../backend/README.md) to set up your Laravel backend
3. [Best Practices](../best-practices/README.md) to learn about coding standards

## Troubleshooting Common Issues

### Metro Bundler Issues
```bash
# Clear metro bundler cache
npm start -- --reset-cache
```

### iOS Build Failures
```bash
cd ios
pod install
cd ..
```

### Android Build Failures
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```