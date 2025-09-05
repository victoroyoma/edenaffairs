import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Play, Heart, Eye, Clock, Upload, Search } from 'lucide-react';
import { Button } from '../components/Button';

export function Videos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'newest', 'popular'

  // Sample video data
  const videos = [
    {
      id: 1,
      title: 'Sensual Dance Performance',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '3:45',
      views: 15420,
      likes: 892,
      uploadDate: '2024-01-10',
      uploader: 'Sofia_Lagos',
      category: 'Dance',
      isPremium: false
    },
    {
      id: 2,
      title: 'Intimate Massage Tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '8:12',
      views: 8930,
      likes: 1205,
      uploadDate: '2024-01-08',
      uploader: 'MassageQueen',
      category: 'Tutorial',
      isPremium: true
    },
    {
      id: 3,
      title: 'Elegant Seduction',
      thumbnail: 'https://images.unsplash.com/photo-1595274817330-d503e4d53bbc?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '5:30',
      views: 12650,
      likes: 756,
      uploadDate: '2024-01-05',
      uploader: 'ElegantEva',
      category: 'Art',
      isPremium: false
    },
    {
      id: 4,
      title: 'Bedroom Secrets Revealed',
      thumbnail: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '6:45',
      views: 21340,
      likes: 1890,
      uploadDate: '2024-01-03',
      uploader: 'SecretDesires',
      category: 'Educational',
      isPremium: true
    },
    {
      id: 5,
      title: 'Sultry Photo Shoot BTS',
      thumbnail: 'https://images.unsplash.com/photo-1534126416832-7ab8ca130a88?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '4:20',
      views: 9876,
      likes: 543,
      uploadDate: '2024-01-01',
      uploader: 'PhotoModel',
      category: 'Behind the Scenes',
      isPremium: false
    }
  ];

  const filteredVideos = videos.filter(video => {
    if (searchTerm && !video.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                <span className="text-gradient">Exciting Videos</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover exclusive, sensual content from our premium creators. 
                Experience passion, artistry, and intimate moments.
              </p>
              
              {/* Upload CTA */}
              <div className="mb-12">
                <Button 
                  variant="luxury" 
                  size="xl" 
                  icon={<Upload size={20} />}
                >
                  Upload Your Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-dark-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-luxury pl-10 w-full"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-luxury"
                  >
                    <option value="all">All Videos</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="free">Free Only</option>
                    <option value="premium">Premium Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="glass-dark rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-500/90 rounded-full flex items-center justify-center">
                          <Play className="text-white ml-1" size={24} fill="white" />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>

                      {/* Premium Badge */}
                      {video.isPremium && (
                        <div className="absolute top-2 left-2 bg-luxury-gold text-dark-900 text-xs font-bold px-2 py-1 rounded">
                          PREMIUM
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {video.title}
                      </h3>
                      
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>by {video.uploader}</div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {formatViews(video.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {video.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(video.uploadDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-20 bg-gradient-to-br from-primary-900/20 to-dark-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Share Your Content
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Upload your exclusive videos and earn from premium subscribers. 
                Join our community of content creators.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-primary-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Easy Upload</h3>
                  <p className="text-gray-400">Simple drag-and-drop interface for quick uploads</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-primary-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Get Views</h3>
                  <p className="text-gray-400">Reach thousands of engaged viewers</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-primary-400" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Earn Money</h3>
                  <p className="text-gray-400">Monetize your content with premium subscriptions</p>
                </div>
              </div>
              
              <Button variant="luxury" size="xl" icon={<Upload size={20} />}>
                Start Uploading
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
