'use client'

import {useState} from 'react'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  src: string
  title: string
  description: string
  date: string
}

interface MediaGalleryProps {
  items: MediaItem[]
}

export function MediaGallery({items}: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.type === filter)

  const openModal = (item: MediaItem) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-800">Media Gallery</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore photos and videos from community events, programs, and initiatives
        </p>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
            }`}
          >
            All Media
          </button>
          <button 
            onClick={() => setFilter('image')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'image' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
            }`}
          >
            Photos
          </button>
          <button 
            onClick={() => setFilter('video')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === 'video' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-green-100'
            }`}
          >
            Videos
          </button>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className="relative h-60">
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
                  {item.type === 'image' ? 'Photo' : 'Video'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Media Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-800">{selectedItem.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="h-96 mb-4">
                  {selectedItem.type === 'image' ? (
                    <img src={selectedItem.src} alt={selectedItem.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                <div className="text-sm text-gray-500">{selectedItem.date}</div>
              </div>
              <div className="p-4 border-t text-right">
                <button 
                  onClick={closeModal}
                  className="bg-green-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Updated media data with actual image paths
export const mediaData: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: '/480465286_605794928897267_5859580872040922079_n.jpg',
    title: 'Community Health Outreach',
    description: 'Providing free medical checkups to underserved communities in Gaya.',
    date: 'March 15, 2024'
  },
  {
    id: 2,
    type: 'video',
    src: '/videos/program-launch.mp4',
    title: 'Education Program Launch',
    description: 'Launching our new literacy program for children in rural areas.',
    date: 'February 28, 2024'
  },
  {
    id: 3,
    type: 'image',
    src: '/schorlaship.jpg',
    title: 'Scholarship Program',
    description: 'Honoring beneficiaries of our educational support program.',
    date: 'January 20, 2024'
  },
  {
    id: 4,
    type: 'image',
    src: '/addini.jpg',
    title: 'Team Planning Session',
    description: 'Strategic planning session with our community development team.',
    date: 'April 5, 2024'
  },
  {
    id: 5,
    type: 'video',
    src: '/videos/community-event.mp4',
    title: 'Annual Community Festival',
    description: 'Celebrating our community achievements at the annual festival.',
    date: 'December 10, 2023'
  },
  {
    id: 6,
    type: 'image',
    src: '/foodstuff.jpg',
    title: 'Food Aid Distribution',
    description: 'Distributing food aid to families in need across the constituency.',
    date: 'November 22, 2023'
  }
]