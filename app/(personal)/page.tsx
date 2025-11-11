import {HomePage} from '@/components/HomePage'
import {MediaGallery, mediaData} from '@/components/MediaGallery'
import {ContactSection} from '@/components/ContactSection'

export default function IndexRoute() {
  // Mock data for the homepage
  const mockData = {
    title: "Dr. Ghali Mustapha Tijjani Phanda",
  }

  return (
    <div>
      <HomePage data={mockData} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-green-800">Recent Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Latest activities and initiatives from Hon. Dr. Ghali Mustapha Tijjani Phanda
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img src="/480465286_605794928897267_5859580872040922079_n.jpg" alt="Community Engagement" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="md:w-2/3">
                <div className="flex items-start mb-4">
                  <span className="material-symbols-outlined text-green-700 mr-2">campaign</span>
                  <h3 className="text-xl font-bold text-gray-800">Community Engagement Update</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Mai Fada Da Cikawa Muddin Yace Zaiyi To Babu Makawa Sai Yayi. Jiya Asabar Kenan 05/10/2024 Idda Dan Majalissa Mai Wakiltar Gaya Ajingi Albasu Ya Gwangwaje Shugabannin Matasa (Youth Leaders) Na Ko Wacce Mazaba Datake Gaya Ajingi Da Albasu.
                </p>
                <p className="text-gray-700 mb-4">
                  Option A.Da B.Pdp Nnpp Da Injinan Malkade Dan Karkari Domin Dogaro Da Kansu. Tabbas Dr Ghali Mustapha Tijjani Phanda Mutumin Kirki Ne Mai San Cigaban Al'umma Da Ayyukan Raya Kasa.
                </p>
                <p className="text-gray-700">
                  Shine Yasa Ya Bude Bada Tallafi Ba Dare Ba Rana Tare Da Ayyukan Alkhairi Domin Amfanuwar Al'ummarsa. Dr Ghali Mustapha Tijjani Phanda Allah Ubangiji Ya Cigaba Da Taimaka Maka.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="material-symbols-outlined text-gold-400 mr-2">calendar_today</span>
                  <span>October 5, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MediaGallery items={mediaData} />
      <ContactSection />
    </div>
  )
}