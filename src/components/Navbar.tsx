"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { DumbbellIcon, HomeIcon, MenuIcon, UserIcon, XIcon, ZapIcon } from "lucide-react";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Function to handle clicks outside the menu
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // Check if menu is open and refs are available
      if (!menuRef.current || !menuButtonRef.current || !mobileMenuOpen) return;
      
      // Get the target element from the event
      const target = e.target as Node;
      
      // Close menu if click is outside menu and menu button
      if (!menuRef.current.contains(target) && !menuButtonRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <ZapIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono">
            trainium<span className="text-primary">.ai</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-5">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link
                href="/generate-program"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <DumbbellIcon size={16} />
                <span>Generate</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </Link>
              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
              >
                <Link href="/generate-program">Get Started</Link>
              </Button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON - Visible only on mobile */}
        <div className="md:hidden flex items-center">
          {isSignedIn && <UserButton className="mr-2" />}
          <Button 
            ref={menuButtonRef}
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU - Slides in from the right when open */}
      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
        >
          <div className="container mx-auto py-4 flex flex-col gap-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <HomeIcon size={18} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/generate-program"
                  className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <DumbbellIcon size={18} />
                  <span>Generate</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <UserIcon size={18} />
                  <span>Profile</span>
                </Link>

                <Button
                  asChild
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  <Link href="/generate-program" onClick={toggleMobileMenu}>Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 p-2">
                <SignInButton>
                  <Button
                    variant="outline"
                    className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;