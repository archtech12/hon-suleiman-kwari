'use client'

import {Header} from '@/components/Header'
import {GhaliTimeline, timelineData} from '@/components/GhaliTimeline'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HomePageProps {
  data: any
}

export function HomePage({data}: HomePageProps) {
  // Default to empty values if no data is provided
  const {title = "Dr. Ghali Mustapha Tijjani Phanda"} = data || {}
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard events for showing admin link
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A to show admin link
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminLink(true);
      }
      // ESC to hide admin link
      if (e.key === 'Escape') {
        setShowAdminLink(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-20">
        {/* Hero Section Skeleton */}
        <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <div className="h-16 bg-green-700/30 rounded mb-4 animate-pulse"></div>
                <div className="h-8 bg-green-700/30 rounded mb-6 animate-pulse"></div>
                <div className="space-y-3 mb-8">
                  <div className="h-4 bg-green-700/30 rounded animate-pulse"></div>
                  <div className="h-4 bg-green-700/30 rounded animate-pulse w-5/6"></div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-12 w-32 bg-green-700/30 rounded animate-pulse"></div>
                  <div className="h-12 w-32 bg-green-700/30 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-green-700/30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Skeleton */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="h-16 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Dr. Ghali Mustapha Tijjani Phanda
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-200">
                Community Leader & Philanthropist
              </h2>
              <p className="text-lg mb-8 max-w-2xl text-green-50">
                Official digital home showcasing leadership, philanthropy, and community transformation across Gaya, Ajingi, and Albasu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-white text-green-800 hover:bg-green-100 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  Connect With Me
                </Link>
                <Link href="/projects" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  View My Work
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {/* Dr. Ghali's portrait with optimization */}
                  <Image 
                    src="/ghaliphoto.jpg" 
                    alt="Dr. Ghali Mustapha Tijjani Phanda" 
                    width={320} 
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gold-500 text-green-900 font-bold py-2 px-4 rounded-lg shadow-lg transform rotate-3">
                  15,000+ Beneficiaries Helped
                </div>
                <div className="absolute -top-4 -left-4 bg-white text-green-800 font-bold py-2 px-4 rounded-lg shadow-lg transform -rotate-3">
                  1+ Years Service
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden Admin Link - Only visible when activated */}
        {showAdminLink && (
          <div className="absolute top-4 right-4">
            <Link 
              href="/admin" 
              className="text-xs text-white/70 hover:text-white underline"
              title="Admin Dashboard"
            >
              Admin Access
            </Link>
          </div>
        )}
      </section>

      {/* Enhanced Impact Dashboard */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-green-800">My Impact In Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measuring the real difference we've made in our communities through dedicated service and programs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">15,000+</div>
              <div className="text-gray-600">Beneficiaries Helped</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">25+</div>
              <div className="text-gray-600">Programs Launched</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">1+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">3</div>
              <div className="text-gray-600">Communities Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
                {/* Optimized image with Next.js Image component */}
                <Image 
                  src="/ghaliphoto.jpg" 
                  alt="Dr. Ghali" 
                  width={400} 
                  height={320}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-green-800">About Dr. Ghali</h2>
              <p className="text-lg mb-4 text-gray-700">
                Dr. Ghali Mustapha Tijjani Phanda is a dedicated community leader and philanthropist 
                committed to transforming lives and empowering communities.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Elected in 2023 to represent the Ajingi / Albasu / Gaya Federal Constituency in the House of Representatives, 
                Dr. Ghali has launched more than 25 programs that have directly impacted over 15,000 beneficiaries across 
                Gaya, Ajingi, and Albasu communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105">
                  Read My Full Biography
                </Link>
                <Link href="/projects" className="inline-block bg-white border-2 border-green-700 text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition duration-300 transform hover:scale-105">
                  View Achievements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <GhaliTimeline items={timelineData} />
    </div>
  )
}