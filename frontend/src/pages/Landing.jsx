import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Shield, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-brand-light/50 dark:from-slate-950 dark:via-brand-dark/20 dark:to-slate-950 -z-10" />
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand-primary/20 blur-3xl opacity-50 dark:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-brand-secondary/20 blur-3xl opacity-50 dark:opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-primary/30 text-brand-secondary dark:text-brand-accent text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-ping"></span>
              Introducing Carbon Compass
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
              Navigate Your Journey to a <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Greener Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered sustainability assistant that helps you understand, track, and reduce your carbon footprint with intelligent, personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-2">
                Start Your Journey <ArrowRight size={20} />
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-white font-semibold text-lg transition-all flex items-center justify-center gap-2">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-2">Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Intelligent Environmental Decisions</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="text-brand-primary h-8 w-8" />}
              title="Personalized Insights"
              description="Get actionable recommendations based on your unique lifestyle and daily habits to efficiently lower your footprint."
            />
            <FeatureCard 
              icon={<Globe className="text-brand-secondary h-8 w-8" />}
              title="Impact Simulator"
              description="Predict how small changes today will impact your yearly emissions before you commit to them."
            />
            <FeatureCard 
              icon={<Zap className="text-brand-accent h-8 w-8" />}
              title="Smart Decision Assistant"
              description="Ask natural language questions about everyday choices (like travel or food) and get instant sustainability scores."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <Shield className="h-16 w-16 text-brand-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to make a difference?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of others navigating their way to a sustainable lifestyle with Carbon Compass.</p>
          <Link to="/register" className="inline-block px-10 py-4 rounded-full bg-white text-brand-dark hover:bg-slate-100 font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-card flex flex-col items-start border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800">
      <div className="p-4 rounded-2xl bg-brand-light dark:bg-brand-dark/50 mb-6 border border-brand-primary/10">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}