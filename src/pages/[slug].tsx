import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownToHtml from '../utils/markdownToHtml';
import Post from '../components/Post';

const PostPage = ({ frontmatter, content }) => {
  return (
    <div className="main-container">
      <Post title={frontmatter.title} content={content} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts', params.slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const htmlContent = await markdownToHtml(content || '');

  return {
    props: {
      frontmatter,
      content: htmlContent,
    },
  };
};

export default PostPage;