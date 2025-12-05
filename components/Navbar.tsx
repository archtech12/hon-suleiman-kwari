'use client'

import {useState} from 'react'
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
    <header className="flex items-center justify-between whitespace-nowrap bg-white text-green-900 px-4 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95 border-b border-green-100">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="size-7 sm:size-8 text-green-700 flex-shrink-0">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
          </svg>
        </div>
        <h2 className="text-green-900 text-base sm:text-lg lg:text-xl font-bold tracking-tight">
          Hon. Suleiman Kwari
        </h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/about"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/constituency"
        >
          Constituency
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/projects"
        >
          Projects
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/legislative"
        >
          Legislative
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/news"
        >
          News
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/sticker-generator"
        >
          🎨 Stickers
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
          href="/volunteer"
        >
          <span className="material-symbols-outlined text-lg">volunteer_activism</span>
          <span>Join Us</span>
        </Link>
        <Link
          className="text-green-900 hover:text-green-700 text-sm font-bold transition-colors relative group"
          href="/contact"
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-green-900 focus:outline-none p-1 hover:bg-green-50 rounded-lg transition-colors touch-manipulation"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden z-50 border-t border-green-100 animate-slideDown">
          <nav className="flex flex-col py-2">
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">home</span>
              <span>Home</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/about"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">person</span>
              <span>About</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/constituency"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">location_city</span>
              <span>Constituency</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/projects"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">construction</span>
              <span>Projects</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/legislative"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">gavel</span>
              <span>Legislative Work</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/news"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">newspaper</span>
              <span>News</span>
            </Link>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/sticker-generator"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">style</span>
              <span>🎨 Sticker Generator</span>
            </Link>
            <div className="px-4 py-2">
              <Link
                className="bg-green-700 hover:bg-green-800 active:bg-green-900 text-white px-5 py-3.5 rounded-xl text-base font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 w-full touch-manipulation"
                href="/volunteer"
                onClick={closeMenu}
              >
                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                <span>Join Us as Volunteer</span>
              </Link>
            </div>
            <Link
              className="text-green-900 hover:bg-green-50 hover:text-green-700 active:bg-green-100 text-base font-bold px-5 py-3.5 transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-green-700"
              href="/contact"
              onClick={closeMenu}
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
