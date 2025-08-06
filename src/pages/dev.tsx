import { GetStaticProps } from 'next';
import { getPostsFromFolder } from '../utils/getPosts';
import TiltedCard from '../components/TiltedCard';
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
    <div className="main-container">
      <h1>Dev Blog</h1>
      <div className="cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {posts.map((post) => (
          <ImageCard key={post.slug} post={post} onClick={() => router.push(`/dev/${post.slug}`)} />
        ))}
      </div>
      <div style={{ height: '100vh' }}></div>
    </div>
    
  );
}

// ImageCard component with slideshow
const ImageCard: React.FC<{ post: Post; onClick: () => void }> = ({ post, onClick }) => {
  const { title, images } = post;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through images every 3 seconds
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
        borderRadius: '12px',
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
          width: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          textAlign: 'center',
          padding: '0.5rem',
          fontSize: '1rem',
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
