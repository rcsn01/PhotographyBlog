import React from 'react';
import Markdown from 'react-markdown';

interface PostProps {
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ title, content }) => {
  return (
    <div className="post-content">
      <h1 style={{ textAlign: 'center', marginTop: 0 }}>{title}</h1>
      <div>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Post;