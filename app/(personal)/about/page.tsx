'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAboutContent } from '../../../services/api';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutContent();
        setAboutData(data);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
        // Fallback to hardcoded data if API fails
        setAboutData({
          title: "About Hon. Dr. Ghali Mustapha Tijjani Phanda",
          content: `<p>Dr. Ghali Mustapha Tijjani was born on June 13, 1980, in Kano State, Nigeria. A dedicated advocate for community development and participatory leadership, Dr. Ghali entered national public service in 2023 when he was elected to represent the Ajingi / Albasu / Gaya Federal Constituency in the House of Representatives on the platform of the New Nigeria Peoples Party (NNPP).</p>
                  <p>His tenure is anchored in empowering youth, women, and families across his constituency—delivering vital support such as food aid, education infrastructure, and economic-opportunity programmes. With a strong commitment to transparent access and service, Dr. Ghali brings scholastic insight (including doctoral level study) together with boots-on-the-ground community engagement to fulfil his vision of leadership "by the people, for the people."</p>
                  <p>Off the chamber floor, Dr. Ghali believes in harnessing the power of collective effort: his work builds on family values, indigenous heritage and the aspiration of a better future for Kano's communities. His story is one of service, integrity and hope.</p>`
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">{aboutData?.title || "About Hon. Dr. Ghali Mustapha Tijjani Phanda"}</h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">Dedicated advocate for community development and participatory leadership</p>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">My Journey</h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: aboutData?.content || '' }} />
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Core Values</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Integrity in all actions and decisions</li>
                <li>Transparency in governance and operations</li>
                <li>Accountability to constituents and stakeholders</li>
                <li>Equity in resource distribution and opportunity creation</li>
                <li>Sustainability in development initiatives</li>
                <li>Community empowerment through participatory leadership</li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <div className="mb-4">
                  <img src="/ghaliphoto.jpg" alt="Hon. Dr. Ghali Mustapha Tijjani Phanda" className="w-full h-64 object-cover rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">badge</span>
                    <span><strong>Position:</strong> Representative, House of Representatives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">location_on</span>
                    <span><strong>Constituency:</strong> Ajingi / Albasu / Gaya Federal Constituency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">calendar_today</span>
                    <span><strong>Years of Service:</strong> 2023 - Present</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">groups</span>
                    <span><strong>Party:</strong> New Nigeria Peoples Party (NNPP)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">cake</span>
                    <span><strong>Born:</strong> June 13, 1980</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">school</span>
                    <span><strong>Education:</strong> Doctoral Level Study</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/contact" className="inline-block w-full text-center bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300">
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">My Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leadership "by the people, for the people" through community empowerment and sustainable development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">school</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Youth Empowerment</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Comprehensive skills acquisition and entrepreneurship training for young people in underserved communities.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">local_hospital</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Community Health</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Free medical checkups and health education programs for rural communities with limited healthcare access.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">home</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Infrastructure</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Building modern infrastructure to connect communities and drive economic development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}