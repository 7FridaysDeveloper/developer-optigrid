"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { LoadingIndicator } from "./ui/loading-indicator";
import { HoverPrefetchLink } from "./ui/hover-prefetch-link";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        menuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setMenuOpen(false);
        setIsProductsOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle navigation state
  const handleNavigation = () => {
    setIsNavigating(true);
    setMenuOpen(false);
    setIsProductsOpen(false);

    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#0B1622]/80 shadow-lg backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        {/* Navigation loading indicator */}
        {isNavigating && (
          <div className="absolute top-0 left-0 h-1 w-full animate-pulse bg-blue-500">
            <div className="h-full animate-ping bg-blue-400"></div>
          </div>
        )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-shrink-0 items-center gap-2">
              <Link
                href="/"
                className="flex items-center"
                onClick={handleNavigation}
              >
                <Image
                  src="/logos/logo.webp"
                  alt="OptiGrid Logo"
                  width={110}
                  height={40}
                  className="h-10"
                  priority
                />
              </Link>
            </div>
            <div className="navbar hidden items-center gap-6 md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="cursor-pointer bg-transparent text-white hover:bg-[#1a2230] hover:text-white">
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products/optibidder"
                              className="block space-y-1 rounded-md p-3 leading-none text-white no-underline transition-colors outline-none select-none hover:bg-[#1a2230] hover:text-white"
                              onClick={handleNavigation}
                            >
                              OptiBidder
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products/openbess"
                              className="block space-y-1 rounded-md p-3 leading-none text-white no-underline transition-colors outline-none select-none hover:bg-[#1a2230] hover:text-white"
                              onClick={handleNavigation}
                            >
                              OpenBESS
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <HoverPrefetchLink
                href="/about"
                className="flex items-center text-white transition"
                onClick={handleNavigation}
              >
                About us
                <LoadingIndicator className="ml-1" showSpinner={false} />
              </HoverPrefetchLink>
              <HoverPrefetchLink
                href="/blogs"
                className="flex items-center text-white transition"
                onClick={handleNavigation}
              >
                News & Insights
                <LoadingIndicator className="ml-1" showSpinner={false} />
              </HoverPrefetchLink>
              <Link
                href="/contact-us"
                className={cn(
                  "border-foundation-light-dark text-foundation-light-normal",
                  "rounded-md border px-4 py-2 hover:bg-transparent hover:text-white",
                  "hover:bg-foundation-light-dark text-md",
                  "transition-all duration-300",
                )}
                onClick={handleNavigation}
              >
                Contact us
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMenuOpen(!menuOpen)}
                className="menu-button text-white focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu fixed inset-x-0 top-16 z-40 m-2 mt-0 border-b border-[#353c49] bg-[#0B1622]">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-6">
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex w-full items-center justify-between py-2 text-white transition hover:bg-transparent"
              >
                <span>Products</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isProductsOpen ? "rotate-180" : "",
                  )}
                />
              </Button>
              {isProductsOpen && (
                <div className="space-y-2 border-l border-[#1a2230] pl-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="block w-full justify-start py-2 text-white transition hover:bg-transparent"
                  >
                    <Link
                      href="/products/optibidder"
                      onClick={handleNavigation}
                    >
                      OptiBidder
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="block w-full justify-start py-2 text-white transition hover:bg-transparent"
                  >
                    <Link href="/products/openbess" onClick={handleNavigation}>
                      OpenBess
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <Button
              asChild
              variant="ghost"
              className="block w-full justify-start py-2 text-white transition hover:bg-transparent"
            >
              <Link href="/about" onClick={handleNavigation}>
                About us
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="block w-full justify-start py-2 text-white transition hover:bg-transparent"
            >
              <Link href="/blogs" onClick={handleNavigation}>
                News & Insights
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="block w-full justify-start py-2 text-white transition hover:bg-transparent"
            >
              <Link href="/contact-us" onClick={handleNavigation}>
                Contact us
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
