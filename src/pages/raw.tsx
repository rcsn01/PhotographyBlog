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
  const limitedPosts = posts.slice(0, 40);
  const masonryItems = limitedPosts.map((post, index) => ({
    id: post.slug,
    img: post.image ?? 'https://picsum.photos/600/800?grayscale&random=' + index,
    url: `/rawpost/${post.slug}`,
    height: post.height * 600,
    //height: Math.floor(Math.random() * (1500 - 500 + 1)) + 500, // Random between 200-500
    post,
  }));

  return (
    
    <div className="main-container">
      <h1>Raw Blog</h1>
      <Masonry
        items={masonryItems}
        ease="easeIn"
        duration={0.3}
        stagger={0.05}
        animateFrom="left"
        scaleOnHover={true}
        hoverScale={1.02}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('rawpost');
  return { props: { posts } };
};

/*
export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('rawpost');
  console.log('Loaded posts:', posts);
  return { props: { posts } };
};
*/
