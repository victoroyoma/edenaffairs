import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const toggleQuestion = (id: number) => {
    if (openQuestions.includes(id)) {
      setOpenQuestions(openQuestions.filter(q => q !== id));
    } else {
      setOpenQuestions([...openQuestions, id]);
    }
  };
  // FAQ categories
  const categories = [{
    id: 'general',
    name: 'General',
    questions: [{
      id: 1,
      question: 'What is EdenAffairs?',
      answer: 'EdenAffairs is a premium platform connecting sophisticated individuals seeking companionship for social events, business functions, and special occasions. Our service is designed to facilitate meaningful connections in a safe, discreet, and elegant environment.'
    }, {
      id: 2,
      question: 'Is EdenAffairs legal?',
      answer: 'Yes, EdenAffairs operates fully within the legal framework of Nigeria. We facilitate introductions and companionship services for social events and gatherings. We have strict policies against any illegal activities and monitor all interactions to ensure compliance with our terms of service.'
    }, {
      id: 3,
      question: 'How do I create an account?',
      answer: "Creating an account is simple. Click on the 'Join for Free' button on the homepage, fill in the required information, verify your email, and you're ready to start browsing profiles. To create your own profile, you'll need to complete additional verification steps."
    }]
  }, {
    id: 'profiles',
    name: 'Profiles & Verification',
    questions: [{
      id: 4,
      question: 'How are profiles verified?',
      answer: 'All profiles undergo a thorough verification process. This includes ID verification, photo verification to ensure authenticity, and a brief interview. This process typically takes 24-48 hours after submission. Verified profiles are marked with a verification badge.'
    }, {
      id: 5,
      question: 'What does the VIP badge mean?',
      answer: 'Profiles with a VIP badge offer premium companionship services at a higher price point. VIP profiles have been extensively vetted, have exceptional reviews, and often provide additional services such as international travel companionship or attendance at high-profile events.'
    }, {
      id: 6,
      question: 'Can I have multiple profiles?',
      answer: 'No, each user is limited to one profile on EdenAffairs. This policy helps maintain the integrity of our platform and ensures all interactions are genuine. Attempting to create multiple profiles violates our terms of service and may result in account suspension.'
    }]
  }, {
    id: 'payments',
    name: 'Payments & Pricing',
    questions: [{
      id: 7,
      question: 'How does payment work?',
      answer: 'To access contact details of a profile, you need to pay a flat one-time unlock fee of ₦2,000 regardless of your membership tier. Payments can be made via credit/debit cards, bank transfers, or mobile money. All transactions are secure and encrypted.'
    }, {
      id: 8,
      question: "What's included in the contact unlock fee?",
      answer: "The contact unlock fee grants you access to the profile's contact information (phone number, email, WhatsApp, etc.). Any arrangement regarding companionship services and their costs is between you and the profile owner after contact has been established."
    }, {
      id: 9,
      question: 'Are there any subscription fees?',
      answer: 'EdenAffairs operates primarily on a pay-per-unlock model rather than subscriptions. However, we do offer optional membership tiers (Silver, Gold, and Diamond) that provide various benefits such as discounted unlock fees, priority support, and enhanced visibility.'
    }, {
      id: 10,
      question: 'What is your refund policy?',
      answer: "We offer refunds if you're unable to contact a profile within 48 hours of unlocking their contact information. However, we do not provide refunds based on dissatisfaction with interactions that occur after contact has been established. Please report any concerns to our support team."
    }]
  }, {
    id: 'safety',
    name: 'Safety & Privacy',
    questions: [{
      id: 11,
      question: 'How does EdenAffairs ensure user safety?',
      answer: 'We implement several safety measures including thorough profile verification, secure messaging systems, a reporting feature for suspicious activity, and a blacklist of problematic users. We also provide safety guidelines and encourage users to meet in public places initially.'
    }, {
      id: 12,
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security seriously. Your personal information is encrypted and stored securely. Contact details are only shared with users who have paid to unlock your profile. You can control what information is visible on your public profile.'
    }, {
      id: 13,
      question: 'Can I block someone from contacting me?',
      answer: 'Absolutely. You can block any user from viewing your profile or contacting you. Additionally, you can report inappropriate behavior to our support team, who will investigate and take appropriate action, potentially including removing the user from the platform.'
    }]
  }, {
    id: 'business',
    name: 'Business & Events',
    questions: [{
      id: 14,
      question: 'Can I hire a companion for a business event?',
      answer: 'Yes, many of our profiles specialize in business event companionship. They are articulate, professional, and experienced in corporate settings. When searching, you can filter profiles by those who offer business event companionship services.'
    }, {
      id: 15,
      question: 'How do I find companions for special events?',
      answer: "Use our advanced search filters to specify the type of event, date, and companion preferences. You can also post an event request in your profile, allowing suitable companions to contact you if they're available and interested."
    }]
  }];
  // Filter questions based on search term
  const filteredCategories = searchTerm ? categories.map(category => ({
    ...category,
    questions: category.questions.filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) || q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(category => category.questions.length > 0) : categories;
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about EdenAffairs, our services,
              and how everything works.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input type="text" placeholder="Search for answers..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            {filteredCategories.length > 0 ? filteredCategories.map(category => <div key={category.id} className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map(item => <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                        <button onClick={() => toggleQuestion(item.id)} className="w-full text-left p-4 flex justify-between items-center">
                          <h3 className="font-medium text-white">
                            {item.question}
                          </h3>
                          {openQuestions.includes(item.id) ? <ChevronUp size={20} className="text-amber-400" /> : <ChevronDown size={20} className="text-amber-400" />}
                        </button>
                        {openQuestions.includes(item.id) && <div className="p-4 pt-0 border-t border-slate-700">
                            <p className="text-gray-300">{item.answer}</p>
                          </div>}
                      </div>)}
                  </div>
                </div>) : <div className="text-center py-12">
                <MessageCircle size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-400 mb-4">
                  We couldn't find answers matching your search.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>}
            <div className="mt-12 bg-slate-800 rounded-xl border border-slate-700 p-6 text-center">
              <h2 className="text-xl font-semibold text-white mb-3">
                Still Have Questions?
              </h2>
              <p className="text-gray-300 mb-4">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>
              <Button variant="primary">
                <MessageCircle size={16} className="mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}