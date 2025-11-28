'use client'

import {Header} from '@/components/Header'
import {GhaliTimeline, timelineData} from '@/components/GhaliTimeline'
import Link from 'next/link'
import Image from 'next/image'

interface HomePageProps {
  data: any
}

export function HomePage({data}: HomePageProps) {
  // Default to empty values if no data is provided
  const {title = 'Dr. Ghali Mustapha Tijjani Phanda'} = data || {}

  return (
    <div className="space-y-20">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Dr. Ghali Mustapha Tijjani Phanda
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-green-100">
                Community Leader & Philanthropist
              </h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-green-50 leading-relaxed">
                Official digital home showcasing leadership, philanthropy, and community
                transformation across Gaya, Ajingi, and Albasu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-green-800 hover:bg-green-50 active:bg-green-100 font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-base sm:text-base touch-manipulation active:scale-95 sm:hover:scale-105"
                >
                  <span>Connect With Me</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  href="/projects"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 active:bg-white/20 font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-base sm:text-base touch-manipulation active:scale-95 sm:hover:scale-105"
                >
                  <span>View My Work</span>
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl relative">
                  <Image
                    src="/ghaliphoto.jpg"
                    alt="Dr. Ghali Mustapha Tijjani Phanda"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gold-500 text-green-900 font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg transform rotate-3 text-xs sm:text-sm">
                  15,000+ Beneficiaries Helped
                </div>
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-white text-green-800 font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg transform -rotate-3 text-xs sm:text-sm">
                  1+ Years Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Dashboard */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-green-800">My Impact In Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measuring the real difference we've made in our communities through dedicated service
              and programs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">15,000+</div>
              <div className="text-gray-600">Beneficiaries Helped</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">25+</div>
              <div className="text-gray-600">Programs Launched</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">1+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
              <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 relative h-80">
                <Image
                  src="/ghaliphoto.jpg"
                  alt="Dr. Ghali"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
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
                Elected in 2023 to represent the Ajingi / Albasu / Gaya Federal Constituency in the
                House of Representatives, Dr. Ghali has launched more than 25 programs that have
                directly impacted over 15,000 beneficiaries across Gaya, Ajingi, and Albasu
                communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
                >
                  Read My Full Biography
                </Link>
                <Link
                  href="/projects"
                  className="inline-block bg-white border-2 border-green-700 text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition duration-300 transform hover:scale-105"
                >
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
