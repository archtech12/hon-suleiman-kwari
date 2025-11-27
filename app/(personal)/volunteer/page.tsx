'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const volunteerTypes = [
  {value: 'Social Media Volunteer', icon: '📱', desc: 'Manage social media, create content'},
  {value: 'Field Mobilizer', icon: '👥', desc: 'Door-to-door campaigns, community outreach'},
  {value: 'Community Organizer', icon: '🤝', desc: 'Organize local events and meetings'},
  {value: 'Youth Leader', icon: '🎓', desc: 'Lead youth engagement programs'},
  {value: 'Women Leader', icon: '👩', desc: 'Women empowerment initiatives'},
  {value: 'Campaign Coordinator', icon: '📊', desc: 'Coordinate campaign activities'},
  {value: 'Event Volunteer', icon: '🎉', desc: 'Help organize campaign events'},
  {value: 'General Supporter', icon: '⭐', desc: 'Support in any capacity'},
]

const constituencies = ['Gaya', 'Ajingi', 'Albasu', 'Other']
const availabilities = ['Full Time', 'Part Time', 'Weekends Only', 'Flexible']
const educationLevels = [
  'Primary',
  'Secondary',
  'Diploma',
  'Undergraduate',
  'Graduate',
  'Postgraduate',
  'Other',
]

export default function VolunteerPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    address: {
      street: '',
      city: '',
      lga: '',
      state: 'Kano',
      constituency: 'Gaya',
    },
    volunteerType: 'General Supporter',
    skills: [] as string[],
    interests: [] as string[],
    availability: 'Flexible',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      whatsapp: '',
    },
    occupation: '',
    education: 'Secondary',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    referredBy: '',
    motivation: '',
    previousExperience: '',
    dataConsent: false,
    newsletterConsent: true,
  })

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({...prev, [field]: value}))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/volunteers/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert(
          '🎉 Registration Successful!\n\nThank you for joining Team Ghali! We will contact you soon with next steps.',
        )
        router.push('/')
      } else {
        alert('❌ ' + (data.message || 'Registration failed. Please try again.'))
      }
    } catch (error) {
      alert('❌ Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full shadow-lg mb-4">
            <span className="text-white font-bold flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              JOIN TEAM GHALI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Volunteer Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be part of the movement! Register to volunteer and help build a better future for Gaya,
            Ajingi, and Albasu
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step
                      ? 'bg-green-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-gray-600">
            <span>Personal</span>
            <span>Address</span>
            <span>Details</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">person</span>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., Musa Ibrahim"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="musa@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="08012345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Education Level
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => updateFormData('education', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => updateFormData('occupation', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., Teacher, Student, Trader"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">location_on</span>
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => updateFormData('address.street', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., 123 Main Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City/Town
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => updateFormData('address.city', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., Gaya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Local Government Area (LGA)
                  </label>
                  <input
                    type="text"
                    value={formData.address.lga}
                    onChange={(e) => updateFormData('address.lga', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., Gaya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => updateFormData('address.state', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Kano"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Constituency *
                  </label>
                  <select
                    required
                    value={formData.address.constituency}
                    onChange={(e) => updateFormData('address.constituency', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {constituencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-3">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => updateFormData('emergencyContact.name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => updateFormData('emergencyContact.phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Contact phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) =>
                        updateFormData('emergencyContact.relationship', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Father, Sister"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Volunteer Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">volunteer_activism</span>
                Volunteer Details
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  How would you like to volunteer? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volunteerTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => updateFormData('volunteerType', type.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.volunteerType === type.value
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{type.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900">{type.value}</p>
                          <p className="text-sm text-gray-600">{type.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availabilities.map((avail) => (
                    <button
                      key={avail}
                      type="button"
                      onClick={() => updateFormData('availability', avail)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.availability === avail
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to volunteer for Hon. Dr. Ghali? *
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) => updateFormData('motivation', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Tell us what motivates you to support Hon. Dr. Ghali..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Previous Volunteer/Political Experience
                </label>
                <textarea
                  value={formData.previousExperience}
                  onChange={(e) => updateFormData('previousExperience', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Share any relevant experience (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Who referred you? (Optional)
                </label>
                <input
                  type="text"
                  value={formData.referredBy}
                  onChange={(e) => updateFormData('referredBy', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Name of person who referred you"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <span>📱</span> Social Media Handles (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => updateFormData('socialMedia.facebook', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Facebook username"
                  />
                  <input
                    type="text"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => updateFormData('socialMedia.twitter', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Twitter/X username"
                  />
                  <input
                    type="text"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => updateFormData('socialMedia.instagram', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Instagram username"
                  />
                  <input
                    type="text"
                    value={formData.socialMedia.whatsapp}
                    onChange={(e) => updateFormData('socialMedia.whatsapp', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="WhatsApp number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                Review & Submit
              </h2>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-bold text-lg">{formData.fullName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{formData.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Volunteer Type</p>
                  <p className="font-bold text-green-700">{formData.volunteerType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Constituency</p>
                  <p className="font-semibold">{formData.address.constituency}</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.dataConsent}
                    onChange={(e) => updateFormData('dataConsent', e.target.checked)}
                    className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>I consent</strong> to the collection and use of my personal data for
                    campaign purposes. *
                  </span>
                </label>

                <label className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newsletterConsent}
                    onChange={(e) => updateFormData('newsletterConsent', e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I want to receive campaign updates, news, and newsletters via email.
                  </span>
                </label>
              </div>

              <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 text-center">
                <p className="text-lg font-bold text-green-900 mb-2">🎉 You're Almost There!</p>
                <p className="text-gray-700">
                  Click submit to complete your volunteer registration. We'll contact you within 48
                  hours.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.dataConsent}
                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  isSubmitting || !formData.dataConsent
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : '✓ Submit Registration'}
              </button>
            )}
          </div>
        </form>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎓</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Learn & Grow</h3>
            <p className="text-sm text-gray-600">Gain valuable campaign and leadership skills</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Network</h3>
            <p className="text-sm text-gray-600">Connect with like-minded community members</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⭐</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Make Impact</h3>
            <p className="text-sm text-gray-600">Help shape the future of your community</p>
          </div>
        </div>
      </div>
    </div>
  )
}
