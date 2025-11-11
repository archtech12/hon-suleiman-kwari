import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-green-700">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <p className="text-gray-700">
              The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/" 
                className="flex-1 text-center bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 transition duration-300"
              >
                Go Home
              </Link>
              <Link 
                href="/contact" 
                className="flex-1 text-center bg-white border-2 border-green-700 text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}