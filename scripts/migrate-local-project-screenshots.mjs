import fs from "node:fs/promises";

const file = "app/PortfolioBackendFeatures.tsx";
let source = await fs.readFile(file, "utf8");

source = source.replace(
  /function screenshot\(url: string, width: number\) \{[\s\S]*?\n\}/,
  `function localScreenshot(projectName: string, kind: "desktop" | "mobile") {
  const slugMap: Record<string, string> = {
    "Maniac Nails": "maniac-nails",
    "Free The Roots": "free-the-roots",
    "Laudi Vidni": "laudi-vidni",
    "Starfire Direct": "starfire-direct",
  };
  const slug = slugMap[projectName];
  return slug ? \`/projects/\${slug}-\${kind}.webp\` : "";
}`
);

source = source.replace(
  /\$\{screenshot\(project\.url, 1400\)\}/g,
  '${localScreenshot(project.name, "desktop")}'
);

source = source.replace(
  /\$\{screenshot\(project\.url, 520\)\}/g,
  '${localScreenshot(project.name, "mobile")}'
);

if (source.includes("image.thum.io")) {
  throw new Error("Migration incomplete: image.thum.io is still present.");
}

await fs.writeFile(file, source);
console.log("✓ PortfolioBackendFeatures.tsx now uses local screenshots.");
