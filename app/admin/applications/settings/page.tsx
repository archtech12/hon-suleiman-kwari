'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ApplicationSettings {
  applicationsEnabled: boolean;
  maxApplicationsPerUser: number;
  applicationReviewRequired: boolean;
  defaultApplicationStatus: string;
}

export default function ApplicationSettingsPage() {
  const [settings, setSettings] = useState<ApplicationSettings>({
    applicationsEnabled: true,
    maxApplicationsPerUser: 5,
    applicationReviewRequired: true,
    defaultApplicationStatus: 'Pending'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      fetchSettings(storedToken);
    } else {
      // Redirect to login if no token
      window.location.href = '/admin/login';
    }
  }, []);

  const fetchSettings = async (authToken: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/application-settings', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings({
          applicationsEnabled: data.applicationsEnabled,
          maxApplicationsPerUser: data.maxApplicationsPerUser,
          applicationReviewRequired: data.applicationReviewRequired,
          defaultApplicationStatus: data.defaultApplicationStatus
        });
      } else {
        throw new Error('Failed to fetch settings');
      }
    } catch (err: any) {
      console.error('Error fetching settings:', err);
      // Use default settings if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!token) return;
    
    setSaving(true);
    setSuccess(false);
    
    try {
      const response = await fetch('http://localhost:5000/api/application-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        const data = await response.json();
        setSettings({
          applicationsEnabled: data.applicationsEnabled,
          maxApplicationsPerUser: data.maxApplicationsPerUser,
          applicationReviewRequired: data.applicationReviewRequired,
          defaultApplicationStatus: data.defaultApplicationStatus
        });
        setSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to save settings');
      }
    } catch (err: any) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    } as ApplicationSettings));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Application Settings</h1>
          <Link 
            href="/admin/applications"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Back to Applications
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
            </div>
            <div className="mt-8 h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Application Settings</h1>
        <Link 
          href="/admin/applications"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Back to Applications
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Community Application System</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage how community members can submit and interact with applications.
          </p>
        </div>

        <div className="p-6">
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Settings saved successfully!
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Enable Applications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Toggle whether community members can submit applications
                </p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  settings.applicationsEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.applicationsEnabled}
                onClick={() => setSettings(prev => ({ ...prev, applicationsEnabled: !prev.applicationsEnabled } as ApplicationSettings))}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.applicationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Submission Limits</h3>
              <p className="mt-1 text-sm text-gray-500">
                Control how many applications a user can submit
              </p>
              
              <div className="mt-4">
                <label htmlFor="maxApplicationsPerUser" className="block text-sm font-medium text-gray-700">
                  Maximum applications per user
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="maxApplicationsPerUser"
                    name="maxApplicationsPerUser"
                    min="1"
                    max="50"
                    value={settings.maxApplicationsPerUser}
                    onChange={handleChange}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Review Process</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure how applications are reviewed and approved
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="applicationReviewRequired"
                    name="applicationReviewRequired"
                    type="checkbox"
                    checked={settings.applicationReviewRequired}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="applicationReviewRequired" className="ml-3 block text-sm text-gray-700">
                    Require admin review before applications are visible to the public
                  </label>
                </div>
                
                <div>
                  <label htmlFor="defaultApplicationStatus" className="block text-sm font-medium text-gray-700">
                    Default application status
                  </label>
                  <select
                    id="defaultApplicationStatus"
                    name="defaultApplicationStatus"
                    value={settings.defaultApplicationStatus}
                    onChange={handleChange}
                    className="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Approved">Approved (Immediately Visible)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}