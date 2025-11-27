'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Stats {
  projects: number
  news: number
  media: number
  contacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({projects: 0, news: 0, media: 0, contacts: 0})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Fetch real stats from API
    const fetchStats = async () => {
      try {
        const [projectsRes, newsRes, mediaRes] = await Promise.all([
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/news`),
          fetch(`${API_URL}/api/media`),
        ])

        const [projects, news, media] = await Promise.all([
          projectsRes.json(),
          newsRes.json(),
          mediaRes.json(),
        ])

        setStats({
          projects: projects.length || 0,
          news: news.length || 0,
          media: media.length || 0,
          contacts: 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [router])

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: '📁',
      color: 'bg-blue-500',
      link: '/admin/projects',
      description: 'Active community projects',
    },
    {
      title: 'Published News',
      value: stats.news,
      icon: '📰',
      color: 'bg-green-500',
      link: '/admin/news',
      description: 'News articles published',
    },
    {
      title: 'Media Items',
      value: stats.media,
      icon: '🎨',
      color: 'bg-purple-500',
      link: '/admin/media',
      description: 'Photos and videos',
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: '✉️',
      color: 'bg-orange-500',
      link: '/admin/contact',
      description: 'Messages from constituents',
    },
  ]

  const quickLinks = [
    {title: 'Manage News', icon: '📰', href: '/admin/news', color: 'text-green-600 bg-green-50'},
    {
      title: 'Manage Projects',
      icon: '📁',
      href: '/admin/projects',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Edit About Page',
      icon: '👤',
      href: '/admin/about',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Media Gallery',
      icon: '🎨',
      href: '/admin/media',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Legislative Work',
      icon: '⚖️',
      href: '/admin/legislative',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Constituency Info',
      icon: '🏛️',
      href: '/admin/constituency',
      color: 'text-teal-600 bg-teal-50',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Admin! 👋</h1>
        <p className="text-green-100">Manage your website content and monitor performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform`}
                >
                  {card.icon}
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-green-600 transition-colors">
                  arrow_forward
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <span className="material-symbols-outlined text-gray-400">bolt</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`${link.color} p-4 rounded-lg text-center hover:shadow-md transition-all duration-200 transform hover:scale-105`}
            >
              <div className="text-3xl mb-2">{link.icon}</div>
              <p className="text-sm font-medium">{link.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <span className="material-symbols-outlined text-gray-400">history</span>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 pb-4 border-b">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Website Published</p>
                <p className="text-sm text-gray-500">All systems operational</p>
                <p className="text-xs text-gray-400 mt-1">Just now</p>
              </div>
            </li>
            <li className="flex items-start space-x-3 pb-4 border-b">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Database Connected</p>
                <p className="text-sm text-gray-500">MongoDB Atlas active</p>
                <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Admin Logged In</p>
                <p className="text-sm text-gray-500">Secure session started</p>
                <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
              </div>
            </li>
          </ul>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">System Status</h2>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900">Website Status</span>
              </div>
              <span className="text-sm text-green-600 font-semibold">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900">Database</span>
              </div>
              <span className="text-sm text-blue-600 font-semibold">Connected</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900">API Status</span>
              </div>
              <span className="text-sm text-purple-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-gray-600">schedule</span>
                <span className="font-medium text-gray-900">Last Updated</span>
              </div>
              <span className="text-sm text-gray-600 font-semibold">Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <span className="material-symbols-outlined text-blue-600 text-3xl">lightbulb</span>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Pro Tip</h3>
            <p className="text-gray-700 text-sm">
              Keep your content fresh! Regular updates to news and projects help engage your
              constituents and improve SEO rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
