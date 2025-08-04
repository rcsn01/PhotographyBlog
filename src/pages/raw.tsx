import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostCard from '../components/PostCard';
import { getPostsFromFolder } from '../utils/getPosts';

interface Post {
  slug: string;
  title: string;
  description?: string;
}

interface Props {
  posts: Post[];
}

export default function RawPage({ posts }: Props) {
  return (
    <div className="main-container">
      <h1>Raw Blog</h1>
      <div style={{ width: '100%', maxWidth: 700 }}>
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            folder="rawpost"
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getPostsFromFolder('rawpost'); // or 'rawpost'
  return { props: { posts } };
}