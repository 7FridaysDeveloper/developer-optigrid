"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";

export interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            delay: 0.1,
          },
        },
      }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <Card className="group h-full overflow-hidden rounded-lg border-0 bg-transparent p-0 transition-all duration-300 hover:-translate-y-2 hover:transform">
          <CardHeader className="p-0">
            <div className="relative h-60 w-full overflow-hidden rounded-2xl">
              <Image
                src={post.thumb}
                alt={`Cover image for ${post.title}`}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                fill
                priority={false}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <h3 className="mb-3 line-clamp-2 text-lg leading-tight font-semibold text-white">
              {post.title}
            </h3>
            <div className="text-foundation-light-light-active mb-4 line-clamp-2 text-sm" dangerouslySetInnerHTML={{__html: post.excerpt}}>

            </div>
            {post.date && (
              <time
                className="text-foundation-light-light-active text-sm"
                dateTime={post.date.toISOString()}
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
export default BlogCard;
