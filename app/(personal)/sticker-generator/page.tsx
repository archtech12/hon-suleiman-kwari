'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

export default function StickerGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [supporterName, setSupporterName] = useState('')
  const [supporterPhoto, setSupporterPhoto] = useState<string | null>(null)
  const stickerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateSticker = async () => {
    if (stickerRef.current) {
      setIsGenerating(true)
      try {
        const canvas = await html2canvas(stickerRef.current)
        const image = canvas.toDataURL('image/png')
        
        // Create download link
        const link = document.createElement('a')
        link.href = image
        link.download = 'ghali-supporter-sticker.png'
        link.click()
      } catch (error) {
        console.error('Error generating sticker:', error)
      } finally {
        setIsGenerating(false)
      }
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSupporterPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Supporter Sticker Generator</h1>
          <p className="text-lg text-gray-600">
            Show your support for Hon. Dr. Ghali with a personalized sticker featuring both his photo and yours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sticker Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sticker Preview</h2>
            <div className="flex justify-center">
              <div 
                ref={stickerRef}
                className="w-64 h-64 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-gold-400 rounded-full"></div>
                </div>
                
                {/* Logo/Icon */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 z-10">
                  <svg className="w-8 h-8 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                  </svg>
                </div>
                
                {/* Photo Container - Dr. Ghali's photo always visible with supporter's photo as overlay */}
                <div className="relative w-24 h-24 mb-3 z-10">
                  {/* Dr. Ghali's Photo - Always present */}
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white">
                    <img src="/ghaliphoto.jpg" alt="Hon. Dr. Ghali" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Supporter's Photo - Overlay in smaller circle */}
                  {supporterPhoto && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400">
                      <img src={supporterPhoto} alt="Supporter" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                
                {/* Text */}
                <div className="text-center z-10">
                  <h3 className="text-white font-bold text-sm">Hon. Dr. Ghali</h3>
                  <p className="text-gold-400 text-xs font-semibold">NNPP - Gaya/Ajingi/Albasu</p>
                  {supporterName && (
                    <p className="text-white text-xs mt-1">Supporter: {supporterName}</p>
                  )}
                </div>
                
                {/* Banner */}
                <div className="absolute bottom-0 left-0 right-0 bg-gold-500 py-1">
                  <p className="text-green-900 text-xs font-bold text-center">2027 - Together We Rise</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateSticker}
                disabled={isGenerating}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                  isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-700 hover:bg-green-800'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Download Sticker'}
              </button>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customize Your Support</h2>
            
            <div className="space-y-6">
              {/* Supporter Name */}
              <div>
                <label htmlFor="supporterName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="supporterName"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Add your name to show your support
                </p>
              </div>
              
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Photo (Optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {supporterPhoto ? 'Change Your Photo' : 'Upload Your Photo'}
                </button>
                {supporterPhoto && (
                  <div className="mt-3 flex justify-center">
                    <img 
                      src={supporterPhoto} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Upload your photo to appear alongside Dr. Ghali's photo on the sticker
                </p>
              </div>
              
              {/* Sticker Information */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 mb-2">Sticker Design</h3>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Dr. Ghali's official photo is always featured prominently</li>
                  <li>• Your photo appears as a smaller overlay if uploaded</li>
                  <li>• Your name appears below Dr. Ghali's name</li>
                  <li>• Download and share on social media to show your support!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gallery Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sticker Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example 1 - Official Sticker */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full"></div>
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-gold-400 rounded-full"></div>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                  </svg>
                </div>
                <div className="relative w-20 h-20 mb-3">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white">
                    <img src="/ghaliphoto.jpg" alt="Hon. Dr. Ghali" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Hon. Dr. Ghali</p>
                  <p className="text-gold-400 text-xs font-semibold">NNPP - Gaya/Ajingi/Albasu</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gold-500 py-1">
                  <p className="text-green-900 text-xs font-bold text-center">2027 - Together We Rise</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">Official Sticker</p>
            </div>
            
            {/* Example 2 - With Supporter Photo */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full"></div>
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-gold-400 rounded-full"></div>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                  </svg>
                </div>
                <div className="relative w-20 h-20 mb-3">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white">
                    <img src="/ghaliphoto.jpg" alt="Hon. Dr. Ghali" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Hon. Dr. Ghali</p>
                  <p className="text-gold-400 text-xs font-semibold">NNPP - Gaya/Ajingi/Albasu</p>
                  <p className="text-white text-xs mt-1">Supporter: Your Name</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gold-500 py-1">
                  <p className="text-green-900 text-xs font-bold text-center">2027 - Together We Rise</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">With Supporter Photo</p>
            </div>
            
            {/* Example 3 - With Family Photo */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full"></div>
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-gold-400 rounded-full"></div>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-green-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                  </svg>
                </div>
                <div className="relative w-20 h-20 mb-3">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white">
                    <img src="/ghaliphoto.jpg" alt="Hon. Dr. Ghali" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-full h-full" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Hon. Dr. Ghali</p>
                  <p className="text-gold-400 text-xs font-semibold">NNPP - Gaya/Ajingi/Albasu</p>
                  <p className="text-white text-xs mt-1">Supporter: Family</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gold-500 py-1">
                  <p className="text-green-900 text-xs font-bold text-center">2027 - Together We Rise</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">Family Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}