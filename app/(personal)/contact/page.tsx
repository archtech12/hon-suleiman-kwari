'use client'

import {useState, useEffect} from 'react'

interface ContactInfo {
  phone: string;
  email: string;
  officeAddress: string;
  officeHours: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    // In a real application, this would fetch from the API
    // For now, we'll use hardcoded data
    setContactInfo({
      phone: "+234 800 123 4567",
      email: "contact@ghalipanda.gov.ng",
      officeAddress: "Government House Complex\nKano State, Nigeria",
      officeHours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM",
      socialMedia: {
        facebook: "https://facebook.com/ghalipanda",
        twitter: "https://twitter.com/ghalipanda",
        instagram: "https://instagram.com/ghalipanda"
      }
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">Get In Touch</h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">Have questions or want to connect? Reach out through the form below or use the contact details.</p>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-lg">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">phone</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">{contactInfo?.phone || '+234 800 123 4567'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">email</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">{contactInfo?.email || 'contact@ghalipanda.gov.ng'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Office</h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{contactInfo?.officeAddress || 'Government House Complex\nKano State, Nigeria'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{contactInfo?.officeHours || 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM'}</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-10">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Office Location</h3>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Map Placeholder</span>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-10">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a href={contactInfo?.socialMedia?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition-colors">
                    <span className="material-symbols-outlined">facebook</span>
                  </a>
                  <a href={contactInfo?.socialMedia?.twitter || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition-colors">
                    <span className="material-symbols-outlined">rss_feed</span>
                  </a>
                  <a href={contactInfo?.socialMedia?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition-colors">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </a>
                  <a href="#" className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}