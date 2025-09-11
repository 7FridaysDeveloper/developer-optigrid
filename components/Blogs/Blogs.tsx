import Link from "next/link";
import { Button } from "../ui/button";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import { getPostsByIds } from "@/graphql/api/post-by-id";
import {transformWordPressPosts} from "@/graphql/api/posts";

export interface BlogCardProps {
  post?: BlogPost;
  idsPosts: number[];
}

export default async function Blogs({ idsPosts }: BlogCardProps) {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  const numberOfPosts = idsPosts.length
  try {
    const wordPressPosts = await getPostsByIds(idsPosts, ['home', 'home-posts-picked']);
    posts = transformWordPressPosts(wordPressPosts);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load blog posts';
    console.error('Error fetching home blog posts:', error);
  }

  return (
    <section
      aria-labelledby="blogs-heading"
      className="mx-auto max-w-6xl px-4 py-12 md:py-20"
    >
      {/* Section header with title and optional "Show all" button */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2
            id="blogs-heading"
            className="pb-4 text-3xl font-semibold tracking-tight text-white"
          >
            News & Insights
          </h2>
          <p className="text-foundation-light-light-active text-lg">
            From The Blog
          </p>
        </div>
        <Button
          asChild
          className="border-foundation-light-darker hidden border text-white transition-colors hover:bg-white md:inline-flex"
          variant="ghost"
        >
          <Link href="/blogs">Show all</Link>
        </Button>
      </div>

      {/* Responsive grid of blog post cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {error ? (
          <div className="col-span-full text-center text-red-400">
            <p>Unable to load blog posts at this time.</p>
          </div>
        ) : posts.length > 0 ? (
          posts.slice(0, numberOfPosts).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            <p>No blog posts available.</p>
          </div>
        )}
      </div>

      {/* Mobile "Show all" button */}
      <Button
        asChild
        className="border-foundation-light-darker mt-8 w-full border text-white transition-colors hover:bg-white md:hidden"
        variant="ghost"
      >
        <Link href="/blogs">Show all</Link>
      </Button>
    </section>
  );
}
