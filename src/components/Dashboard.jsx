import React from 'react';
import { 
  Shield, 
  BookOpen, 
  Video, 
  Sparkles, 
  Star,
  ArrowRight,
  Clock,
  MapPin
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const quickActions = [
    {
      id: 'traffic-stop',
      title: 'Traffic Stop',
      subtitle: 'Know your rights during traffic stops',
      icon: Shield,
      color: 'bg-blue-500'
    },
    {
      id: 'police-questioning',
      title: 'Police Questioning',
      subtitle: 'What to say and what not to say',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      id: 'emergency-record',
      title: 'Emergency Record',
      subtitle: 'Quick recording & alert',
      icon: Video,
      color: 'bg-red-500'
    },
    {
      id: 'generate-card',
      title: 'Generate Card',
      subtitle: 'AI-powered rights summary',
      icon: Sparkles,
      color: 'bg-yellow-500'
    }
  ];

  const recentCards = [
    {
      id: 1,
      title: 'Traffic Stop Rights - California',
      generated: '2 hours ago',
      type: 'Traffic Stop'
    },
    {
      id: 2,
      title: 'Know Your Miranda Rights',
      generated: '1 day ago',
      type: 'Questioning'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome to Zara Rights
            </h1>
            <div className="flex items-center space-x-2 text-white/80">
              <MapPin className="h-4 w-4" />
              <span>{user.selectedState}</span>
              <span>•</span>
              <span className="capitalize">{user.subscriptionStatus}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">
              {user.subscriptionStatus === 'premium' ? 'Premium' : 'Upgrade to Premium'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="glass-effect rounded-xl p-6 hover:bg-white/20 
                       transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-white/70 text-sm mb-4">{action.subtitle}</p>
              <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Get Started</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cards */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Cards</h2>
          <div className="space-y-3">
            {recentCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/10 rounded-lg p-4 hover:bg-white/20 
                         transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-white mb-1">{card.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{card.type}</span>
                  <div className="flex items-center space-x-1 text-white/60">
                    <Clock className="h-4 w-4" />
                    <span>{card.generated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Cards Generated</span>
              <span className="text-2xl font-bold text-white">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">Recordings Made</span>
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">Rights Learned</span>
              <span className="text-2xl font-bold text-white">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;