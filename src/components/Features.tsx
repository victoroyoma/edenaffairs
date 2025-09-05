import { Shield, Lock, UserCheck, CreditCard, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-amber-400" />,
      title: '100% Private',
      description: 'Your data is never shared with third parties and remains completely confidential with bank-level security.',
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
      icon: <Lock className="h-10 w-10 text-emerald-400" />,
      title: 'Secure Connections',
      description: 'All profile information and contact details are protected with advanced encryption and secure protocols.',
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      icon: <UserCheck className="h-10 w-10 text-blue-400" />,
      title: 'Verified Profiles',
      description: 'We screen all profiles to prevent fake accounts and ensure authentic, quality connections.',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-400" />,
      title: 'Secure Payments',
      description: 'All transactions are processed through trusted payment gateways with fraud protection.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="h-4 w-4 text-amber-400 mr-2" />
            <span className="text-amber-400 text-sm font-medium">Premium Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-gradient">
            Why Choose Eden Affairs
          </h2>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We prioritize your privacy and security while providing a premium platform for meaningful, 
            authentic connections in Nigeria's most exclusive community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group glass-effect p-8 rounded-2xl border border-slate-600/50 hover:border-amber-400/50 transition-all duration-500 card-hover relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-3 rounded-2xl bg-slate-800/50 w-fit group-hover:bg-slate-700/50 transition-colors duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 border border-slate-600/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Premium Connections?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of verified members who trust Eden Affairs for secure, premium adult connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-luxury px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Browse Profiles
              </button>
              <button className="px-8 py-3 rounded-xl border border-slate-500 text-white hover:border-amber-400 hover:text-amber-400 font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}