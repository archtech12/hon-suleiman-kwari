'use client'

import {Header} from '@/components/Header'
import {KwariTimeline} from '@/components/KwariTimeline'
import {timelineData} from '@/components/KwariTimeline'
import Link from 'next/link'
import Image from 'next/image'
import {Footer} from '@/components/Footer'

interface HomePageProps {
  data: any
}

export function HomePage({data}: HomePageProps) {
  // Default to empty values if no data is provided
  const {title = 'Hon. Suleiman Abdu Kwari'} = data || {}

  return (
    <div className="space-y-20">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Hon. Suleiman Abdu Kwari
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-green-100">
                Former Senator, Kaduna North | Finance Expert | Champion of Development
              </h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-green-50 leading-relaxed">
                Celebrating a legacy of integrity and service. From Commissioner of Finance to Senator (2019–2023), dedicated to transforming Kaduna North through education, infrastructure, and fiscal responsibility.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="bg-white text-green-900 hover:bg-green-50 active:bg-green-100 font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-base sm:text-base touch-manipulation active:scale-95 sm:hover:scale-105"
                >
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 active:bg-white/20 font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-base sm:text-base touch-manipulation active:scale-95 sm:hover:scale-105"
                >
                  <span>Biography</span>
                  <span className="material-symbols-outlined text-xl">person</span>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl relative bg-green-800">
                  <Image
                    src="/suleiman-portrait.jpg"
                    alt="Hon. Suleiman Abdu Kwari"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-green-500 text-white font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg transform rotate-3 text-xs sm:text-sm border border-white">
                  50,000+ Residents Impacted
                </div>
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-white text-green-900 font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg transform -rotate-3 text-xs sm:text-sm">
                  4 Years Service
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
            <h2 className="text-3xl font-bold mb-4 text-green-900">Legacy In Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A track record of tangible achievements across Kaduna North Senatorial District.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <span className="material-symbols-outlined text-3xl text-green-700">groups</span>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">50k+</div>
              <div className="text-gray-600">Lives Touched</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <span className="material-symbols-outlined text-3xl text-green-700">construction</span>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">60+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <span className="material-symbols-outlined text-3xl text-green-700">calendar_month</span>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">4</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <span className="material-symbols-outlined text-3xl text-green-700">location_on</span>
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">8</div>
              <div className="text-gray-600">LGAs Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 relative h-80 w-full bg-gray-200">
                <Image
                  src="/suleiman-portrait.jpg"
                  alt="Hon. Suleiman Kwari"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="lg:w-2/3 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-6 text-green-900">About Hon. Suleiman Kwari</h2>
              <p className="text-lg mb-4 text-gray-700">
                Born on June 12, 1962, Hon. Suleiman Abdu Kwari is a visionary leader and finance expert who has dedicated his life to public service.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                He served as the Commissioner of Finance in Kaduna State, a Member of the House of Representatives (2011–2015), and most recently as the Senator representing Kaduna North Senatorial District (2019–2023). His tenure was marked by a relentless drive for infrastructural development, educational support, and anti-corruption initiatives.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
                >
                  Read Full Biography
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
      <KwariTimeline items={timelineData} />
      
      <Footer />
    </div>
  )
}
