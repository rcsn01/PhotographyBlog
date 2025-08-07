import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrueFocus from '../components/TrueFocus';
import RotatingText from '../components/RotatingText';
import Iridescence from '../components/Iridescence';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const Home: React.FC = () => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

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
          router.push('/dev');
        }, 700);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, isTransitioning]);

  return (
    <div
      className="main-container"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        padding: '4rem 1rem',
        overflow: 'hidden',
      }}
    >
      {/* Background text */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(44%, 38%, 57vh)',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.7rem',
          fontWeight: 100,
          color: 'rgba(109, 109, 109, 1)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        Hi, I'm Ivan
      </div>

      {/* Foreground content */}
      <div style={{ marginTop: '10rem', textAlign: 'center' }}>
        {/* Foreground content */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            zIndex: 1,
            justifyContent: 'center',
          }}
        >
          <RotatingText
            texts={['Full Stack', 'Front End', 'Back End', 'Data']}
            animationType="slide"
            duration={0.6}
            delayBetween={2}
          />
          <span>Engineer</span>
        </div>

        <div style={{ zIndex: 1, marginTop: '5rem' }}>
          <TrueFocus
            sentence="P h o t o g r a p h e r"
            manualMode={false}
            blurAmount={1.2}
            borderColor="blue"
            animationDuration={0.1}
            pauseBetweenAnimations={0.02}
          />
        </div>
      </div>


      {/* Extra section for scroll */}
      <div style={{ height: '20vh' }}></div>

      {/* Social buttons */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 10,
        }}
      >
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          <FaLinkedin size={24} />
        </a>
        <a href="mailto:your@email.com" style={buttonStyle}>
          <FaEnvelope size={24} />
        </a>
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  );
};

// Button styles
const buttonStyle: React.CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '50%',
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  color: '#333',
  transition: 'all 0.2s',
  cursor: 'pointer',
};

export default Home;
