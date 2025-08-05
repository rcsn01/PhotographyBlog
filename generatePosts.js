const fs = require('fs');
const path = require('path');

// Configuration
const IMAGE_DIR = path.join(__dirname, 'public', 'images', 'raw');
const POSTS_DIR = path.join(__dirname, 'posts', 'rawpost');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Get all image files
fs.readdir(IMAGE_DIR, (err, files) => {
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

  // Generate a markdown file for each image
  imageFiles.forEach(file => {
    const postName = path.basename(file, path.extname(file));
    const mdFilename = `${postName}.md`;
    const mdFilePath = path.join(POSTS_DIR, mdFilename);
    
    // Skip if file already exists
    if (fs.existsSync(mdFilePath)) {
      console.log(`Skipped (exists): ${mdFilename}`);
      filesSkipped++;
      return;
    }

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
height: ${Math.floor(Math.random() * 300) + 200}
---
`;

    fs.writeFile(
      mdFilePath,
      mdContent,
      { flag: 'wx' }, // Prevent overwriting
      err => {
        if (err) {
          console.error(`Error writing ${mdFilename}:`, err);
        } else {
          console.log(`Created: ${mdFilename}`);
          filesCreated++;
        }
      }
    );
  });

  console.log(`
    Process complete!
    Images found: ${imageFiles.length}
    New posts created: ${filesCreated}
    Existing posts skipped: ${filesSkipped}
  `);
});