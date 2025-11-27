'use client'

import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/navigation'

interface MediaItem {
  _id: string
  title: string
  description: string
  url: string
  type: string
  category: string
  tags: string[]
  createdAt?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function MediaManager() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('image')
  const [category, setCategory] = useState('Stickers')
  const [tags, setTags] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  // Fetch media items
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${API_URL}/api/media`)
        if (response.ok) {
          const data = await response.json()
          setMediaItems(data)
        } else {
          setError('Failed to fetch media items')
        }
      } catch (err) {
        setError('An error occurred while fetching media items')
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setUrl(data.filePath)
        setSuccess('File uploaded successfully!')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to upload file')
      }
    } catch (err) {
      setError('An error occurred during upload')
    } finally {
      setUploading(false)
    }
  }

  const handleCreateMedia = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          url,
          type,
          category,
          tags: tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      })

      if (response.ok) {
        const newMedia = await response.json()
        setMediaItems([newMedia, ...mediaItems])
        resetForm()
        setShowForm(false)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create media item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleUpdateMedia = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingMedia) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/media/${editingMedia._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          url,
          type,
          category,
          tags: tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      })

      if (response.ok) {
        const updatedMedia = await response.json()
        setMediaItems(mediaItems.map((m) => (m._id === updatedMedia._id ? updatedMedia : m)))
        resetForm()
        setEditingMedia(null)
        setShowForm(false)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update media item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMediaItems(mediaItems.filter((m) => m._id !== mediaId))
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to delete media item')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setUrl('')
    setType('image')
    setCategory('Stickers')
    setTags('')
  }

  const startEditing = (media: MediaItem) => {
    setEditingMedia(media)
    setTitle(media.title)
    setDescription(media.description)
    setUrl(media.url)
    setType(media.type)
    setCategory(media.category)
    setTags(media.tags ? media.tags.join(', ') : '')
    setShowForm(true)
  }

  const startCreating = () => {
    setEditingMedia(null)
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
        <h1 className="text-2xl font-bold">Media Library</h1>
        <button
          onClick={startCreating}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Media
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>}

      {success && <div className="bg-green-50 text-green-500 p-3 rounded">{success}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingMedia ? 'Edit Media Item' : 'Upload New Media'}
          </h2>

          <form
            onSubmit={editingMedia ? handleUpdateMedia : handleCreateMedia}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Media title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Media description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Stickers">Stickers</option>
                  <option value="Events">Events</option>
                  <option value="Projects">Projects</option>
                  <option value="Achievements">Achievements</option>
                  <option value="Press">Press</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Media URL"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingMedia(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editingMedia ? 'Update Media' : 'Upload Media'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    if (target.parentElement) {
                      target.parentElement.innerHTML =
                        '<span class="material-symbols-outlined text-4xl text-gray-400">image</span>'
                    }
                  }}
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-gray-400">
                  {item.type === 'video' ? 'play_circle' : 'description'}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(item)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(item._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {mediaItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">
              imagesmode
            </span>
            <p className="text-gray-500">No media items found. Upload your first media!</p>
          </div>
        )}
      </div>
    </div>
  )
}
