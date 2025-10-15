# JavaScript vs TypeScript: Quick Guide for this Course

This guide explains why and how to use the JavaScript (JS) and TypeScript (TS) templates included in this course repository.

## Why JS vs TS?
- JavaScript (JS): Simple, fast to start, great for beginners. No compilation step. Use JS templates when you want the quickest iteration.
- TypeScript (TS): Adds static types, catches many bugs early, improves tooling (auto-complete, refactors). Use TS when building larger apps or when you want safer code.

## How the templates are organized
- `course/examples/templates/*-App.js` — ready-to-paste `App.js` files (JavaScript)
- `course/examples/templates/*-App.tsx` — TypeScript equivalents with basic typings

## How to use
1. Choose JS or TS template for the chapter you want to run.
2. Create a new React Native project and replace `App.js` with the selected template.
3. For TS projects, you must initialize the project with TypeScript support (or rename files and add `tsconfig.json`).

### Quick commands (PowerShell)
```powershell
# JS: create project and run
npx react-native init ExampleJS
cd ExampleJS
# copy App.js from template
# then:
npx react-native run-android

# TS: create project with TypeScript template
npx react-native init ExampleTS --template react-native-template-typescript
cd ExampleTS
# copy App.tsx from template
# install types if necessary
npm install --save-dev @types/react @types/react-native
npx react-native run-android
```

## How TypeScript works
- TypeScript is a superset of JavaScript that adds type annotations.
- During development, TypeScript files (`.ts`/`.tsx`) are compiled to JavaScript.
- Types help the editor and the compiler catch mistakes before runtime.

## Tips
- Beginners: start with JS templates and move to TS when comfortable.
- If using VS Code, install the official TypeScript and ESLint extensions for best experience.

## Next steps
- Try both JS and TS templates for the same chapter to feel the differences.
- Convert a small JS component to TS to practice adding types.
