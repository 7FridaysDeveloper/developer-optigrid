import { getAllPosts, transformWordPressPosts } from "@/graphql/api/posts";
import BlogsClient from "@/components/Blogs/BlogsClient";
import { getSEOBySlug } from "@/graphql/api/seo";
import { generateMetadataFromSEO, generateNotFoundMetadata } from "@/lib/seo";
import { BlogPost } from "@/types/blog";

// Route segment config for optimal static generation
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata() {
  try {
    const seoData = await getSEOBySlug('blogs', 'page', ['blogs']);

    return generateMetadataFromSEO(
      seoData.seoData,
      seoData.generalSettings,
      `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`
    );
  } catch (error) {
    return generateNotFoundMetadata('Blogs Page', `${process.env.NEXT_PUBLIC_SITE_URL}`);
  }
}

const Blogs = async () => {
  let allPosts: BlogPost[] = [];
  let error: string | null = null;

  try {
    const posts = await getAllPosts();
    const transformedPosts = transformWordPressPosts(posts);
    // Sort posts by date in descending order
    allPosts = transformedPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
  }

  return (
    <div className="bg-foundation-color min-h-screen py-20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-4xl">
            News & insights
          </h1>
        </div>

        {error && <span>{error}</span>}


        <BlogsClient posts={allPosts} />

        {allPosts.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-400 text-lg">No posts found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
