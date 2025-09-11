"use client";

import Link from "next/link";
import { useState } from "react";

interface HoverPrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HoverPrefetchLink({
  href,
  children,
  className,
  onClick,
}: HoverPrefetchLinkProps) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
