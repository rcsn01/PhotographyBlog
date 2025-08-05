import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import Masonry from '../components/Masonry'; // Adjust path if needed

interface Post {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

interface Props {
  posts: Post[];
}

export default function RawPage({ posts }: Props) {
  const masonryItems = posts.map((post, index) => ({
    id: post.slug,
    img: post.image ?? 'https://picsum.photos/600/800?grayscale&random=' + index,
    url: `/rawpost/${post.slug}`,
    height: 300 + (index % 3) * 100, // Simulated varied heights
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
    
    /*
    <div className="main-container">
      <h1>Raw Blog</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/rawpost/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
    */
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
