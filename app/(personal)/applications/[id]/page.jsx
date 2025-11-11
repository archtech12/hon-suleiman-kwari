'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ApplicationDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportLoading, setSupportLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications/${id}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
        } else {
          throw new Error('Application not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  const handleSupport = async () => {
    setSupportLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Update the support count in the UI
        setApplication(prev => ({
          ...prev,
          supportCount: data.supportCount
        }));
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add support');
      }
    } catch (err) {
      console.error('Support error:', err);
      alert('An error occurred while adding support');
    } finally {
      setSupportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <p className="mt-4 text-gray-600">Loading application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="w-full py-16 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Not Found! </strong>
          <span className="block sm:inline">Application not found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">Application Details</h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            View and support this community initiative
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {application.category}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                    application.status === 'Approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                    application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                    application.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}>
                    {application.status}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {application.supportCount} supporters
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {application.title}
              </h1>
              
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>{application.description}</p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submitted By</h3>
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{application.author}</p>
                    <p className="text-gray-600 dark:text-gray-400">{application.email}</p>
                    {application.phone && (
                      <p className="text-gray-600 dark:text-gray-400">{application.phone}</p>
                    )}
                    {application.location && (
                      <p className="text-gray-600 dark:text-gray-400">{application.location}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSupport}
                  disabled={supportLoading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                >
                  {supportLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Supporting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      Support This Initiative
                    </>
                  )}
                </button>
                
                <Link 
                  href="/applications"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Back to Applications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}