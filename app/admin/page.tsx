export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Published News</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Media Items</h3>
          <p className="text-3xl font-bold text-green-600">42</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="border-b pb-4">
            <p className="font-medium">Updated About Page</p>
            <p className="text-gray-600 text-sm">2 hours ago</p>
          </li>
          <li className="border-b pb-4">
            <p className="font-medium">Added new project: Community Health Initiative</p>
            <p className="text-gray-600 text-sm">1 day ago</p>
          </li>
          <li className="border-b pb-4">
            <p className="font-medium">Published news article: Infrastructure Development Update</p>
            <p className="text-gray-600 text-sm">2 days ago</p>
          </li>
        </ul>
      </div>
    </div>
  );
}