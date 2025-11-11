import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Our Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the various initiatives and projects led by Hon. Dr. Ghali Mustapha Tijjani Panda 
          to transform communities across Gaya, Ajingi, and Albasu.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Projects will be loaded dynamically from the API */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-gray-400">work</span>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block text-xs px-2 py-1 rounded-full mb-3 bg-green-100 text-green-800">
                Education
              </span>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Sabuwar Makaranta Primary a G.R.A Quarters</h3>
            <p className="text-gray-600 mb-4">
              Dan Majalisar tarayya mai wakiltar Gaya, Ajingi, Albasu Hon Dr. Ghali Mustapha Tijjani Panda ya gina sabuwar makaranta primary a G. R. A quarters dake karamar hukumar Gaya.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">2024</span>
              <Link href="#" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-gray-400">solar_power</span>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block text-xs px-2 py-1 rounded-full mb-3 bg-blue-100 text-blue-800">
                Infrastructure
              </span>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Kai Wuta Garin Batayya da Garin Unbara</h3>
            <p className="text-gray-600 mb-4">
              Bayan Rashin Wutar Lantarki Na Tsahon Shekaru 22 a Garin Batayya Dan Majalissar Tarayya Mai Wakiltar Gaya,Ajingi, Albasu Dr. Ghali Mustapha Tijjani Fanda Ya Kai Wuta Garin da kuma Garin Unbara dake Mazabar Fanda da Basu Taba Samin Wuta ba a tarihin Garin.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">2024</span>
              <Link href="#" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-gray-400">school</span>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block text-xs px-2 py-1 rounded-full mb-3 bg-green-100 text-green-800">
                Education
              </span>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Ongoing
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Scholarship Program for Nursing Students</h3>
            <p className="text-gray-600 mb-4">
              Zan yi amfani da wannan dama a madadin iyaye da Yan uwa na mika Godiya ga mai girma Dan majalissar Tarayya mai wakiltar ALBASU, GAYA da AJINGI Dr. Ghali Mustapha wajen biyawa daliban da ya dauki nauyin karatun su a college of nursing science Kano, Madobi, Dambatta da Gwarzo registration.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">2024</span>
              <Link href="#" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link 
          href="/" 
          className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}