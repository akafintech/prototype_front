import React from 'react';
import { useState } from 'react';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Bookings', icon: '📅' },
    { name: 'Rooms', icon: '🏠' },
    { name: 'Documents', icon: '📄' },
    { name: 'Photos', icon: '📷' },
    { name: 'Guest', icon: '👥' },
    { name: 'Message', icon: '💬' },
    { name: 'Help', icon: '❓' },
    { name: 'Setting', icon: '⚙️' },
  ];

  const bookingData = [
    { guest: 'John Doe', roomType: 'Double Room', checkIn: '01/09/24', checkOut: '02/10/24', status: 'Paid' },
    { guest: 'Jane Smith', roomType: 'Single Room', checkIn: '03/09/24', checkOut: '05/09/24', status: 'Paid' },
    { guest: 'Mike Johnson', roomType: 'Suite', checkIn: '07/09/24', checkOut: '10/09/24', status: 'Paid' },
    { guest: 'Sarah Wilson', roomType: 'Double Room', checkIn: '12/09/24', checkOut: '15/09/24', status: 'Paid' },
    { guest: 'David Brown', roomType: 'Single Room', checkIn: '18/09/24', checkOut: '20/09/24', status: 'Paid' },
    { guest: 'Lisa Davis', roomType: 'Suite', checkIn: '25/09/24', checkOut: '28/09/24', status: 'Paid' },
  ];

  const scheduleData = [
    { date: '11', event: 'Review Manual Checkin', time: '10.30 am' },
    { date: '20', event: 'Meeting with Supervisor', time: '11.00 am' },
    { date: '16', event: 'Review Sales', time: '12.00 pm' },
    { date: '59', event: 'Meeting with Manager', time: '13.00 pm' },
  ];

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">YOURLOGO</h1>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                activeMenu === item.name
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Hotel Booking Management Dashboard
            </h1>
            
            {/* Search and Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search Bookings"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
                </div>
                <button className="ml-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <span className="text-xl">+</span>
                </button>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔔</span>
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">Maria Alfan</div>
                    <div className="text-sm text-gray-600">Admin</div>
                  </div>
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>
            
            {/* Filter Options */}
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Sort by</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Saved search</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg">
                <span>🔧</span>
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">872</div>
                  <div className="text-sm opacity-90">New Booking</div>
                </div>
                <div className="text-2xl">📖</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">285</div>
                  <div className="text-sm opacity-90">Schedule Room</div>
                </div>
                <div className="text-2xl">📅</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">53</div>
                  <div className="text-sm opacity-90">Check In</div>
                </div>
                <div className="text-2xl">➡️</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">78</div>
                  <div className="text-sm opacity-90">Check Out</div>
                </div>
                <div className="text-2xl">⬅️</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Total Sales Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-800">230.816</div>
                <div className="text-green-500 font-medium">+2.5% ↑</div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-end justify-center">
                <div className="w-full h-20 bg-blue-300 rounded-lg opacity-30"></div>
              </div>
            </div>
            
            {/* New Customers Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">New Customers</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-800">2.542</div>
                <div className="text-green-500 font-medium">+1.3% ↑</div>
              </div>
              <div className="h-32 flex items-end justify-center space-x-2">
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '50%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '85%'}}></div>
              </div>
            </div>
          </div>

          {/* Lists and Schedule Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Booking List */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking list</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-600">Guest</th>
                      <th className="text-left py-2 text-gray-600">Type of Room</th>
                      <th className="text-left py-2 text-gray-600">Check in</th>
                      <th className="text-left py-2 text-gray-600">Check out</th>
                      <th className="text-left py-2 text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.map((booking, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 text-gray-800">{booking.guest}</td>
                        <td className="py-3 text-gray-600">{booking.roomType}</td>
                        <td className="py-3 text-gray-600">{booking.checkIn}</td>
                        <td className="py-3 text-gray-600">{booking.checkOut}</td>
                        <td className="py-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Upcoming Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming schedule</h3>
              
              {/* Calendar */}
              <div className="mb-6">
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="py-2 text-gray-600 font-medium">{day}</div>
                  ))}
                  {Array.from({length: 31}, (_, i) => i + 1).map((date) => (
                    <div
                      key={date}
                      className={`py-2 text-sm cursor-pointer rounded ${
                        date === 11 || date === 20
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Event List */}
              <div className="space-y-3">
                {scheduleData.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {event.date}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{event.event}</div>
                      <div className="text-xs text-gray-600">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
