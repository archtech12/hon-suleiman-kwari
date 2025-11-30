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
      bg: 'bg-gradient-to-br from-[#052e16] via-[#022c22] to-black',
      accent: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      text: 'text-white',
      name: 'Classic Green',
      icon: '🌿',
    },
    modern: {
      bg: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-black',
      accent: 'bg-gradient-to-r from-yellow-300 to-orange-400',
      text: 'text-white',
      name: 'Modern Blue',
      icon: '🚀',
    },
    vibrant: {
      bg: 'bg-gradient-to-br from-pink-900 via-rose-900 to-black',
      accent: 'bg-gradient-to-r from-white to-yellow-100',
      text: 'text-white',
      name: 'Vibrant Pink',
      icon: '⚡',
    },
    elegant: {
      bg: 'bg-gradient-to-br from-gray-900 via-slate-900 to-black',
      accent: 'bg-gradient-to-r from-gold-400 to-yellow-500',
      text: 'text-white',
      name: 'Royal Elegant',
      icon: '👑',
    },
    bold: {
      bg: 'bg-gradient-to-br from-red-900 via-rose-900 to-black',
      accent: 'bg-gradient-to-r from-yellow-300 to-yellow-400',
      text: 'text-white',
      name: 'Bold Red',
      icon: '🔥',
    },
    neon: {
      bg: 'bg-gradient-to-br from-teal-900 via-emerald-900 to-black',
      accent: 'bg-gradient-to-r from-lime-300 to-green-400',
      text: 'text-white',
      name: 'Neon Green',
      icon: '💚',
    },
    royal: {
      bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-black',
      accent: 'bg-gradient-to-r from-gold-300 to-yellow-400',
      text: 'text-white',
      name: 'Royal Purple',
      icon: '✨',
    },
  }

  const sizes = {
    small: {width: '20rem', height: '20rem', scale: 1, name: 'Small (Profile)', icon: '👤'},
    medium: {width: '28rem', height: '28rem', scale: 1.25, name: 'Medium (Post)', icon: '📱'},
    large: {width: '36rem', height: '36rem', scale: 1.5, name: 'Large (HD)', icon: '🖼️'},
    story: {width: '24rem', height: '42rem', scale: 1.2, name: 'Story (9:16)', icon: '📲'},
    banner: {width: '42rem', height: '24rem', scale: 1.3, name: 'Banner (16:9)', icon: '🎯'},
    poster: {width: '36rem', height: '48rem', scale: 1.6, name: 'Poster (A4)', icon: '📄'},
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
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(templates) as Template[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                      template === t
                        ? 'border-green-500 bg-green-50 shadow-lg scale-105 ring-1 ring-green-500'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-full h-12 ${templates[t].bg} rounded-lg shadow-inner`}></div>
                    <p className="text-xs font-bold text-gray-700 capitalize">{t}</p>
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
                  className={`relative overflow-hidden flex flex-col ${currentTemplate.bg} ${
                    showEffects ? 'transform hover:scale-105 transition-transform duration-300' : ''
                  }`}
                  style={{
                    width: currentSize.width,
                    height: currentSize.height, // Ensure 1:1 aspect ratio
                    ...(showEffects && {
                      filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))',
                    }),
                  }}
                >
                  {/* BACKGROUND PARTICLES (CSS Radial Gradients) */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px), radial-gradient(#fbbf24 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 20px 20px'
                  }}></div>

                  {/* TOP CENTER LOGO */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-yellow-500/30 shadow-lg">
                       <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">shield</span>
                    </div>
                  </div>

                  {/* MAIN CONTENT AREA */}
                  <div className="flex-1 flex relative z-10">
                    
                    {/* LEFT SIDE: CANDIDATE HERO (60%) */}
                    <div className="w-[60%] h-full relative">
                      {/* Candidate Photo - Full Body/Face Focus */}
                      <div className="absolute inset-0 z-0">
                         <img
                          src="/ghaliphoto.jpg"
                          alt="Hon. Dr. Ghali"
                          className="w-full h-full object-cover"
                          style={{ 
                            objectPosition: 'center top', // Focus on head/shoulders
                            maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
                          }}
                        />
                        {/* Gold Glow Behind/Around */}
                        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(251,191,36,0.2)] pointer-events-none"></div>
                      </div>

                      {/* Candidate Text Overlay - Moved to Bottom to avoid face overlap */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20">
                        <h1 className="text-white font-black text-2xl leading-tight drop-shadow-xl uppercase font-sans tracking-tight">
                          Hon. Dr.<br/>
                          <span className="text-3xl text-yellow-400">Ghali Mustapha</span><br/>
                          Tijjani Phanda
                        </h1>
                        <div className="h-1 w-20 bg-yellow-500 mt-2 mb-2 rounded-full"></div>
                        <p className="text-yellow-200 font-bold text-[10px] uppercase tracking-wider drop-shadow-md">
                          NNPP • Gaya/Ajingi/Albasu<br/>Federal Constituency
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE: SUPPORTER & SLOGAN (40%) */}
                    <div className="w-[40%] h-full relative flex flex-col items-center justify-center pt-4">
                      
                      {/* Supporter Photo - Circular Gold Frame */}
                      <div className="relative mb-3">
                        {supporterPhoto ? (
                          <div className="relative">
                            <div className="w-36 h-36 rounded-full border-[3px] border-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.4)] overflow-hidden bg-gray-800">
                              <img 
                                src={supporterPhoto} 
                                alt="Supporter" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Verified Check */}
                            <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                              <span className="material-symbols-outlined text-sm font-bold">check</span>
                            </div>
                          </div>
                        ) : (
                           <div className="w-36 h-36 rounded-full border-[3px] border-dashed border-yellow-500/50 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
                              <span className="material-symbols-outlined text-yellow-500 text-4xl mb-1">add_a_photo</span>
                              <span className="text-yellow-200 text-[10px] uppercase font-bold">Upload Photo</span>
                           </div>
                        )}
                      </div>

                      {/* Supporter Name - Elegant Script */}
                      <div className="text-center px-2 mb-6">
                        <p className="text-white font-serif italic text-lg tracking-wide drop-shadow-md">
                          {supporterName || "Your Name"}
                        </p>
                        <p className="text-yellow-500/80 text-[10px] uppercase tracking-widest font-bold mt-1">Proud Supporter</p>
                      </div>

                      {/* Center Slogan with Stars */}
                      <div className="text-center px-1">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-yellow-400 text-[10px]">★</span>
                          <span className="text-yellow-400 text-[10px]">★</span>
                        </div>
                        {customMessage ? (
                          <h2 className="text-white font-black text-lg uppercase leading-tight drop-shadow-lg break-words">
                            {customMessage}
                          </h2>
                        ) : (
                          <h2 className="text-white font-black text-xl uppercase leading-none drop-shadow-lg">
                            Together<br/>
                            <span className="text-yellow-400 text-2xl">We Rise</span><br/>
                            2027
                          </h2>
                        )}
                         <div className="flex items-center justify-center gap-2 mt-1">
                          <span className="text-yellow-400 text-[10px]">★</span>
                          <span className="text-yellow-400 text-[10px]">★</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* BOTTOM BANNER - Solid Gradient */}
                  <div className="h-14 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 flex items-center justify-center shadow-[0_-5px_20px_rgba(0,0,0,0.3)] z-20 relative border-t-2 border-yellow-200">
                    <div className="flex items-center gap-2 px-4">
                      <span className="text-black font-black text-xl tracking-widest uppercase text-center whitespace-nowrap">
                        2027 • Together We Rise
                      </span>
                      <span className="text-2xl filter drop-shadow-sm">🚀</span>
                    </div>
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
