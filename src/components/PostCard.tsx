import React from 'react';
import Link from 'next/link';
import TiltedCard from './TiltedCard';

interface PostCardProps {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  folder: string;
}

const PostCard: React.FC<PostCardProps> = ({ slug, title, description, image }) => (
  <div className="post-card">
    <Link href={`/${slug}`}>
      <TiltedCard
        imageSrc={image || '/images/sample-image.jpg'}
        altText={title}
        captionText={title}
        containerHeight="300px"
        containerWidth="100%"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={!!description}
        overlayContent={
          description ? <p className="tilted-card-demo-text">{description}</p> : null
        }
      />
    </Link>
  </div>
);

export default PostCard;