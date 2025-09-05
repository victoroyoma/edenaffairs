import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Quote } from 'lucide-react';
import { Button } from '../components/Button';
export function Testimonials() {
  // Sample testimonials data
  const testimonials = [{
    id: 1,
    name: 'Michael L.',
    location: 'Lagos',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: "EdenAffairs has completely changed my social life. I was nervous about attending my company's gala alone, but the companion I found through this platform was perfect - elegant, intelligent, and made me feel completely at ease. The verification process gave me confidence that I was meeting someone genuine.",
    date: 'October 2023'
  }, {
    id: 2,
    name: 'Rebecca T.',
    location: 'Abuja',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: "As a businesswoman who travels frequently, I often need company for corporate events. The profiles on EdenAffairs are sophisticated and professional - exactly what I need. The platform is discreet, secure, and the payment system is seamless. I've recommended it to all my colleagues.",
    date: 'September 2023'
  }, {
    id: 3,
    name: 'James K.',
    location: 'Port Harcourt',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: 'I was skeptical at first, but EdenAffairs exceeded my expectations. The companion I met was not only stunning but also had great conversational skills that impressed everyone at the event. The only reason for 4 stars instead of 5 is that I wish there were more profiles in my specific area.',
    date: 'November 2023'
  }, {
    id: 4,
    name: 'Sarah M.',
    location: 'Lagos',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: 'After my divorce, I was nervous about attending social events alone. EdenAffairs connected me with a charming gentleman who made me feel comfortable and confident. The premium membership is absolutely worth it for the quality of matches and the priority service.',
    date: 'August 2023'
  }, {
    id: 5,
    name: 'Daniel O.',
    location: 'Abuja',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: "I've used several companion services before, but EdenAffairs stands out for its professionalism and quality. The VIP profiles are truly exceptional - well-educated, sophisticated, and perfect for high-profile events. The verification system ensures you get exactly what you see in the profiles.",
    date: 'October 2023'
  }, {
    id: 6,
    name: 'Victoria E.',
    location: 'Calabar',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3',
    content: "EdenAffairs helped me find the perfect date for my sister's wedding. I was dreading going alone, but the companion I found was charming, well-dressed, and even impressed my family! The pricing is fair for the quality of service provided. I'll definitely use this platform again.",
    date: 'December 2023'
  }];
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => <Star key={i} size={16} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-500'} />);
  };
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Client Testimonials
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover what our satisfied clients have to say about their
              experiences with EdenAffairs.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(testimonial => <div key={testimonial.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-amber-400 transition duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="relative">
                      <Quote className="absolute top-0 left-0 w-8 h-8 text-amber-400/20 -translate-x-2 -translate-y-2" />
                      <p className="text-gray-300 relative z-10">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-right">
                      {testimonial.date}
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="mt-16 bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Share Your Experience
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Have you had a great experience with EdenAffairs? We'd love to
                hear about it! Your testimonial could help others find the
                perfect companion for their special events.
              </p>
              <Button variant="primary">Submit Your Testimonial</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}