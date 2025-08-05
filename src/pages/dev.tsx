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
      <div className="cards-container">
        {posts.map((post) => (
          <TiltedCard
            key={post.slug}
            imageSrc={post.image ?? '/placeholder.jpg'}
            altText={post.title}
            captionText={post.description ?? ''}
            containerHeight="300px"
            containerWidth="100%"
            imageHeight="300px"
            imageWidth="100%"
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text">
                Kendrick Lamar - GNX
              </p>
            }
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
