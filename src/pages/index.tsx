import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  content: string;
}

interface Props {
  posts: Post[];
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className="main-container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>My Next.js Blog</h1>
      <div style={{ width: '100%', maxWidth: 700 }}>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => {
      const filePath = path.join(postsDirectory, filename);
      return fs.statSync(filePath).isFile() && filename.endsWith('.md');
    })
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        content,
      };
    });

  return {
    props: {
      posts,
    },
  };
};

export default Home;