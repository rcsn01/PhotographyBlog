import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPostsFromFolder(folder: string) {
  const postsDirectory = path.join(process.cwd(), 'posts', folder);
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.md'));

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      features: Array.isArray(data.features) ? data.features : [],
      tools: Array.isArray(data.tools) ? data.tools : [],
      image: data.image || '', // <-- add this line
      thumbnail: data.thumbnail || '', // <-- add this
      images: Array.isArray(data.images) ? data.images : [], // ✅ support multiple images
      content: content.trim(), // ✅ get actual markdown content for details page
      height: data.height || 300, // Default height if not specified
    };
  });

  return posts;
}
