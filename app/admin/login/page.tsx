'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      router.push('/admin')
    }
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('adminToken', data.token)

        // Save email if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }

        router.push('/admin')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div
            className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob"
            style={{animationDelay: '2s'}}
          ></div>
          <div
            className="absolute bottom-20 left-40 w-72 h-72 bg-green-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob"
            style={{animationDelay: '4s'}}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
              </svg>
            </div>
            <h1 className="text-5xl font-black mb-4 leading-tight">
              Welcome Back,
              <br />
              <span className="text-yellow-300">Administrator</span>
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Access the Hon. Dr. Ghali Campaign Dashboard
            </p>
          </div>

          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-green-900 text-2xl">dashboard</span>
              </div>
              <div>
                <p className="font-bold text-lg">Campaign Management</p>
                <p className="text-green-100 text-sm">Control all campaign content</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-green-900 text-2xl">
                  volunteer_activism
                </span>
              </div>
              <div>
                <p className="font-bold text-lg">Volunteer Management</p>
                <p className="text-green-100 text-sm">Track and organize supporters</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-green-900 text-2xl">analytics</span>
              </div>
              <div>
                <p className="font-bold text-lg">Real-time Analytics</p>
                <p className="text-green-100 text-sm">Monitor campaign performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-8 sm:py-12">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
              Sign in to access the campaign dashboard
            </p>
          </div>

          <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-shake">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-red-500 mr-3">error</span>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400">mail</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400">lock</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span className="material-symbols-outlined text-gray-400 hover:text-gray-600">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-3.5 sm:py-3 px-4 border border-transparent text-base sm:text-base font-bold rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-[1.02] touch-manipulation"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">login</span>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 text-xl">info</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-2">Demo Credentials</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">mail</span>
                    <strong>Email:</strong> admin@ghalipanda.gov.ng
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">key</span>
                    <strong>Password:</strong> Admin123!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>© 2024 Hon. Dr. Ghali Mustapha Tijjani Phanda</p>
            <p>Secure Campaign Management System</p>
          </div>
        </div>
      </div>
    </div>
  )
}
