import React from "react";

export default function ReplySettings() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reply settings</h1>

        {/* Property Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
          <div className="relative">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none">
              <option>No Name (Jul 25, 2025)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">Signature</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Personal</span>
          </div>
          <div className="relative">
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-white text-gray-900 resize-none"
              placeholder={`Best regards,\nYour example hotel`}
              defaultValue={`Best regards,\nYour example hotel`}
              maxLength={300}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">0/300</div>
          </div>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add signature
          </button>
        </div>

        {/* AI Version Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">Select the AI Version MARA should use to write your review replies.</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">All users</span>
          </div>
          <div className="flex gap-3 mb-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">MARA AI</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">Your Brand Voice</button>
          </div>
          <p className="text-sm text-gray-600">Brand Voice Status: Not available</p>
        </div>

        {/* Response Length & Tone of Voice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Response length</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none">
                <option>Brief</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Tone of voice</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none">
                <option>Business Casual</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Snippets Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">Smart Snippets</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <a href="#" className="text-blue-600 text-sm ml-2 hover:underline">Learn more</a>
            </div>
            <span className="text-sm text-gray-500">All users</span>
          </div>

          {/* Smart Snippets Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Active</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Level</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Review Topic</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Reply</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4">
                    {/* Toggle Switch */}
                    <div className="relative w-11 h-6 bg-blue-500 rounded-full cursor-pointer">
                      <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full transition-transform" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-full">Account</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        placeholder="e.g. 'no vegan breakfast', 'pool too cold'"
                        maxLength={60}
                      />
                      <div className="absolute bottom-1 right-2 text-xs text-gray-400">0/60</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <textarea
                        className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 resize-none"
                        placeholder="e.g. 'Cleanliness is a top priority for our team and each room is cleaned daily to the highest standards. We are sorry to hear that we were not able to provide you with a clean experience'"
                        maxLength={300}
                      />
                      <div className="absolute bottom-1 right-2 text-xs text-gray-400">0/300</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add Smart Snippet
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Show AI proposals
            </button>
          </div>
        </div>

        {/* Business Type Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">All users</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Hotel</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">Restaurant</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">App</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">Webshop</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">Other</button>
          </div>
        </div>

        {/* Hotel Name Input */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">What is the name of your Hotel?</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            placeholder="Hotel Name"
          />
        </div>
      </main>
    </div>
  );
} 