'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface NewsItem {
  _id: string
  title: string
  content: string
  category: string
  imageUrl?: string
  publishDate: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news`)
        if (response.ok) {
          const data = await response.json()
          setNews(data)
        }
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'Community Engagement': 'bg-green-100 text-green-800',
      'Political': 'bg-blue-100 text-blue-800',
      'Social Welfare': 'bg-purple-100 text-purple-800',
      'Infrastructure': 'bg-orange-100 text-orange-800',
      'Education': 'bg-pink-100 text-pink-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Latest News & Updates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Stay informed about the latest developments, initiatives, and community updates from
            Hon. Dr. Ghali Mustapha Tijjani Phanda's office.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">article</span>
              <p className="text-gray-600 dark:text-gray-400">No news articles available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <div
                  key={article._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden bg-gray-200 relative">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400">article</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <span className="material-symbols-outlined text-gold-400 mr-2">calendar_today</span>
                        {formatDate(article.publishDate)}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                    <div
                      className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{__html: article.content}}
                    />
                    <Link
                      href={`/news/${article._id}`}
                      className="text-green-700 dark:text-gold-400 font-medium hover:text-green-800 dark:hover:text-gold-300 transition-colors flex items-center"
                    >
                      Read More <span className="material-symbols-outlined ml-1">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* YouTube Videos Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Featured Videos
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Watch highlights and coverage of Dr. Ghali's work and political journey
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                      <span className="material-symbols-outlined text-white text-3xl">
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg line-clamp-2">
                      NNPP Reps member from Kano Ghali Mustapha should be commend not castigated, he
                      is a bravo
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="material-symbols-outlined text-red-500 mr-2">
                      smart_display
                    </span>
                    <span>Sep 22, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    NNPP Reps member from Kano Ghali Mustapha should be commend not castigated, he
                    is a bravo
                  </h3>
                  <Link
                    href="https://youtu.be/ylpWeBsQkbA?si=YiZFyO2DiXOhReES"
                    target="_blank"
                    className="inline-flex items-center text-red-600 dark:text-red-400 font-medium hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  >
                    Watch on YouTube
                    <span className="material-symbols-outlined ml-1">open_in_new</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                      <span className="material-symbols-outlined text-white text-3xl">
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg line-clamp-2">
                      Brief look at Ghali Mustapha Tijjani, member of New Nigeria Peoples Party
                      (NNPP)
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="material-symbols-outlined text-red-500 mr-2">
                      smart_display
                    </span>
                    <span>Sep 22, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    Brief look at Ghali Mustapha Tijjani, member of New Nigeria Peoples Party (NNPP)
                  </h3>
                  <Link
                    href="https://youtu.be/Ze8oumMdqDc?si=aL971vR421ak0bni"
                    target="_blank"
                    className="inline-flex items-center text-red-600 dark:text-red-400 font-medium hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  >
                    Watch on YouTube
                    <span className="material-symbols-outlined ml-1">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Link href="#" className="px-3 py-2 rounded-md bg-green-700 text-white">
                1
              </Link>
              <Link
                href="#"
                className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                2
              </Link>
              <Link
                href="#"
                className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                3
              </Link>
              <Link
                href="#"
                className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
