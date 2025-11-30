'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Project {
  _id: string
  title: string
  description: string
  category: string
  status: string
  year: string
  imageUrl?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`)
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'Education': 'bg-green-100 text-green-800',
      'Healthcare': 'bg-blue-100 text-blue-800',
      'Infrastructure': 'bg-purple-100 text-purple-800',
      'Agriculture': 'bg-yellow-100 text-yellow-800',
      'Youth Empowerment': 'bg-pink-100 text-pink-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: {[key: string]: string} = {
      Completed: 'bg-green-100 text-green-800',
      Ongoing: 'bg-blue-100 text-blue-800',
      Planned: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Our Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the various initiatives and projects led by Hon. Dr. Ghali Mustapha Tijjani Phanda
          to transform communities across Gaya, Ajingi, and Albasu.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">folder_open</span>
          <p className="text-gray-600">No projects available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-gray-400">work</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${getCategoryColor(project.category)}`}
                  >
                    {project.category}
                  </span>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{project.year}</span>
                  <Link
                    href="#"
                    className="text-green-700 font-medium hover:text-green-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
