'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NewsDetailPage() {
  const [newsItem, setNewsItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!params.id) return
      
      try {
        const response = await fetch(`http://localhost:5000/api/news/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setNewsItem(data)
        } else {
          setError('Failed to fetch news item')
        }
      } catch (err) {
        setError('An error occurred while fetching news item')
      } finally {
        setLoading(false)
      }
    }

    fetchNewsItem()
  }, [params.id])

  if (loading) {
    return (
      <div className="w-full">
        <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">News Details</h1>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div className="w-full">
        <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">News Details</h1>
          </div>
        </section>
        
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 text-red-500 p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-2">Error Loading News</h3>
              <p>{error || 'News item not found'}</p>
              <Link 
                href="/news" 
                className="inline-flex items-center mt-4 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
              >
                Back to News
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">News Details</h1>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {newsItem.imageUrl && (
              <div className="h-64 md:h-96 overflow-hidden">
                <img 
                  src={newsItem.imageUrl} 
                  alt={newsItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="material-symbols-outlined text-gold-400 mr-2">calendar_today</span>
                  <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                </div>
                
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {newsItem.category}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {newsItem.title}
              </h1>
              
              <div className="prose max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>{newsItem.content}</p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
                      {newsItem.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{newsItem.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/news" 
                    className="inline-flex items-center px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
                  >
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Back to News
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}