import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import Masonry from '../components/Masonry'; // Adjust path if needed

interface Post {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  height: number;
}

interface Props {
  posts: Post[];
}

export default function RawPage({ posts }: Props) {
  const masonryItems = posts.map((post, index) => ({
    id: post.slug,
    img: post.image ?? 'https://picsum.photos/600/800?grayscale&random=' + index,
    url: `/rawpost/${post.slug}`,
    //height: post.height || 300,
    height: Math.floor(Math.random() * (500 - 200 + 1)) + 200, // Random between 200-500
    post,
  }));

  return (
    
    <div className="main-container">
      <h1>Raw Blog</h1>
      <Masonry
        items={masonryItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.97}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </div>
  );
}

/*
export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('rawpost');
  return { props: { posts } };
};
*/

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('rawpost');
  console.log('Loaded posts:', posts);
  return { props: { posts } };
};
