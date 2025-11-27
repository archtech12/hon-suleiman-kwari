'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'

interface Initiative {
  id: number
  title: string
  description: string
  icon: string
}

interface ConstituencyData {
  name: string
  representative: string
  party: string
  electionYear: string
  communities: string[]
  population: string
}

export default function ConstituencyPage() {
  const [constituencyData, setConstituencyData] = useState<ConstituencyData>({
    name: '',
    representative: '',
    party: '',
    electionYear: '',
    communities: [],
    population: '',
  })
  const [initiatives, setInitiatives] = useState<Initiative[]>([])
  const [visionContent, setVisionContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConstituencyData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/constituency`,
        )
        if (response.ok) {
          const data = await response.json()
          setConstituencyData({
            name: data.name,
            representative: data.representative,
            party: data.party,
            electionYear: data.electionYear,
            communities: data.communities,
            population: data.population,
          })
          setInitiatives(data.initiatives || [])
          setVisionContent(data.visionContent || '')
        } else {
          // Fallback to hardcoded data if API fails
          setConstituencyData({
            name: 'Gaya / Ajingi / Albasu Federal Constituency',
            representative: 'Hon. Dr. Ghali Mustapha Tijjani Phanda',
            party: 'New Nigeria Peoples Party (NNPP)',
            electionYear: '2023',
            communities: ['Gaya', 'Ajingi', 'Albasu'],
            population: 'Approximately 200,000 residents',
          })

          setInitiatives([
            {
              id: 1,
              title: 'Economic Empowerment Programs',
              description:
                'Initiatives to reduce import dependency and make essential goods more affordable for local communities.',
              icon: 'trending_down',
            },
            {
              id: 2,
              title: 'Infrastructure Development',
              description:
                'Projects focused on improving transportation networks and addressing fuel scarcity issues.',
              icon: 'local_shipping',
            },
            {
              id: 3,
              title: 'Local Manufacturing Support',
              description:
                'Supporting domestic production to create jobs and reduce reliance on foreign goods.',
              icon: 'factory',
            },
            {
              id: 4,
              title: 'Community Health Programs',
              description:
                'Free medical checkups and health education programs for underserved rural communities.',
              icon: 'local_hospital',
            },
          ])

          setVisionContent(
            "Dr. Ghali's vision for Gaya, Ajingi, and Albasu is rooted in sustainable development that creates opportunities for all residents. His approach combines grassroots community engagement with strategic policy advocacy at the federal level. By focusing on economic reforms that reduce the cost of living, improving infrastructure that connects communities to markets and services, and supporting local entrepreneurship, we aim to build a constituency that serves as a model for development across Nigeria.",
          )
        }
      } catch (error) {
        console.error('Failed to fetch constituency data:', error)
        // Fallback to hardcoded data if API fails
        setConstituencyData({
          name: 'Gaya / Ajingi / Albasu Federal Constituency',
          representative: 'Hon. Dr. Ghali Mustapha Tijjani Phanda',
          party: 'New Nigeria Peoples Party (NNPP)',
          electionYear: '2023',
          communities: ['Gaya', 'Ajingi', 'Albasu'],
          population: 'Approximately 200,000 residents',
        })

        setInitiatives([
          {
            id: 1,
            title: 'Economic Empowerment Programs',
            description:
              'Initiatives to reduce import dependency and make essential goods more affordable for local communities.',
            icon: 'trending_down',
          },
          {
            id: 2,
            title: 'Infrastructure Development',
            description:
              'Projects focused on improving transportation networks and addressing fuel scarcity issues.',
            icon: 'local_shipping',
          },
          {
            id: 3,
            title: 'Local Manufacturing Support',
            description:
              'Supporting domestic production to create jobs and reduce reliance on foreign goods.',
            icon: 'factory',
          },
          {
            id: 4,
            title: 'Community Health Programs',
            description:
              'Free medical checkups and health education programs for underserved rural communities.',
            icon: 'local_hospital',
          },
        ])

        setVisionContent(
          "Dr. Ghali's vision for Gaya, Ajingi, and Albasu is rooted in sustainable development that creates opportunities for all residents. His approach combines grassroots community engagement with strategic policy advocacy at the federal level. By focusing on economic reforms that reduce the cost of living, improving infrastructure that connects communities to markets and services, and supporting local entrepreneurship, we aim to build a constituency that serves as a model for development across Nigeria.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchConstituencyData()
  }, [])

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Constituency Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Serving the people of Gaya, Ajingi, and Albasu with dedication and integrity
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Our Constituency
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  The {constituencyData.name} is represented in the House of Representatives by
                  {constituencyData.representative}, who was elected in{' '}
                  {constituencyData.electionYear} on the platform of the {constituencyData.party}.
                </p>
                <p className="mb-4">
                  Our constituency is home to {constituencyData.population} across{' '}
                  {constituencyData.communities.length} distinct communities, each with its own
                  unique cultural heritage and economic characteristics.{' '}
                  {constituencyData.representative}'s representation focuses on addressing the
                  specific needs of these communities while advocating for policies that benefit all
                  Nigerians.
                </p>
                <p className="mb-6">
                  Since taking office, {constituencyData.representative} has championed initiatives
                  that focus on economic empowerment, infrastructure development, and improving
                  access to essential services. His legislative work emphasizes reducing dependency
                  on imports, improving transportation networks, and supporting local manufacturing
                  to create jobs and reduce the cost of living.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Key Policy Focus Areas
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Reducing import barriers to make essential goods more affordable</li>
                  <li>Improving transportation infrastructure to reduce costs</li>
                  <li>Supporting local manufacturing and entrepreneurship</li>
                  <li>Expanding access to healthcare and education</li>
                  <li>Creating employment opportunities for youth and women</li>
                </ul>

                <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <blockquote className="text-lg italic text-gray-900 dark:text-white">
                    "My representation is anchored in empowering youth, women, and families across
                    our constituency—delivering vital support such as food aid, education
                    infrastructure, and economic-opportunity programmes."
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Constituency Facts
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      location_on
                    </span>
                    <span>
                      <strong>Communities:</strong> {constituencyData.communities.join(', ')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">groups</span>
                    <span>
                      <strong>Population:</strong> {constituencyData.population}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">badge</span>
                    <span>
                      <strong>Representative:</strong> {constituencyData.representative}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      calendar_today
                    </span>
                    <span>
                      <strong>Elected:</strong> {constituencyData.electionYear}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">flag</span>
                    <span>
                      <strong>Party:</strong> {constituencyData.party}
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-block w-full text-center bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Contact Our Office
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Initiatives
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Programs and policies championed by Dr. Ghali for our constituency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-green-700"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <span className="material-symbols-outlined text-green-700 dark:text-green-400">
                      {initiative.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {initiative.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-green-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Vision for the Future
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto">
                <p className="mb-4">
                  Dr. Ghali's vision for Gaya, Ajingi, and Albasu is rooted in sustainable
                  development that creates opportunities for all residents. His approach combines
                  grassroots community engagement with strategic policy advocacy at the federal
                  level.
                </p>
                <p className="mb-6">
                  By focusing on economic reforms that reduce the cost of living, improving
                  infrastructure that connects communities to markets and services, and supporting
                  local entrepreneurship, we aim to build a constituency that serves as a model for
                  development across Nigeria.
                </p>
                <Link
                  href="/legislative"
                  className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
                >
                  Learn About Legislative Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
