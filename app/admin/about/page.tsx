'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import RichTextEditor from '../../../components/RichTextEditor'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function AboutEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [quickFacts, setQuickFacts] = useState([
    {icon: 'badge', label: 'Position', value: ''},
    {icon: 'location_on', label: 'Constituency', value: ''},
    {icon: 'calendar_today', label: 'Years of Service', value: ''},
    {icon: 'groups', label: 'Party', value: ''},
    {icon: 'cake', label: 'Born', value: ''},
    {icon: 'school', label: 'Education', value: ''},
  ])
  const [visionItems, setVisionItems] = useState([
    {icon: 'school', title: 'Youth Empowerment', description: ''},
    {icon: 'local_hospital', title: 'Community Health', description: ''},
    {icon: 'home', title: 'Infrastructure', description: ''},
  ])
  const [coreValues, setCoreValues] = useState([
    'Integrity in all actions and decisions',
    'Transparency in governance and operations',
    'Accountability to constituents and stakeholders',
    'Equity in resource distribution and opportunity creation',
    'Sustainability in development initiatives',
    'Community empowerment through participatory leadership',
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  // Fetch existing about content
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/about`)
        if (response.ok) {
          const data = await response.json()
          setTitle(data.title || '')
          setContent(data.content || '')
          setImageUrl(data.imageUrl || '')
          if (data.quickFacts && data.quickFacts.length > 0) {
            setQuickFacts(data.quickFacts)
          }
          if (data.visionItems && data.visionItems.length > 0) {
            setVisionItems(data.visionItems)
          }
          if (data.coreValues && data.coreValues.length > 0) {
            setCoreValues(data.coreValues)
          }
        }
      } catch (err) {
        console.error('Failed to fetch about content:', err)
      }
    }

    fetchAboutContent()
  }, [])

  const handleQuickFactChange = (index, field, value) => {
    const updatedFacts = [...quickFacts]
    updatedFacts[index][field] = value
    setQuickFacts(updatedFacts)
  }

  const handleVisionItemChange = (index, field, value) => {
    const updatedItems = [...visionItems]
    updatedItems[index][field] = value
    setVisionItems(updatedItems)
  }

  const handleCoreValueChange = (index, value) => {
    const updatedValues = [...coreValues]
    updatedValues[index] = value
    setCoreValues(updatedValues)
  }

  const addCoreValue = () => {
    setCoreValues([...coreValues, ''])
  }

  const removeCoreValue = (index) => {
    if (coreValues.length > 1) {
      const updatedValues = coreValues.filter((_, i) => i !== index)
      setCoreValues(updatedValues)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/about`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          quickFacts,
          visionItems,
          coreValues,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update about content')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">About Page Editor</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>}

      {success && (
        <div className="bg-green-50 text-green-500 p-3 rounded">
          About content updated successfully!
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Main Content</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter page title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Content</label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Enter main content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter image URL"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Facts</h2>

        <div className="space-y-4">
          {quickFacts.map((fact, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  value={fact.icon}
                  onChange={(e) => handleQuickFactChange(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Icon name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={fact.label}
                  onChange={(e) => handleQuickFactChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={fact.value}
                  onChange={(e) => handleQuickFactChange(index, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Value"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Vision Items</h2>

        <div className="space-y-4">
          {visionItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => handleVisionItemChange(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Icon name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleVisionItemChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleVisionItemChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Description"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Core Values</h2>
          <button onClick={addCoreValue} className="text-green-600 hover:text-green-800">
            + Add Value
          </button>
        </div>

        <div className="space-y-2">
          {coreValues.map((value, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => handleCoreValueChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter core value"
              />
              {coreValues.length > 1 && (
                <button
                  onClick={() => removeCoreValue(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
