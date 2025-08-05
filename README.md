# My Next.js Blog

This is a simple blog application built with Next.js and TypeScript. The blog supports Markdown posts and allows for images to be stored locally.

## Project Structure

```
my-nextjs-blog
├── public
│   └── images
│       └── sample-image.jpg
├── posts
│   └── hello-world.md
├── src
│   ├── components
│   │   └── Post.tsx
│   ├── pages
│   │   ├── index.tsx
│   │   └── [slug].tsx
│   └── utils
│       └── markdownToHtml.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Markdown Support**: Write posts in Markdown format.
- **Dynamic Routing**: Each post can be accessed via a unique URL.
- **Image Support**: Store and display images locally.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-nextjs-blog
   ```


reload path
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")



3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   npm run build
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to see the blog in action.

## Creating a New Post

To auto generate new post, run
```
node generatePosts.js
npm run generate-posts
```

To create a new post, add a Markdown file in the `posts` directory. The filename will be used as the slug for the post URL.

## License

This project is licensed under the MIT License.