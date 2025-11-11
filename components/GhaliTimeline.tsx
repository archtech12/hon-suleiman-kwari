'use client'

import {useState} from 'react'

interface TimelineItem {
  id: number
  title: string
  description: string
  date: string
  category: 'political' | 'philanthropic' | 'personal'
  image?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function GhaliTimeline({items}: TimelineProps) {
  const [filter, setFilter] = useState<'all' | 'political' | 'philanthropic' | 'personal'>('all')
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'political': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'philanthropic': return 'bg-green-100 text-green-800 border-green-200'
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'political': return 'gavel'
      case 'philanthropic': return 'volunteer_activism'
      case 'personal': return 'person'
      default: return 'event'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-green-800">My Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the milestones that have shaped my career and community impact
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-green-700 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-green-100 shadow-md'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('political')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
              filter === 'political' 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-blue-100 shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-base mr-2">gavel</span>
            Political
          </button>
          <button 
            onClick={() => setFilter('philanthropic')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
              filter === 'philanthropic' 
                ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-green-100 shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-base mr-2">volunteer_activism</span>
            Philanthropic
          </button>
          <button 
            onClick={() => setFilter('personal')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
              filter === 'personal' 
                ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-purple-100 shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-base mr-2">person</span>
            Personal
          </button>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-green-600 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`md:w-5/12 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(item.category)} flex items-center`}>
                        <span className="material-symbols-outlined text-base mr-1">{getCategoryIcon(item.category)}</span>
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 mb-3">{item.description}</p>
                    <div className="text-sm font-medium text-green-700">{item.date}</div>
                  </div>
                </div>
                
                {/* Dot and line */}
                <div className="md:w-2/12 flex justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-green-700 border-4 border-white shadow-lg z-10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  {/* Vertical line for mobile */}
                  <div className="absolute top-8 h-12 w-1 bg-green-200 md:hidden"></div>
                </div>
                
                {/* Spacer for alternate items on desktop */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Example usage data
export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Early Life & Education",
    description: "Born in Gaya, Kano State. Pursued higher education with a focus on public service and community development.",
    date: "1990 - 2005",
    category: "personal"
  },
  {
    id: 2,
    title: "Beginning of Public Service",
    description: "Started community development initiatives in local communities, focusing on education and healthcare access.",
    date: "2005 - 2010",
    category: "philanthropic"
  },
  {
    id: 3,
    title: "Leadership Role",
    description: "Elected to a prominent leadership position, enabling broader impact across multiple communities.",
    date: "2010 - Present",
    category: "political"
  },
  {
    id: 4,
    title: "Major Philanthropic Initiative",
    description: "Launched a comprehensive program to support education and healthcare in underserved communities.",
    date: "2015 - Present",
    category: "philanthropic"
  }
]