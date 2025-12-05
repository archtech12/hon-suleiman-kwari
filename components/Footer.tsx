'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-900 mx-auto w-full relative text-center bg-dark text-white p-6 pb-12">
      <div className="container px-6 pt-6 mx-auto">
        <div className="flex flex-col gap-4 items-center justify-center mb-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-green-400 transition-colors">
            Hon. Suleiman Kwari
          </Link>
          <p className="text-green-200 text-sm max-w-md mx-auto">
            Dedicated to the service of Kaduna North Senatorial District. Building a legacy of integrity, development, and progress.
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mb-8">
           <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors">
             <i className="fab fa-facebook-f"></i>
           </a>
           <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors">
             <i className="fab fa-twitter"></i>
           </a>
           <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors">
             <i className="fab fa-instagram"></i>
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center border-t border-green-800/50 pt-8">
          <div className="text-gray-400 text-sm">
            © {currentYear} Hon. Suleiman Kwari Legacy. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm font-medium">
            Developed by Nazifi Ibrahim Saad – <a href="tel:07063925919" className="text-green-400 hover:align-top hover:underline">07063925919</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
