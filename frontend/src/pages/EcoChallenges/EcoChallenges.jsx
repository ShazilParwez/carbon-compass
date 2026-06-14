import { Award, Target, CheckCircle2, Circle, Flame } from 'lucide-react';

const challenges = [
  { id: 1, title: 'Meatless Weekdays', description: 'Eat plant-based meals Monday through Friday.', progress: 3, total: 5, xp: 500, category: 'Food' },
  { id: 2, title: 'Zero Waste Grocery', description: 'Bring your own bags and avoid single-use plastics.', progress: 1, total: 1, xp: 200, category: 'Shopping', completed: true },
  { id: 3, title: 'Public Transit Pioneer', description: 'Take the bus or train instead of driving 3 times this week.', progress: 1, total: 3, xp: 300, category: 'Transport' },
];

const badges = [
  { id: 1, name: 'First Steps', description: 'Complete your first carbon assessment', icon: '🌱', earned: true },
  { id: 2, name: 'Vegan For A Day', description: 'Complete 3 plant-based meals in 24h', icon: '🥗', earned: true },
  { id: 3, name: 'Commuter Pro', description: 'Log 50 miles of public transit', icon: '🚆', earned: false },
  { id: 4, name: 'Energy Saver', description: 'Reduce energy consumption by 10% in a month', icon: '💡', earned: false },
];

export default function EcoChallenges() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="text-brand-primary" /> Eco Challenges
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Complete personalized missions to earn points and badges.</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <Flame className="text-orange-500 h-5 w-5" />
          <span className="font-bold text-slate-900 dark:text-white">Level 4</span>
          <span className="text-slate-500 font-medium">1,250 XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Missions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Active Missions</h2>
          {challenges.map(challenge => (
            <div key={challenge.id} className={`glass-card ${challenge.completed ? 'opacity-70' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
                      {challenge.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center">
                      <Award size={14} className="mr-1" /> {challenge.xp} XP
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${challenge.completed ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{challenge.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center justify-center">
                  {challenge.completed ? (
                    <CheckCircle2 className="h-8 w-8 text-brand-primary" />
                  ) : (
                    <div className="relative flex items-center justify-center w-12 h-12">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                        <circle 
                          cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                          strokeDasharray={20 * 2 * Math.PI} 
                          strokeDashoffset={20 * 2 * Math.PI - ((challenge.progress / challenge.total) * 100 / 100) * 20 * 2 * Math.PI}
                          className="text-brand-primary transition-all duration-1000 ease-out" 
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-300">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges Cabinet */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Badge Cabinet</h2>
          <div className="glass-card grid grid-cols-2 gap-4">
            {badges.map(badge => (
              <div 
                key={badge.id} 
                className={`flex flex-col items-center text-center p-4 rounded-xl border ${
                  badge.earned 
                    ? 'border-amber-200 bg-gradient-to-b from-amber-50 to-white dark:from-slate-800 dark:to-slate-900' 
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 grayscale opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-tight">{badge.name}</h4>
                <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}