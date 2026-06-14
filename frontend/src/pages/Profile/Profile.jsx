import { User, Mail, Shield } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Profile Settings</h1>
      <div className="glass-card">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-20 w-20 rounded-full bg-brand-primary/20 flex items-center justify-center">
            <User className="h-10 w-10 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Alex Johnson</h2>
            <p className="text-slate-500">Level 4 • Eco Pioneer</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input type="email" disabled value="alex.johnson@example.com" className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 cursor-not-allowed" />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-brand-primary/10 text-brand-primary font-medium rounded-lg hover:bg-brand-primary/20 transition-colors">
            <Shield className="h-4 w-4 mr-2" /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
}