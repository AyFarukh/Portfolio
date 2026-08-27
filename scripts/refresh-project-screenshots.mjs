import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const branch = "feature/self-learning-chatbot";
const root = process.cwd();
const outDir = path.join(root, "public", "projects");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

function output(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) return "";
  return result.stdout.trim();
}

const currentBranch = output("git", ["branch", "--show-current"]);
if (currentBranch !== branch) {
  throw new Error(`Run this from ${branch}. Current branch: ${currentBranch || "unknown"}`);
}

fs.mkdirSync(outDir, { recursive: true });

console.log("Installing temporary screenshot tooling...");
run("npm", ["install", "--no-save", "--package-lock=false", "playwright", "sharp"]);

console.log("Installing Chromium for Playwright...");
run("npx", ["playwright", "install", "chromium"]);

console.log("Capturing desktop and mobile storefront screenshots...");
run("node", ["scripts/capture-project-screenshots.mjs"]);

const webps = fs.readdirSync(outDir).filter((name) => name.endsWith(".webp"));
if (webps.length === 0) {
  throw new Error("No WebP screenshots were generated.");
}

console.log(`Generated ${webps.length} WebP screenshots.`);
run("git", ["add", "public/projects"]);

const diff = spawnSync("git", ["diff", "--cached", "--quiet"], { cwd: root });
if (diff.status === 0) {
  console.log("Screenshots are already up to date. Nothing to publish.");
  process.exit(0);
}

run("git", ["commit", "-m", "chore: refresh local project screenshots"]);
run("git", ["push", "origin", branch]);
console.log(`Published screenshots to ${branch}.`);
