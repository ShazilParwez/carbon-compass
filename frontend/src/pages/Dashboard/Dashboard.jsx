import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Leaf, TrendingDown, AlertCircle, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TTSButton from '../../components/common/TTSButton';

const weeklyData = [
  { name: 'Mon', emissions: 14.5, target: 15 },
  { name: 'Tue', emissions: 13.2, target: 15 },
  { name: 'Wed', emissions: 16.1, target: 15 },
  { name: 'Thu', emissions: 12.8, target: 15 },
  { name: 'Fri', emissions: 14.0, target: 15 },
  { name: 'Sat', emissions: 18.5, target: 15 },
  { name: 'Sun', emissions: 11.2, target: 15 },
];

const categoryData = [
  { name: 'Transport', value: 45, color: '#059669' },
  { name: 'Home Energy', value: 30, color: '#0d9488' },
  { name: 'Food', value: 15, color: '#3b82f6' },
  { name: 'Shopping', value: 10, color: '#8b5cf6' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Alex!</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Here's your sustainability overview for this week.</p>
        </div>
        <Link to="/decision-assistant" className="hidden sm:flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors font-medium shadow-sm">
          Decision Assistant <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="glass-card bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 dark:from-brand-primary/20 dark:to-brand-secondary/10 border-brand-primary/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-1">Carbon Score</p>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">84<span className="text-xl text-slate-500 font-medium">/100</span></h2>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
              <Leaf className="h-6 w-6 text-brand-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-brand-primary mr-1" />
            <span className="text-brand-primary font-medium">12% better</span>
            <span className="text-slate-500 dark:text-slate-400 ml-1">than last week</span>
          </div>
        </div>

        {/* Current Weekly Total */}
        <div className="glass-card">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Weekly Emissions</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">100.3 <span className="text-lg text-slate-500 font-normal">kg CO₂e</span></h2>
          <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">85% of weekly target (118 kg)</p>
        </div>

        {/* Active Challenge Progress */}
        <div className="glass-card">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Challenge</p>
            <Award className="h-5 w-5 text-brand-secondary" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Meatless Weekdays</h3>
          <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-brand-secondary h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">3 of 5 days completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="glass-card lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Progress</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" dot={false} strokeWidth={2} name="Target" />
                <Line type="monotone" dataKey="emissions" stroke="#059669" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Emissions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emission Breakdown & Insights */}
        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Emissions Breakdown</h3>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{category.name}</span>
                    <span className="text-slate-500">{category.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${category.value}%`, backgroundColor: category.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card bg-brand-light/50 dark:bg-slate-800/50 border-brand-primary/10">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center text-brand-primary font-bold uppercase tracking-wider text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Explain My Footprint
              </div>
              <TTSButton 
                text={`Your transport emissions spiked on Saturday. Consider asking the Decision Assistant for greener weekend travel alternatives.`}
                sectionId="explain-footprint"
              />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Your transport emissions spiked on Saturday. Consider asking the <Link to="/decision-assistant" className="text-brand-primary font-medium hover:underline">Decision Assistant</Link> for greener weekend travel alternatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}