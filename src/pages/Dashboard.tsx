import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  Home, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const stats = [
    { label: 'Active Bookings', value: '12', icon: Calendar, color: 'text-blue-500' },
    { label: 'Properties Interested', value: '4', icon: Home, color: 'text-primary' },
    { label: 'Total Spent', value: '₦1.2M', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Notifications', value: '3', icon: Bell, color: 'text-red-500' },
  ];

  const recentBookings = [
    { id: 'BK-1024', service: 'Deep Cleaning', date: 'Oct 24, 2023', status: 'Completed', amount: 45000 },
    { id: 'BK-1025', service: 'Office Maintenance', date: 'Oct 28, 2023', status: 'Upcoming', amount: 120000 },
    { id: 'BK-1026', service: 'Standard Cleaning', date: 'Nov 02, 2023', status: 'Pending', amount: 25000 },
  ];

  return (
    <div className="pt-20 min-h-screen bg-secondary/5 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-primary/10 p-6 space-y-8">
        <div className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'bookings', label: 'My Bookings', icon: Calendar },
            { id: 'properties', label: 'Properties', icon: Home },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id ? "bg-primary text-white shadow-lg" : "text-secondary/60 hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Need Help?</p>
          <p className="text-xs text-secondary/60 mb-4">Contact our priority support line for instant assistance.</p>
          <button className="w-full py-2 bg-secondary text-white text-xs font-bold rounded-lg">Contact Support</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold">Welcome back, <span className="text-primary italic">Winny</span></h1>
            <p className="text-secondary/60">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" size={16} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-primary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button className="relative p-2 bg-white border border-primary/10 rounded-lg text-secondary/60 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/20 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl bg-opacity-10", stat.color.replace('text-', 'bg-'))}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <span className="text-xs font-bold text-green-500">+12%</span>
              </div>
              <p className="text-sm font-bold text-secondary/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-display font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
              <div className="p-6 border-b border-primary/5 flex justify-between items-center">
                <h3 className="font-display font-bold text-xl">Recent Bookings</h3>
                <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-secondary/5 text-secondary/40 text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-primary/5 transition-colors cursor-pointer">
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm">{booking.service}</p>
                          <p className="text-xs text-secondary/40">{booking.id}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary/60">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            booking.status === 'Completed' ? "bg-green-100 text-green-600" :
                            booking.status === 'Upcoming' ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
                          )}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-sm">{formatCurrency(booking.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-primary/5 p-6">
              <h3 className="font-display font-bold text-xl mb-6">Upcoming Service</h3>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Office Maintenance</p>
                    <p className="text-xs text-secondary/40">Oct 28, 2023 • 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-secondary/60">
                  <MapPin size={14} className="text-primary" />
                  <span>Victoria Island, Lagos</span>
                </div>
                <button className="w-full btn-primary py-2 text-xs">Reschedule</button>
              </div>
            </div>

            <div className="bg-secondary text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl mb-2">Premium Member</h3>
                <p className="text-white/60 text-xs mb-6">You're currently on the Gold tier. Enjoy exclusive real estate previews.</p>
                <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center">
                  Upgrade Tier <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <LayoutDashboard size={120} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
