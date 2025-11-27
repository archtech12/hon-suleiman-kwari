'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import RichTextEditor from '../../../components/RichTextEditor'

// Define the NewsItem type
interface NewsItem {
  _id: string
  title: string
  excerpt: string
  content: string
  imageUrl?: string
  category: 'Announcement' | 'Event' | 'Achievement' | 'Press Release' | 'Other'
  author: string
  published: boolean
  createdAt: string
  updatedAt: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function NewsManager() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState<string>('Announcement')
  const [author, setAuthor] = useState('Hon. Dr. Ghali Mustapha Tijjani Phanda')
  const [published, setPublished] = useState(false)

  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  // Fetch news items
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('adminToken')

        // Check if token exists
        if (!token) {
          router.push('/admin/login')
          return
        }

        const response = await fetch(`${API_URL}/api/news/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setNewsItems(data)
        } else {
          // If unauthorized, redirect to login
          if (response.status === 401) {
            localStorage.removeItem('adminToken')
            router.push('/admin/login')
          } else {
            setError('Failed to fetch news items')
          }
        }
      } catch (err) {
        setError('An error occurred while fetching news items')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleCreateNews = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          imageUrl,
          category,
          author,
          published,
        }),
      })

      if (response.ok) {
        const newNews = await response.json()
        setNewsItems([newNews, ...newsItems])
        resetForm()
        setShowForm(false)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create news item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleUpdateNews = async (e) => {
    e.preventDefault()

    // Check if editingNews is not null
    if (!editingNews) {
      setError('No news item selected for update')
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/news/${editingNews._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          imageUrl,
          category,
          author,
          published,
        }),
      })

      if (response.ok) {
        const updatedNews = await response.json()
        setNewsItems(newsItems.map((n) => (n._id === updatedNews._id ? updatedNews : n)))
        resetForm()
        setEditingNews(null)
        setShowForm(false)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update news item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleDeleteNews = async (newsId) => {
    if (!confirm('Are you sure you want to delete this news item?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setNewsItems(newsItems.filter((n) => n._id !== newsId))
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to delete news item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const resetForm = () => {
    setTitle('')
    setExcerpt('')
    setContent('')
    setImageUrl('')
    setCategory('Announcement')
    setAuthor('Hon. Dr. Ghali Mustapha Tijjani Phanda')
    setPublished(false)
  }

  const startEditing = (news: NewsItem) => {
    setEditingNews(news)
    setTitle(news.title)
    setExcerpt(news.excerpt)
    setContent(news.content)
    setImageUrl(news.imageUrl || '')
    setCategory(news.category)
    setAuthor(news.author)
    setPublished(news.published)
    setShowForm(true)
  }

  const startCreating = () => {
    setEditingNews(null)
    resetForm()
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Management</h1>
        <button
          onClick={startCreating}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Article
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingNews ? 'Edit News Article' : 'Create New News Article'}
          </h2>

          <form onSubmit={editingNews ? handleUpdateNews : handleCreateNews} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="News title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Brief summary of the news"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Full news content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Event">Event</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Press Release">Press Release</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Image URL"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Published</label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingNews(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editingNews ? 'Update Article' : 'Create Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newsItems.map((news) => (
              <tr key={news._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{news.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{news.excerpt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {news.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {news.published ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{news.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => startEditing(news)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNews(news._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {newsItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found. Create your first article!</p>
          </div>
        )}
      </div>
    </div>
  )
}
