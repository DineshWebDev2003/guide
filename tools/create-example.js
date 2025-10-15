#!/usr/bin/env node
/*
 Simple helper to scaffold a React Native project and inject a chapter App.js template.

 Usage:
  node tools/create-example.js --chapter=02 --name=BlocksDemo

 This script runs `npx react-native init <name>` and copies a template App.js from
 `course/examples/templates/<chapter>-App.js` into the new project. It requires
 Node.js and `npx` available on the PATH. Run this from the repository root.
*/

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  args.forEach(a => {
    const m = a.match(/^--([^=]+)=?(.*)$/);
    if (m) out[m[1]] = m[2] || true;
  });
  return out;
}

async function run() {
  const args = parseArgs();
  const chapter = (args.chapter || args.c || '02').toString().padStart(2, '0');
  const name = args.name || args.n || `ExampleChapter${chapter}`;

  const repoRoot = path.resolve(__dirname, '..');
  const templatesDir = path.join(repoRoot, 'course', 'examples', 'templates');
  const templateFile = path.join(templatesDir, `${chapter}-App.js`);

  console.log(`Creating React Native app '${name}' for chapter ${chapter}...`);

  try {
    // Run npx react-native init
    execSync(`npx react-native init ${name} --version 0.71.0`, { stdio: 'inherit' });
  } catch (err) {
    console.error('\nFailed to run `npx react-native init`. Make sure you have Node.js and npx available, and that you are on a supported platform.');
    process.exit(2);
  }

  const destApp = path.join(process.cwd(), name, 'App.js');

  if (fs.existsSync(templateFile)) {
    fs.copyFileSync(templateFile, destApp);
    console.log(`Injected template ${path.basename(templateFile)} into ${name}/App.js`);
  } else {
    console.log(`Template for chapter ${chapter} not found. Leaving default App.js in place.`);
  }

  console.log('\nDone. Next steps:');
  console.log(`  cd ${name}`);
  console.log('  npx react-native run-android   # or npx react-native run-ios on macOS');
}

run();
