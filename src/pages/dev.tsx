import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import TiltedCard from '../components/TiltedCard';

interface Post {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

interface Props {
  posts: Post[];
}

export default function DevPage({ posts }: Props) {
  return (
    <div className="main-container">
      <h1>Dev Blog</h1>
      <div style={{ width: '100%', maxWidth: 700 }}>
        {posts.map((post) => (
          <TiltedCard
            key={post.slug}
            imageSrc={post.image ?? '/placeholder.jpg'} // fallback image if missing
            altText={post.title}
            captionText={post.description ?? ''}
            containerHeight="300px"
            containerWidth="100%"
            imageHeight="300px"
            imageWidth="100%"
            showMobileWarning={false}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('devpost');
  return { props: { posts } };
};
