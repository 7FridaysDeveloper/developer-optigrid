import {ReactNode} from "react";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: Date;
  image: string;
  thumb: string;
  slug: string;
  content?: ReactNode;
  author?: string;
  readTime?: string;
  category?: string[];
  tags?: string[];
  relatedLinks?: RelatedLink[];
  quote?: string;
}

export interface RelatedLink {
  title: string;
  description?: string;
  url?: string;
}
