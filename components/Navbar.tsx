'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-green-900 text-white px-4 sm:px-8 lg:px-16 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="size-8 text-gold-400">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
          </svg>
        </div>
        <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">Hon. Ghali Panda</h2>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/">
          Home
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/about">
          About
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/constituency">
          Constituency Services
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/applications">
          Applications
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/projects">
          Projects
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/legislative">
          Legislative Work
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/news">
          News
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/sticker-generator">
          Stickers
        </Link>
        <Link className="text-white hover:text-gold-400 text-sm font-medium transition-colors" href="/contact">
          Contact
        </Link>
      </nav>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-3xl">
          {isMenuOpen ? 'close' : 'menu'}
        </span>
      </button>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-green-900 shadow-lg md:hidden z-50">
          <nav className="flex flex-col py-4">
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/" onClick={closeMenu}>
              Home
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/about" onClick={closeMenu}>
              About
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/constituency" onClick={closeMenu}>
              Constituency Services
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/applications" onClick={closeMenu}>
              Applications
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/projects" onClick={closeMenu}>
              Projects
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/legislative" onClick={closeMenu}>
              Legislative Work
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/news" onClick={closeMenu}>
              News
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/sticker-generator" onClick={closeMenu}>
              Stickers
            </Link>
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors" href="/contact" onClick={closeMenu}>
              Contact
            </Link>
            {/* Admin Link for Mobile Users */}
            <Link className="text-white hover:text-gold-400 text-sm font-medium px-4 py-3 transition-colors bg-green-800/50" href="/admin" onClick={closeMenu}>
              Admin Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}