import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Clock, Users, Filter, Search, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
export function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('upcoming'); // 'all', 'upcoming', 'past'
  // Sample events data
  const events = [{
    id: 1,
    title: 'Exclusive Yacht Party',
    date: '2023-12-30',
    time: '8:00 PM - 2:00 AM',
    location: 'Lagos Harbor Marina',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: "Join us for an unforgettable night on the water with Lagos' most sophisticated singles. Enjoy premium drinks, gourmet food, and dancing under the stars on a luxury yacht.",
    attendees: 48,
    capacity: 60,
    price: '₦25,000',
    vipPrice: '₦50,000',
    categories: ['Nightlife', 'Luxury'],
    isPast: false
  }, {
    id: 2,
    title: 'Cocktails & Connections',
    date: '2023-12-15',
    time: '7:00 PM - 11:00 PM',
    location: 'Sky Lounge, Victoria Island',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: "An elegant evening of cocktails and conversation at Lagos' premier rooftop lounge. Meet interesting singles in a relaxed, upscale environment with breathtaking city views.",
    attendees: 35,
    capacity: 40,
    price: '₦15,000',
    vipPrice: '₦30,000',
    categories: ['Social', 'Drinks'],
    isPast: false
  }, {
    id: 3,
    title: 'Beach Bonfire Soirée',
    date: '2024-01-20',
    time: '6:00 PM - 12:00 AM',
    location: 'Elegushi Private Beach',
    image: 'https://images.unsplash.com/photo-1414124488080-0188dcbb8834?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Experience a magical evening on the beach with bonfire, BBQ, live music, and great company. A perfect setting to make meaningful connections under the stars.',
    attendees: 20,
    capacity: 50,
    price: '₦20,000',
    vipPrice: '₦40,000',
    categories: ['Outdoor', 'Social'],
    isPast: false
  }, {
    id: 4,
    title: 'VIP Dinner & Wine Tasting',
    date: '2023-11-25',
    time: '7:00 PM - 10:00 PM',
    location: 'La Veranda Restaurant, Abuja',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'An intimate evening of fine dining and premium wine tasting. Connect with other sophisticated singles while enjoying a five-course gourmet meal paired with exquisite wines.',
    attendees: 30,
    capacity: 30,
    price: '₦35,000',
    vipPrice: null,
    categories: ['Dining', 'Luxury'],
    isPast: true
  }, {
    id: 5,
    title: 'Pool Party Extravaganza',
    date: '2024-02-14',
    time: '2:00 PM - 10:00 PM',
    location: 'Bluewater Resort, Lagos',
    image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: "Valentine's special pool party with DJ, drinks, and delicious food. Meet new people in a fun, relaxed atmosphere at one of Lagos' most exclusive resorts.",
    attendees: 15,
    capacity: 80,
    price: '₦15,000',
    vipPrice: '₦30,000',
    categories: ['Party', 'Holiday'],
    isPast: false
  }, {
    id: 6,
    title: 'Art Gallery Night',
    date: '2023-11-10',
    time: '6:00 PM - 9:00 PM',
    location: 'Contemporary Art Gallery, Lekki',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'An evening of culture, art appreciation, and stimulating conversation. Meet like-minded singles while enjoying fine art, champagne, and canapés.',
    attendees: 25,
    capacity: 30,
    price: '₦12,000',
    vipPrice: null,
    categories: ['Culture', 'Social'],
    isPast: true
  }];
  const filteredEvents = events.filter(event => {
    // Apply search filter
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && !event.location.toLowerCase().includes(searchTerm.toLowerCase()) && !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Apply date filter
    if (filter === 'upcoming' && event.isPast) return false;
    if (filter === 'past' && !event.isPast) return false;
    return true;
  });
  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.isPast && !b.isPast) return 1;
    if (!a.isPast && b.isPast) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Exclusive Events
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover premium social gatherings and exclusive parties where you
              can meet like-minded individuals in elegant settings.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
                  <Filter size={18} className="text-gray-400" />
                  <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent text-white focus:outline-none">
                    <option value="all">All Events</option>
                    <option value="upcoming">Upcoming Events</option>
                    <option value="past">Past Events</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            {sortedEvents.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map(event => <div key={event.id} className={`bg-slate-800 rounded-xl border ${event.isPast ? 'border-slate-700' : 'border-slate-600'} overflow-hidden hover:border-amber-400 transition duration-300`}>
                    <div className="relative aspect-[16/9]">
                      <img src={event.image} alt={event.title} className={`w-full h-full object-cover ${event.isPast ? 'filter grayscale' : ''}`} />
                      {event.isPast && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-slate-800/80 text-white px-4 py-2 rounded-md font-medium">
                            Past Event
                          </span>
                        </div>}
                      <div className="absolute top-3 right-3 flex gap-2">
                        {event.categories.map((category, index) => <span key={index} className="bg-slate-900/80 text-white text-xs px-2 py-1 rounded-full">
                            {category}
                          </span>)}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-gray-400 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-400 mb-2">
                        <Clock size={16} className="mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-400 mb-4">
                        <MapPin size={16} className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-400">
                          <Users size={16} className="mr-2" />
                          <span>
                            {event.attendees}/{event.capacity} attending
                          </span>
                        </div>
                        <div className="text-amber-400 font-medium">
                          {event.price}
                        </div>
                      </div>
                      {!event.isPast && <Button variant="primary" fullWidth>
                          Reserve Your Spot
                        </Button>}
                      {event.isPast && <Button variant="outline" fullWidth>
                          View Event Details
                        </Button>}
                    </div>
                  </div>)}
              </div> : <div className="text-center py-12">
                <Calendar size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Events Found
                </h3>
                <p className="text-gray-400">
                  No events match your search criteria.
                </p>
              </div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}