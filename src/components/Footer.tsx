import { Crown, Shield, Lock, Mail, Phone, MapPin, Heart, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-700/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center text-2xl font-bold text-white mb-6">
              <Crown className="h-8 w-8 text-amber-400 mr-2" />
              <span className="text-amber-400">Eden</span>
              <span>Affairs</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nigeria's most exclusive platform for premium adult connections. 
              Connecting discerning individuals with verified, high-quality companions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 glass-effect rounded-lg border border-slate-700/50">
                <div className="text-amber-400 font-bold text-xl">10K+</div>
                <div className="text-gray-400 text-xs">Active Members</div>
              </div>
              <div className="text-center p-3 glass-effect rounded-lg border border-slate-700/50">
                <div className="text-amber-400 font-bold text-xl">99%</div>
                <div className="text-gray-400 text-xs">Verified Profiles</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-emerald-400 text-xs">
                <Shield className="h-4 w-4 mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center text-blue-400 text-xs">
                <Lock className="h-4 w-4 mr-1" />
                Private & Safe
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <Star className="h-5 w-5 text-amber-400 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                'Browse Profiles',
                'How It Works',
                'Premium Features',
                'Success Stories',
                'Create Account',
                'Support Center'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <Shield className="h-5 w-5 text-emerald-400 mr-2" />
              Privacy & Legal
            </h4>
            <ul className="space-y-3">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'User Guidelines',
                'Safety Tips',
                'Report Content'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-emerald-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center">
              <Heart className="h-5 w-5 text-purple-400 mr-2" />
              Get in Touch
            </h4>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 text-purple-400 mr-3" />
                support@edenaffairs.ng
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 text-purple-400 mr-3" />
                +234 (0) 800-EDEN-123
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="h-4 w-4 text-purple-400 mr-3" />
                Lagos, Nigeria
              </div>
            </div>

            {/* VIP Support */}
            <div className="glass-effect p-4 rounded-lg border border-amber-500/30">
              <div className="flex items-center mb-2">
                <Crown className="h-4 w-4 text-amber-400 mr-2" />
                <span className="text-amber-400 font-semibold text-sm">VIP Support</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Premium members get 24/7 priority support and dedicated account management.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Eden Affairs. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                For adults 18+ only. Connecting quality people for premium experiences.
              </p>
            </div>

            {/* Age Verification Badge */}
            <div className="flex items-center space-x-6">
              <div className="glass-effect px-4 py-2 rounded-lg border border-red-500/30">
                <span className="text-red-400 font-bold text-sm">18+</span>
                <span className="text-gray-400 text-xs ml-2">Adults Only</span>
              </div>
              
              <div className="flex items-center text-emerald-400 text-xs">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                Platform Online
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-6 pt-6 border-t border-slate-800/50">
            <p className="text-gray-500 text-xs text-center leading-relaxed max-w-4xl mx-auto">
              <strong className="text-gray-400">Legal Disclaimer:</strong> Eden Affairs is a premium adult platform 
              connecting consenting adults 18+ for companionship services. We do not facilitate or endorse any 
              illegal activities. All members must verify their age and identity. Please use our platform responsibly 
              and in accordance with local laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}