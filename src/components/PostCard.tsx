import React from 'react';
import Link from 'next/link';

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
      <h2>{title}</h2>
    </Link>
    {image && (
      <img src={image} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
    )}
    {description && <p>{description}</p>}
  </div>
);

export default PostCard;