"use client";

import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="text-foundation-gray-normal mb-6 flex items-center space-x-1 text-xs lg:text-base">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-foundation-gray-normal">›</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foundation-light-normal">Read</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
