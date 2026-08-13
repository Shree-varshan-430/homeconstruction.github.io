const fs = require("fs");
const path = require("path");

const artifactDir = "C:/Users/SHREE VARSHAN/.gemini/antigravity/brain/9509d474-d874-4f40-9cca-e942cde425af";
const targetDir = path.join(__dirname, "../public/images");
const ogDir = path.join(__dirname, "../public/og");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

// Locate generated files in the artifact directory
const files = fs.readdirSync(artifactDir);
const bedroomSrc = files.find(f => f.startsWith("bedroom_modern") && f.endsWith(".jpg"));
const constructionSrc = files.find(f => f.startsWith("construction_cost") && f.endsWith(".jpg"));
const waterproofingSrc = files.find(f => f.startsWith("terrace_waterproofing") && f.endsWith(".jpg"));

if (!bedroomSrc || !constructionSrc || !waterproofingSrc) {
  console.error("Error: Could not locate all generated images in artifact directory.", {
    bedroomSrc,
    constructionSrc,
    waterproofingSrc
  });
  process.exit(1);
}

const bedroomPath = path.join(artifactDir, bedroomSrc);
const constructionPath = path.join(artifactDir, constructionSrc);
const waterproofingPath = path.join(artifactDir, waterproofingSrc);

// Define categories mapping to these 3 base images
const imageMappings = {
  // Bedroom Design / Wardrobes / Bathroom / Kitchen / Living Room
  "bedroom-modern.jpg": bedroomPath,
  "bedroom-small.jpg": bedroomPath,
  "wardrobe-trends.jpg": bedroomPath,
  "bedroom-lighting.jpg": bedroomPath,
  "bedroom-luxury.jpg": bedroomPath,
  "tv-unit.jpg": bedroomPath,
  "false-ceiling.jpg": bedroomPath,
  "sofa-layout.jpg": bedroomPath,
  "wall-texture.jpg": bedroomPath,
  "hall-design.jpg": bedroomPath,
  "kitchen-layouts.jpg": bedroomPath,
  "kitchen-l-shape.jpg": bedroomPath,
  "kitchen-parallel.jpg": bedroomPath,
  "kitchen-storage.jpg": bedroomPath,
  "kitchen-colors.jpg": bedroomPath,
  "sliding-wardrobe.jpg": bedroomPath,
  "walkin-wardrobe.jpg": bedroomPath,
  "wardrobe-material.jpg": bedroomPath,
  "wardrobe-accessories.jpg": bedroomPath,
  "corner-wardrobe.jpg": bedroomPath,
  "bathroom-vanity.jpg": bedroomPath,
  "bathroom-zones.jpg": bedroomPath,
  "bathroom-small.jpg": bedroomPath,
  "bathroom-tiles.jpg": bedroomPath,
  "bathroom-plumbing.jpg": bedroomPath,

  // Construction / Floor plans / Vastu
  "construction-cost.jpg": constructionPath,
  "construction-steps.jpg": constructionPath,
  "foundation-guide.jpg": constructionPath,
  "brick-vs-aac.jpg": constructionPath,
  "concrete-grades.jpg": constructionPath,
  "floorplan-20x30.jpg": constructionPath,
  "floorplan-30x40.jpg": constructionPath,
  "floorplan-east.jpg": constructionPath,
  "floorplan-north.jpg": constructionPath,
  "vastu-floorplan.jpg": constructionPath,
  "cost-estimation.jpg": constructionPath,
  "cost-savings.jpg": constructionPath,
  "material-comparison.jpg": constructionPath,
  "architect-fees.jpg": constructionPath,
  "hidden-costs.jpg": constructionPath,

  // Waterproofing & Renovation
  "terrace-waterproofing.jpg": waterproofingPath,
  "bathroom-waterproofing.jpg": waterproofingPath,
  "wall-leakage.jpg": waterproofingPath,
  "roof-repair.jpg": waterproofingPath,
  "basement-waterproofing.jpg": waterproofingPath,
  "renovation-checklist.jpg": waterproofingPath,
  "structural-renovation.jpg": waterproofingPath,
  "balcony-safety.jpg": waterproofingPath,
  "apartment-renovation.jpg": waterproofingPath,
  "renovation-cost.jpg": waterproofingPath
};

// Copy all mapped images
Object.entries(imageMappings).forEach(([targetName, srcPath]) => {
  const destPath = path.join(targetDir, targetName);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${targetName}`);
});

// Copy construction cost as default OG image
fs.copyFileSync(constructionPath, path.join(ogDir, "default.jpg"));
console.log("Copied default OG share image");

// Copy bedroom image as placeholder favicon (favicon.ico or similar)
fs.copyFileSync(bedroomPath, path.join(__dirname, "../public/favicon.ico"));
console.log("Copied placeholder favicon.ico");

console.log("Assets copy operation finished successfully.");
