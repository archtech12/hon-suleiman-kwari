'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import RichTextEditor from '../../../components/RichTextEditor'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function LegislativeEditor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [bills, setBills] = useState([{name: '', description: '', status: 'Proposed'}])
  const [achievements, setAchievements] = useState([{title: '', description: '', date: ''}])
  const [imageUrl, setImageUrl] = useState('')
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

  // Fetch existing legislative content
  useEffect(() => {
    const fetchLegislativeContent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/legislative`)
        if (response.ok) {
          const data = await response.json()
          setTitle(data.title || '')
          setContent(data.content || '')
          setBills(
            data.bills && data.bills.length > 0
              ? data.bills
              : [{name: '', description: '', status: 'Proposed'}],
          )
          setAchievements(
            data.achievements && data.achievements.length > 0
              ? data.achievements
              : [{title: '', description: '', date: ''}],
          )
          setImageUrl(data.imageUrl || '')
        }
      } catch (err) {
        console.error('Failed to fetch legislative content:', err)
      }
    }

    fetchLegislativeContent()
  }, [])

  const handleBillChange = (index, field, value) => {
    const updatedBills = [...bills]
    updatedBills[index][field] = value
    setBills(updatedBills)
  }

  const addBill = () => {
    setBills([...bills, {name: '', description: '', status: 'Proposed'}])
  }

  const removeBill = (index) => {
    if (bills.length > 1) {
      const updatedBills = bills.filter((_, i) => i !== index)
      setBills(updatedBills)
    }
  }

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...achievements]
    updatedAchievements[index][field] = value
    setAchievements(updatedAchievements)
  }

  const addAchievement = () => {
    setAchievements([...achievements, {title: '', description: '', date: ''}])
  }

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      const updatedAchievements = achievements.filter((_, i) => i !== index)
      setAchievements(updatedAchievements)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/legislative`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          bills,
          achievements,
          imageUrl,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update legislative content')
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
        <h1 className="text-2xl font-bold">Legislative Work Editor</h1>
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
          Legislative content updated successfully!
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Bills & Legislation</h2>
          <button onClick={addBill} className="text-green-600 hover:text-green-800">
            + Add Bill
          </button>
        </div>

        <div className="space-y-4">
          {bills.map((bill, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Name</label>
                  <input
                    type="text"
                    value={bill.name}
                    onChange={(e) => handleBillChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter bill name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={bill.status}
                    onChange={(e) => handleBillChange(index, 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Proposed">Proposed</option>
                    <option value="In Committee">In Committee</option>
                    <option value="Passed">Passed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={bill.description}
                    onChange={(e) => handleBillChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter bill description"
                  />
                </div>
              </div>

              {bills.length > 1 && (
                <div className="mt-3">
                  <button
                    onClick={() => removeBill(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Bill
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Key Achievements</h2>
          <button onClick={addAchievement} className="text-green-600 hover:text-green-800">
            + Add Achievement
          </button>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievement Title
                  </label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter achievement title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={achievement.date}
                    onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter date"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter achievement description"
                  />
                </div>
              </div>

              {achievements.length > 1 && (
                <div className="mt-3">
                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Achievement
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
