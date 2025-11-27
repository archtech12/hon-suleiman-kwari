'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Volunteer {
  _id: string
  fullName: string
  email: string
  phone: string
  volunteerType: string
  address: {
    constituency: string
    city: string
  }
  status: string
  registrationDate: string
  availability: string
}

interface Stats {
  total: number
  pending: number
  approved: number
  active: number
  byType: Array<{_id: string; count: number}>
  byConstituency: Array<{_id: string; count: number}>
  recentRegistrations: number
}

export default function AdminVolunteersPage() {
  const router = useRouter()
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: '',
    volunteerType: '',
    constituency: '',
    search: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchVolunteers()
    fetchStats()
  }, [filter])

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const queryParams = new URLSearchParams(filter as any).toString()

      const response = await fetch(`${API_URL}/api/volunteers/admin?${queryParams}`, {
        headers: {Authorization: `Bearer ${token}`},
      })

      if (response.ok) {
        const data = await response.json()
        setVolunteers(data.volunteers)
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/volunteers/stats`, {
        headers: {Authorization: `Bearer ${token}`},
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/volunteers/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({status: newStatus}),
      })

      if (response.ok) {
        fetchVolunteers()
        fetchStats()
        alert('Status updated successfully!')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const exportCSV = () => {
    const token = localStorage.getItem('adminToken')
    window.open(`${API_URL}/api/volunteers/export/csv?token=${token}`, '_blank')
  }

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Active: 'bg-blue-100 text-blue-800',
    Inactive: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Management</h1>
          <p className="text-gray-600">Manage and track all campaign volunteers</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-blue-100 text-sm mb-1">Total Volunteers</p>
              <p className="text-4xl font-black">{stats.total}</p>
              <p className="text-blue-100 text-xs mt-2">+{stats.recentRegistrations} this week</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-yellow-100 text-sm mb-1">Pending Review</p>
              <p className="text-4xl font-black">{stats.pending}</p>
              <p className="text-yellow-100 text-xs mt-2">Awaiting approval</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-green-100 text-sm mb-1">Approved</p>
              <p className="text-4xl font-black">{stats.approved}</p>
              <p className="text-green-100 text-xs mt-2">Ready to engage</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-purple-100 text-sm mb-1">Active</p>
              <p className="text-4xl font-black">{stats.active}</p>
              <p className="text-purple-100 text-xs mt-2">Currently engaged</p>
            </div>
          </div>
        )}

        {/* Charts */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">By Volunteer Type</h3>
              <div className="space-y-3">
                {stats.byType.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item._id}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{width: `${(item.count / stats.total) * 100}%`}}
                        />
                      </div>
                      <span className="font-bold text-sm">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">By Constituency</h3>
              <div className="space-y-3">
                {stats.byConstituency.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item._id}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{width: `${(item.count / stats.total) * 100}%`}}
                        />
                      </div>
                      <span className="font-bold text-sm">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters & Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={filter.volunteerType}
              onChange={(e) => setFilter({...filter, volunteerType: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Types</option>
              <option value="Social Media Volunteer">Social Media</option>
              <option value="Field Mobilizer">Field Mobilizer</option>
              <option value="Community Organizer">Community Organizer</option>
              <option value="General Supporter">General Supporter</option>
            </select>

            <select
              value={filter.constituency}
              onChange={(e) => setFilter({...filter, constituency: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Constituencies</option>
              <option value="Gaya">Gaya</option>
              <option value="Ajingi">Ajingi</option>
              <option value="Albasu">Albasu</option>
            </select>

            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📊 Export CSV
            </button>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Registered
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Loading volunteers...
                    </td>
                  </tr>
                ) : volunteers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No volunteers found
                    </td>
                  </tr>
                ) : (
                  volunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{volunteer.fullName}</p>
                        <p className="text-sm text-gray-500">{volunteer.availability}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{volunteer.email}</p>
                        <p className="text-sm text-gray-500">{volunteer.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {volunteer.volunteerType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{volunteer.address.constituency}</p>
                        <p className="text-xs text-gray-500">{volunteer.address.city}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[volunteer.status]}`}
                        >
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(volunteer.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={volunteer.status}
                          onChange={(e) => updateStatus(volunteer._id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
