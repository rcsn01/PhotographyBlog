const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const IMAGE_DIR = path.join(__dirname, 'public', 'images', 'raw');
const POSTS_DIR = path.join(__dirname, 'posts', 'rawpost');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Get all image files
fs.readdir(IMAGE_DIR, async (err, files) => {
  if (err) {
    console.error('Error reading image directory:', err);
    return;
  }

  // Filter for image files
  const imageFiles = files.filter(file => 
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())
  );

  let filesCreated = 0;
  let filesSkipped = 0;

  // Process images sequentially to avoid too many files open at once
  for (const file of imageFiles) {
    const postName = path.basename(file, path.extname(file));
    const mdFilename = `${postName}.md`;
    const mdFilePath = path.join(POSTS_DIR, mdFilename);
    const imagePath = path.join(IMAGE_DIR, file);
    
    // Skip if file already exists
    if (fs.existsSync(mdFilePath)) {
      console.log(`Skipped (exists): ${mdFilename}`);
      filesSkipped++;
      continue;
    }

    try {
      // Get image dimensions
      const metadata = await sharp(imagePath).metadata();
      const aspectRatio = metadata.height / metadata.width;

      // Generate content with proper title formatting
      const prettyTitle = postName
        .replace(/([A-Z])/g, ' $1')
        .replace(/(\d+)/g, ' $1')
        .trim();
        
      const mdContent = `---
title: "${prettyTitle}"
date: "${new Date().toISOString().split('T')[0]}"
description: "A beautiful photograph"
image: /images/raw/${file}
captionText: "Scenic view"
tags:
  - photography
  - nature
height: ${aspectRatio}
---
`;

      fs.writeFileSync(mdFilePath, mdContent, { flag: 'wx' });
      console.log(`Created: ${mdFilename}`);
      filesCreated++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(`
    Process complete!
    Images found: ${imageFiles.length}
    New posts created: ${filesCreated}
    Existing posts skipped: ${filesSkipped}
  `);
});