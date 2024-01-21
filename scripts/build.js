const fs = require("fs");
const path = require("path");
const { spawnSync, execSync } = require("child_process");
const ora = require("ora");

const spinner = ora("Starting build").start();

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.resolve(rootDir, "dist");
const srcDir = path.resolve(rootDir, "src");

// remove the existing build directory
if (fs.existsSync(buildDir)) {
  spinner.text = "Removing existing build directory";
  execSync(`rm -rf ${buildDir}`);
  spinner.text = "✅ Removed existing build directory";
}

spinner.text = "Building \n";
// create the build directory
const build = spawnSync("tsc", ["--build", "tsconfig.json"], {
  cwd: rootDir,
  stdio: "inherit",
});

if (build.status !== 0) {
  spinner.fail("❌ Build failed");
  process.exit(1);
}

spinner.text = "✅ Build successful";

// copy the stylesheets directory to the build directory

spinner.text = "Copying stylesheets";
execSync(`cp -r ${srcDir}/stylesheets ${buildDir}`);
spinner.text = "✅ Copied stylesheets";

spinner.succeed("✅ Build successful");
process.exit(0);
