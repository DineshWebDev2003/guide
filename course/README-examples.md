# Running Chapter Examples

This file explains how to quickly create runnable React Native example projects using the helper script in `tools/` and the templates under `course/examples/templates`.

Prerequisites:
- Node.js (LTS)
- npm (comes with Node)
- npx
- On macOS: Xcode for iOS builds
- Android Studio + SDK for Android builds

Steps:
1. From repository root, run:

```powershell
# Example: create a project for chapter 02 (building blocks)
node tools/create-example.js --chapter=02 --name=BlocksDemo
cd BlocksDemo
npm install
npx react-native run-android
```

2. If you need to run chapter 04 example (Todo):

```powershell
node tools/create-example.js --chapter=04 --name=TodoDemo
cd TodoDemo
npm install
npx react-native run-android
```

Notes:
- The script will attempt to run `npx react-native init` which can be slow (several minutes) and may require additional setup on Windows/macOS.
- Templates are simple `App.js` files that replace the default `App.js` produced by `react-native init`.
- For examples that use native modules (like AsyncStorage, FastImage, reanimated), you may need to install and link them manually and run `pod install` for the `ios` directory on macOS.

If you want, I can scaffold full example folders (with package.json preconfigured) inside this repo so you can run them without calling `npx react-native init` each time.