// Convert slug to standard category names and descriptions
// This is client-safe and does not import Node.js server packages (fs, path)

export function getCategoryDetails(categorySlug: string) {
  const categories: { [key: string]: { name: string; description: string; count?: number } } = {
    "bedroom-design": {
      name: "Bedroom Design",
      description: "Explore layouts, wardrobe plans, false ceiling designs, and lighting tips for Bangalore bedrooms."
    },
    "living-room": {
      name: "Living Room",
      description: "Elegant living room setups, TV units, sofa layouts, wall texture patterns, and luxury themes."
    },
    "modular-kitchen": {
      name: "Modular Kitchen",
      description: "Functional L-shaped, parallel, and U-shaped kitchen configurations, smart storage, and colors."
    },
    "wardrobes": {
      name: "Wardrobes",
      description: "Modern wardrobe ideas, sliding doors, walk-in closets, and spatial planning suggestions."
    },
    "waterproofing": {
      name: "Waterproofing",
      description: "Complete guide to terrace, bathroom, basement waterproofing, roof crack sealing, and leak repairs."
    },
    "floor-plans": {
      name: "Floor Plans",
      description: "Browse 20x30, 30x40, Duplex, East-facing, and North-facing architectural home floor plans."
    },
    "construction-cost": {
      name: "Construction Cost",
      description: "Breakdown of house construction rates, material guides, estimation charts, and cost-saving tips."
    },
    "vastu-planning": {
      name: "Vastu Planning",
      description: "Integrate ancient Vastu Shastra directions, entrances, and layouts into modern Bangalore homes."
    },
    "bathroom-design": {
      name: "Bathroom Design",
      description: "Luxury vanity, space-saving layouts, tile combinations, and plumbing layouts for modern bathrooms."
    },
    "renovation": {
      name: "Renovation",
      description: "Transform your old structure, expand balconies, upgrade wiring, and redo flooring in Bangalore."
    }
  };

  const key = categorySlug.toLowerCase();
  return categories[key] || {
    name: categorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    description: `Expert educational guides and insights on ${categorySlug.replace(/-/g, " ")} for homeowners in Bangalore.`
  };
}
