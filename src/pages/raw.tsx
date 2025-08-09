import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import Masonry from '../components/Masonry'; // Adjust path if needed

interface Post {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  height: number;
  thumbnail?: string;     // pre-generated thumbnail path
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
    post,
  }));

  return (
    <div className="blog" style={{ padding: '2rem' }}>
      {/* ✅ Experiences Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fujifilm XT-30</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.1fr 0.15fr 0.15fr 0.5fr', // ✅ 3 columns
            gap: '0.5rem 1rem',
            fontSize: '1rem',
            lineHeight: '1.8',
          }}
        >
          {/* Row 1 */}
          <div style={{ fontStyle: 'italic' }}>FujiFilm XF</div>
          <div>18-55mm 2.8:4</div>
          <div>R LM OIS Ø58</div>
          <div></div>

          {/* Row 2 */}
          <div style={{ fontStyle: 'italic' }}>Sigma</div>
          <div>16mm 1:1.4</div>
          <div>DC DN Ø67</div>
          <div></div>

          {/* Row 3 */}
          <div style={{ fontStyle: 'italic' }}>Pergear</div>
          <div>25mm 1.8:16</div>
          <div>HD.MC Ø43</div>
          <div></div>
        </div>
      </section>

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
