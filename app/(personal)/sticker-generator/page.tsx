'use client'

import {useState, useRef, useEffect, useCallback} from 'react'
import html2canvas from 'html2canvas'
import Cropper from 'react-easy-crop'
import type {Area} from 'react-easy-crop'

type Template = 'classic' | 'modern' | 'vibrant' | 'elegant' | 'bold' | 'neon' | 'royal'
type Size = 'small' | 'medium' | 'large' | 'story' | 'banner' | 'poster'
type Language = 'en' | 'ha' | 'ar'

interface StickerStats {
  totalGenerated: number
  lastGenerated: string | null
}

export default function StickerGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [supporterName, setSupporterName] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [supporterPhoto, setSupporterPhoto] = useState<string | null>(null)
  const [template, setTemplate] = useState<Template>('classic')
  const [size, setSize] = useState<Size>('medium')
  const [language, setLanguage] = useState<Language>('en')
  const [showEffects, setShowEffects] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [watermark, setWatermark] = useState(true)
  const [campaignHashtag, setCampaignHashtag] = useState('#TeamGhali2027')
  const [stats, setStats] = useState<StickerStats>({totalGenerated: 0, lastGenerated: null})
  const [showBatchMode, setShowBatchMode] = useState(false)
  const [batchCount, setBatchCount] = useState(1)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const stickerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const templates = {
    classic: {
      bg: 'bg-gradient-to-br from-green-700 via-green-800 to-green-900',
      accent: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      text: 'text-white',
      name: 'Classic Green',
      icon: '🌿',
    },
    modern: {
      bg: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700',
      accent: 'bg-gradient-to-r from-yellow-300 to-orange-400',
      text: 'text-white',
      name: 'Modern Blue',
      icon: '🚀',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500',
      accent: 'bg-gradient-to-r from-white to-yellow-100',
      text: 'text-white',
      name: 'Vibrant Energy',
      icon: '⚡',
    },
    elegant: {
      bg: 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900',
      accent: 'bg-gradient-to-r from-gold-400 to-yellow-500',
      text: 'text-white',
      name: 'Royal Elegant',
      icon: '👑',
    },
    bold: {
      bg: 'bg-gradient-to-br from-red-600 via-rose-700 to-red-800',
      accent: 'bg-gradient-to-r from-yellow-300 to-yellow-400',
      text: 'text-white',
      name: 'Bold Red',
      icon: '🔥',
    },
    neon: {
      bg: 'bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600',
      accent: 'bg-gradient-to-r from-lime-300 to-green-400',
      text: 'text-white',
      name: 'Neon Glow',
      icon: '💚',
    },
    royal: {
      bg: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900',
      accent: 'bg-gradient-to-r from-gold-300 to-yellow-400',
      text: 'text-white',
      name: 'Royal Purple',
      icon: '✨',
    },
  }

  const sizes = {
    small: {width: '16rem', height: '16rem', scale: 1, name: 'Small (Profile)', icon: '👤'},
    medium: {width: '20rem', height: '20rem', scale: 1.25, name: 'Medium (Post)', icon: '📱'},
    large: {width: '24rem', height: '24rem', scale: 1.5, name: 'Large (HD)', icon: '🖼️'},
    story: {width: '18rem', height: '32rem', scale: 1.2, name: 'Story (9:16)', icon: '📲'},
    banner: {width: '32rem', height: '18rem', scale: 1.3, name: 'Banner (16:9)', icon: '🎯'},
    poster: {width: '28rem', height: '40rem', scale: 1.6, name: 'Poster (A4)', icon: '📄'},
  }

  const messages = {
    en: [
      'Together We Rise 2027! 🚀',
      'Vote for Progress & Development',
      'Building a Better Tomorrow',
      'Leadership That Delivers',
      'Empowering Our Community',
      'Your Voice, Our Future',
    ],
    ha: [
      'Tare Mun Tashi 2027! 🚀',
      'Zaɓi Ci Gaba',
      'Gina Gobe Mai Kyau',
      'Jagoranci Mai Aiki',
      "Ƙarfafa Al'ummarmu",
      'Muryarku, Makomarmu',
    ],
    ar: [
      'معاً نرتقي 2027! 🚀',
      'صوت للتقدم والتنمية',
      'بناء غد أفضل',
      'قيادة تحقق الإنجاز',
      'تمكين مجتمعنا',
      'صوتك، مستقبلنا',
    ],
  }

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('stickerStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const generateSticker = async (shareToSocial = false) => {
    if (stickerRef.current) {
      setIsGenerating(true)
      try {
        const canvas = await html2canvas(stickerRef.current, {
          scale: 3, // High quality
          backgroundColor: null,
          logging: false,
        })
        const image = canvas.toDataURL('image/png')

        // Update stats
        const newStats = {
          totalGenerated: stats.totalGenerated + 1,
          lastGenerated: new Date().toLocaleString(),
        }
        setStats(newStats)
        localStorage.setItem('stickerStats', JSON.stringify(newStats))

        if (shareToSocial) {
          // Share API for mobile
          if (navigator.share) {
            const blob = await (await fetch(image)).blob()
            const file = new File([blob], 'ghali-supporter-sticker.png', {type: 'image/png'})
            await navigator.share({
              title: 'I Support Hon. Dr. Ghali!',
              text: `Proud supporter of Hon. Dr. Ghali Mustapha Tijjani Phanda - ${customMessage || 'Together We Rise 2027!'} ${campaignHashtag}`,
              files: [file],
            })
          } else {
            // Fallback to download
            const link = document.createElement('a')
            link.href = image
            link.download = `ghali-supporter-${template}-${Date.now()}.png`
            link.click()
          }
        } else {
          // Regular download
          const link = document.createElement('a')
          link.href = image
          link.download = `ghali-${supporterName.replace(/\s+/g, '-')}-${template}-${Date.now()}.png`
          link.click()
        }

        // Show success message
        alert(
          `✅ Sticker #${newStats.totalGenerated} generated successfully!\n\nShare it with ${campaignHashtag} on social media! 🚀`,
        )
      } catch (error) {
        console.error('Error generating sticker:', error)
        alert('❌ Error generating sticker. Please try again.')
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
        setShowCropper(true) // Show cropper when photo is uploaded
      }
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropDone = () => {
    setShowCropper(false)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const currentTemplate = templates[template]
  const currentSize = sizes[size]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-full shadow-lg mb-4">
            <span className="text-white font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined">stars</span>
              PREMIUM STICKER GENERATOR
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Support Sticker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Design professional campaign stickers in seconds! Customize, download, and share your
            support for Hon. Dr. Ghali
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">person</span>
                Your Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={supporterName}
                    onChange={(e) => setSupporterName(e.target.value)}
                    placeholder="e.g., Ahmed Ibrahim"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g., Vote for Progress!"
                    maxLength={40}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">{customMessage.length}/40 characters</p>

                  {/* Quick Message Suggestions */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">
                      💡 Quick Suggestions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {messages[language].slice(0, 3).map((msg, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCustomMessage(msg)}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors font-medium"
                        >
                          {msg.substring(0, 20)}
                          {msg.length > 20 ? '...' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Language Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🌍 Message Language
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        language === 'en'
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('ha')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        language === 'ha'
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Hausa
                    </button>
                    <button
                      onClick={() => setLanguage('ar')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        language === 'ar'
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Arabic
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    onClick={triggerFileInput}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-gray-700"
                  >
                    <span className="material-symbols-outlined">upload</span>
                    {supporterPhoto ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {supporterPhoto && (
                    <div className="mt-3">
                      <div className="flex justify-center mb-2">
                        <img
                          src={supporterPhoto}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-lg"
                        />
                      </div>
                      <button
                        onClick={() => setShowCropper(true)}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">crop</span>
                        Adjust Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">palette</span>
                Choose Template
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(templates) as Template[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      template === t
                        ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`h-16 ${templates[t].bg} rounded-lg mb-2 shadow-inner`}></div>
                    <p className="text-sm font-semibold text-gray-700 capitalize">{t}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">
                  photo_size_select_large
                </span>
                Sticker Size
              </h2>
              <div className="space-y-2">
                {(Object.keys(sizes) as Size[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                      size === s
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                      <span>{sizes[s].icon}</span>
                      <span className="text-sm">{sizes[s].name}</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {s === 'banner' ? '16:9' : s === 'story' || s === 'poster' ? '9:16' : '1:1'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker Stats */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">emoji_events</span>
                Your Impact
              </h2>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-green-100">Stickers Created</p>
                  <p className="text-3xl font-black">{stats.totalGenerated}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-green-100">Campaign Hashtag</p>
                  <p className="text-lg font-bold">{campaignHashtag}</p>
                </div>
                {stats.lastGenerated && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-green-100">Last Generated</p>
                    <p className="text-sm font-semibold">{stats.lastGenerated}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 p-3 bg-yellow-400/20 border border-yellow-300/30 rounded-xl">
                <p className="text-xs font-medium text-yellow-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  Share your sticker with {campaignHashtag} on social media!
                </p>
              </div>
            </div>
          </div>

          {/* Sticker Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600">preview</span>
                  Live Preview
                </h2>
                <button
                  onClick={() => setShowEffects(!showEffects)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                  {showEffects ? 'Hide' : 'Show'} Effects
                </button>
              </div>

              <div className="flex justify-center items-center min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
                <div
                  ref={stickerRef}
                  className={`${currentTemplate.bg} rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden ${
                    showEffects ? 'transform hover:scale-105 transition-transform duration-300' : ''
                  }`}
                  style={{
                    width: currentSize.width,
                    height: currentSize.height,
                    ...(showEffects && {
                      filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))',
                    }),
                  }}
                >
                  {/* Animated Background Effects */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-8 left-8 w-24 h-24 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 w-24 h-24 bg-white rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full animate-ping"></div>
                  </div>

                  {/* Logo Badge */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 z-10 shadow-xl animate-bounce">
                    <svg
                      className="w-10 h-10 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                    </svg>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-32 h-32 mb-4 z-10">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <img
                        src="/ghaliphoto.jpg"
                        alt="Hon. Dr. Ghali"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {supporterPhoto && (
                      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl animate-pulse">
                        <img
                          src={supporterPhoto}
                          alt="Supporter"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="text-center z-10 space-y-2">
                    <h3 className={`${currentTemplate.text} font-black text-xl`}>Hon. Dr. Ghali</h3>
                    <p className="text-yellow-300 text-sm font-bold">NNPP • Gaya/Ajingi/Albasu</p>
                    {supporterName && (
                      <div
                        className={`${currentTemplate.text} text-sm mt-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full`}
                      >
                        <p className="font-semibold">👥 {supporterName}</p>
                      </div>
                    )}
                    {customMessage && (
                      <div
                        className={`${currentTemplate.text} text-sm italic mt-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full`}
                      >
                        <p>"✨ {customMessage} ✨"</p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Banner */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 ${currentTemplate.accent} py-3 shadow-lg`}
                  >
                    <p className="text-gray-900 text-sm font-black text-center tracking-wide">
                      2027 • TOGETHER WE RISE 🚀
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => generateSticker(false)}
                  disabled={isGenerating || !supporterName}
                  className={`py-4 px-6 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    isGenerating || !supporterName
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  <span className="material-symbols-outlined">download</span>
                  {isGenerating ? 'Generating HD...' : 'Download HD Sticker'}
                </button>

                <button
                  onClick={() => generateSticker(true)}
                  disabled={isGenerating || !supporterName}
                  className={`py-4 px-6 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    isGenerating || !supporterName
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  <span className="material-symbols-outlined">share</span>
                  Share to Social Media
                </button>
              </div>

              {!supporterName && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <span className="material-symbols-outlined">info</span>
                    <strong>Tip:</strong> Enter your name to enable download and sharing!
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-green-600 text-2xl">hd</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">HD Quality</h3>
                <p className="text-sm text-gray-600">
                  3x resolution for crystal clear prints and social media
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">bolt</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Generation</h3>
                <p className="text-sm text-gray-600">
                  Create and download in seconds with live preview
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-purple-600 text-2xl">
                    palette
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">7 Templates</h3>
                <p className="text-sm text-gray-600">
                  Multiple designs to match your style and mood
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Cropper Modal */}
      {showCropper && supporterPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">crop</span>
                Adjust Your Photo
              </h2>
              <p className="text-sm text-gray-600 mt-1">Zoom and position your photo perfectly</p>
            </div>

            <div className="relative h-96 bg-gray-100">
              <Cropper
                image={supporterPhoto}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="p-6 bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCropper(false)}
                  className="flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropDone}
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">check</span>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
