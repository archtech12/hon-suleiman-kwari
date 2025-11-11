import '@/styles/index.css'
import {Navbar} from '@/components/Navbar'
import {Newsletter} from '@/components/Newsletter'
import Link from 'next/link'

export default function IndexRoute({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Newsletter />
        <footer className="bg-green-900 text-white">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="size-6 text-gold-400">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-xl font-bold tracking-tight">Hon. Ghali Panda</h2>
                </div>
                <p className="mt-4 text-sm text-gray-300">Representing the great people with dedication and service.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-gold-400">Office Address</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300" role="list">
                  <li>National Assembly Complex</li>
                  <li>Three Arms Zone, Abuja</li>
                  <li>Nigeria</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-gold-400">Contact</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300" role="list">
                  <li><a className="hover:text-gold-400" href="tel:+23400000000">+234 (0) 000 0000</a></li>
                  <li><a className="hover:text-gold-400" href="mailto:office@ghalipanda.gov.ng">office@ghalipanda.gov.ng</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-gold-400">Quick Links</h3>
                <ul className="mt-4 space-y-2 text-sm" role="list">
                  <li><a className="text-gray-300 hover:text-gold-400" href="/about">About</a></li>
                  <li><a className="text-gray-300 hover:text-gold-400" href="/projects">Projects</a></li>
                  <li><a className="text-gray-300 hover:text-gold-400" href="/news">News</a></li>
                  <li><a className="text-gray-300 hover:text-gold-400" href="/sticker-generator">Sticker Generator</a></li>
                  {/* Hidden admin link - only visible on hover */}
                  <li><Link className="text-gray-300 hover:text-gold-400 text-xs" href="/admin" title="Admin Dashboard">Admin</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex space-x-6">
                <a className="text-gray-400 hover:text-gold-400" href="#">
                  <span className="sr-only">Facebook</span>
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-gold-400" href="#">
                  <span className="sr-only">Instagram</span>
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.161 14.566c1.64.92 3.564.92 5.204 0a.75.75 0 00-.59-1.352 11.232 11.232 0 01-4.024 0 .75.75 0 00-.59 1.352zM12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-gold-400" href="#">
                  <span className="sr-only">Twitter</span>
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-8 text-sm text-gray-400 sm:mt-0">© 2024 Hon. Ghali Panda. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}