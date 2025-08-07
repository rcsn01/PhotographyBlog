import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Post {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  features?: string[];
  tools?: string[];
  images?: string[];
  content?: string;
}

interface Props {
  posts: Post[];
}

export default function DevPage({ posts }: Props) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle scroll transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      if (scrollPercent > 90 && !isTransitioning) {
        setIsTransitioning(true);
        document.body.classList.add('page-exit');
        setTimeout(() => {
          router.push('/raw');
        }, 700);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, isTransitioning]);

  return (
    <div className="blog" style={{ padding: '2rem' }}>
      {/* ✅ Experiences Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Experiences</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.5fr 1fr 1fr', // ✅ 3 columns
            gap: '0.5rem 1rem',
            fontSize: '1rem',
            lineHeight: '1.8',
          }}
        >
          {/* Row 1 */}
          <div style={{ fontStyle: 'italic' }}>05 25' - 08 25'</div>
          <div>365 Roadside Assistant</div>
          <div><strong>Data Engineer & Back End Developer</strong></div>

          {/* Row 2 */}
          <div style={{ fontStyle: 'italic' }}>05 25' - 08 25'</div>
          <div>Optik Engineering Consultancy</div>
          <div><strong>Consultant</strong></div>

          {/* Row 3 */}
          <div style={{ fontStyle: 'italic' }}>02 25' - 06 25'</div>
          <div>SpeedX</div>
          <div><strong>Full Stack Software Developer</strong></div>
        </div>
      </section>

      {/* ✅ Skills Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Skills</h2>
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Programming Languages:</strong> Python (with expertise in data analytics libraries), Java, C, C#, SQL</p>
          <p><strong>Frameworks & Libraries:</strong> TensorFlow, ASP.NET, ASP.NET Core, ASP.NET Web API, ASP.NET Razor, MVC (Model-View-Controller)</p>
          <p><strong>Cloud & DevOps:</strong> Amazon Web Services (AWS), AWS Lambda</p>
          <p><strong>Tools & Platforms:</strong> GitHub, Swagger API, Jupyter, Visual Studio, VS Code</p>
          <p><strong>Databases:</strong> PostgreSQL, SQL</p>
          <p><strong>Data & AI Skills:</strong> Data Analysis, Data Processing, Data Visualization, Machine Learning, Computer Vision, Cybersecurity</p>
          <p><strong>Project & Development Methodologies:</strong> Agile Methodologies, Project Management, Client Expectations Management</p>
          <p><strong>Languages:</strong> English, Chinese (Mandarin)</p>
        </div>
      </section>

      {/* ✅ Projects Section */}
      {/*<h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Projects</h2>*/}
      <div
        className="cards-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // ✅ Increased min width
          marginTop: '5rem',
          gap: '2.5rem', // Slightly larger gap
        }}
      >
        {posts.map((post) => (
          <ImageCard key={post.slug} post={post} onClick={() => router.push(`/dev/${post.slug}`)} />
        ))}
      </div>

      <div style={{ height: '100vh' }}></div>
    </div>
  );
}

// ✅ ImageCard remains unchanged
const ImageCard: React.FC<{ post: Post; onClick: () => void }> = ({ post, onClick }) => {
  const { title, images } = post;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.2s ease',
      }}
      className="hover:scale-105"
    >
      {images && images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt={title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
          color: 'white',
          fontSize: '1rem',
          fontWeight: 500,
          boxSizing: 'border-box',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsFromFolder('devpost');
  return { props: { posts } };
};
