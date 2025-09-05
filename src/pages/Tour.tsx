import React, { useState, Fragment } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Check, ChevronRight, Users, Shield, DollarSign, Calendar, Star, Heart } from 'lucide-react';
import { Button } from '../components/Button';
export function Tour() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [{
    id: 1,
    title: 'Create Your Account',
    description: 'Sign up with your email to get started on your journey.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Quick and easy registration', 'Email verification for security', 'Privacy-focused account creation', 'No social media connections required']
  }, {
    id: 2,
    title: 'Browse Premium Profiles',
    description: 'Explore our curated selection of sophisticated companions.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Advanced filtering options', 'Verified profiles with real photos', 'Detailed descriptions and preferences', 'VIP profiles for exclusive experiences']
  }, {
    id: 3,
    title: 'Unlock Contact Details',
    description: 'Choose your preferred companion and unlock their contact information.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Secure payment processing', 'Instant access to contact details', 'Multiple contact methods available', 'Contact details saved for future reference']
  }, {
    id: 4,
    title: 'Connect and Arrange',
    description: 'Reach out directly to arrange your perfect companionship experience.',
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Direct communication with companions', 'No platform fees for arrangements', 'Flexible scheduling options', 'Personalized experience planning']
  }, {
    id: 5,
    title: 'Enjoy Premium Companionship',
    description: 'Experience sophisticated companionship tailored to your preferences.',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['High-quality companionship experiences', 'Professional and discreet service', 'Perfect for social events and gatherings', 'Options for recurring arrangements']
  }];
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };
  const currentStepData = steps.find(step => step.id === currentStep) || steps[0];
  // Platform benefits
  const benefits = [{
    icon: <Shield className="h-8 w-8 text-amber-400" />,
    title: 'Safety & Verification',
    description: 'All profiles undergo thorough verification to ensure authenticity and safety for all users.'
  }, {
    icon: <Users className="h-8 w-8 text-amber-400" />,
    title: 'Quality Connections',
    description: 'Our platform focuses on meaningful connections with sophisticated, educated companions.'
  }, {
    icon: <DollarSign className="h-8 w-8 text-amber-400" />,
    title: 'Transparent Pricing',
    description: 'Clear pricing structure with no hidden fees. Pay only for the contacts you unlock.'
  }, {
    icon: <Calendar className="h-8 w-8 text-amber-400" />,
    title: 'Flexible Arrangements',
    description: 'From one-time events to regular companionship, find arrangements that suit your needs.'
  }];
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How EdenAffairs Works
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover our simple process for finding sophisticated
              companionship for any occasion.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            {/* Step indicators */}
            <div className="flex justify-center mb-8 overflow-x-auto py-2">
              <div className="flex items-center">
                {steps.map((step, index) => <Fragment key={step.id}>
                    <button onClick={() => handleStepClick(step.id)} className={`flex flex-col items-center ${currentStep === step.id ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === step.id ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-white'}`}>
                        {step.id}
                      </div>
                      <span className="text-xs mt-2 whitespace-nowrap">
                        {step.title}
                      </span>
                    </button>
                    {index < steps.length - 1 && <div className="w-12 h-px bg-slate-700 mx-2"></div>}
                  </Fragment>)}
              </div>
            </div>
            {/* Current step content */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img src={currentStepData.image} alt={currentStepData.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mr-3">
                      {currentStepData.id}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {currentStepData.title}
                    </h2>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {currentStepData.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    {currentStepData.features.map((feature, index) => <div key={index} className="flex items-center">
                        <Check size={16} className="text-amber-400 mr-2" />
                        <span className="text-gray-300">{feature}</span>
                      </div>)}
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}>
                      Previous
                    </Button>
                    {currentStep < steps.length ? <Button variant="primary" onClick={handleNext}>
                        Next <ChevronRight size={16} className="ml-1" />
                      </Button> : <Button variant="primary">Get Started</Button>}
                  </div>
                </div>
              </div>
            </div>
            {/* Benefits */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Why Choose EdenAffairs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-amber-400 transition duration-300">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-center">
                      {benefit.description}
                    </p>
                  </div>)}
              </div>
            </div>
            {/* Testimonials preview */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  What Our Users Say
                </h2>
                <Button variant="outline" size="sm">
                  View All Testimonials
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "EdenAffairs connected me with the perfect companion for my
                    company gala. Professional, elegant, and great conversation.
                    Worth every penny!"
                  </p>
                  <div className="text-right text-sm text-gray-400">
                    - Michael, Lagos
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "As someone who travels frequently for business, this
                    platform has been a game-changer. The verification process
                    gives me peace of mind."
                  </p>
                  <div className="text-right text-sm text-gray-400">
                    - Rebecca, Abuja
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "The quality of profiles on EdenAffairs is unmatched. I've
                    tried other services, but none compare to the sophistication
                    found here."
                  </p>
                  <div className="text-right text-sm text-gray-400">
                    - Daniel, Port Harcourt
                  </div>
                </div>
              </div>
            </div>
            {/* Call to action */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Experience Premium Companionship?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied users who have found the perfect
                companions for their events and occasions. Start your journey
                today.
              </p>
              <Button variant="secondary" size="lg">
                <Heart size={18} className="mr-2" />
                Join EdenAffairs Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}