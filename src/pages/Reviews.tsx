import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Star, ThumbsUp, ThumbsDown, Filter, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { Review, ReviewStats } from '../services/reviews';
import { useAuth } from '../contexts/AuthContext';

export function Reviews() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'likes'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userVotes, setUserVotes] = useState<Record<string, 'like' | 'dislike'>>({});

  // Sample data for demo
  const sampleReviews: Review[] = [
    {
      id: '1',
      reviewerId: 'user1',
      reviewerName: 'David',
      profileId: 'profile1',
      profileName: 'Sophia',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: 'Absolutely amazing experience. Sophia was punctual, looked exactly like her photos, and was a delightful companion for the evening event. Very professional and charming.',
      date: '2024-01-15',
      likes: 24,
      dislikes: 1,
      isHelpful: true,
      isReported: false,
      userVote: null
    },
    {
      id: '2',
      reviewerId: 'user2',
      reviewerName: 'Michelle',
      profileId: 'profile2',
      profileName: 'Alexander',
      profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      rating: 4,
      content: 'Alexander was a great companion for my corporate dinner. Well-dressed, articulate, and made a good impression on my colleagues.',
      date: '2024-01-10',
      likes: 18,
      dislikes: 2,
      isHelpful: true,
      isReported: false,
      userVote: null
    },
    {
      id: '3',
      reviewerId: 'user3',
      reviewerName: 'Sarah',
      profileId: 'profile3',
      profileName: 'James',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: "James was the perfect gentleman escort for my friend's wedding. He was attentive, charming, and a great dancer!",
      date: '2024-01-08',
      likes: 42,
      dislikes: 0,
      isHelpful: true,
      isReported: false,
      userVote: null
    }
  ];

  const sampleStats: ReviewStats = {
    totalReviews: 247,
    averageRating: 4.2,
    ratingDistribution: {
      5: 132,
      4: 78,
      3: 24,
      2: 8,
      1: 5
    }
  };

  useEffect(() => {
    loadReviews();
    setStats(sampleStats);
  }, [searchTerm, filter, sortBy, sortOrder]);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      // For demo, use sample data
      setTimeout(() => {
        setReviews(sampleReviews);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setIsLoading(false);
    }
  };

  const handleVote = async (reviewId: string, voteType: 'like' | 'dislike') => {
    if (!user) {
      return;
    }

    try {
      const currentVote = userVotes[reviewId];
      
      if (currentVote === voteType) {
        // Remove vote
        setUserVotes(prev => {
          const updated = { ...prev };
          delete updated[reviewId];
          return updated;
        });
      } else {
        // Add or change vote
        setUserVotes(prev => ({
          ...prev,
          [reviewId]: voteType
        }));
      }
      
      // Update review counts
      setReviews(prev => prev.map(review => {
        if (review.id === reviewId) {
          const currentVote = userVotes[reviewId];
          let newLikes = review.likes;
          let newDislikes = review.dislikes;
          
          // Remove previous vote effect
          if (currentVote === 'like') newLikes--;
          if (currentVote === 'dislike') newDislikes--;
          
          // Add new vote effect (unless removing)
          if (currentVote !== voteType) {
            if (voteType === 'like') newLikes++;
            if (voteType === 'dislike') newDislikes++;
          }
          
          return {
            ...review,
            likes: Math.max(0, newLikes),
            dislikes: Math.max(0, newDislikes)
          };
        }
        return review;
      }));
      
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.profileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filter === 'positive') {
      filtered = filtered.filter(review => review.rating >= 4);
    } else if (filter === 'negative') {
      filtered = filtered.filter(review => review.rating <= 3);
    } else if (filter === 'popular') {
      filtered = filtered.filter(review => review.likes > 10);
    } else if (filter === 'recent') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(review => new Date(review.date) > weekAgo);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        case 'likes':
          valueA = a.likes;
          valueB = b.likes;
          break;
        case 'date':
        default:
          valueA = new Date(a.date).getTime();
          valueB = new Date(b.date).getTime();
          break;
      }
      
      return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    });
    
    return filtered;
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-500'} 
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredReviews = getFilteredReviews();

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Client Reviews
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Read honest feedback from verified clients about their experiences
              with our profiles.
            </p>
            
            {/* Statistics Display */}
            {stats && (
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <div className="text-3xl font-bold text-amber-400 mb-2">
                    {stats.totalReviews}
                  </div>
                  <div className="text-gray-300 text-sm">Total Reviews</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-amber-400 mr-2">
                      {stats.averageRating.toFixed(1)}
                    </span>
                    <div className="flex">
                      {renderStars(Math.round(stats.averageRating))}
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">Average Rating</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <div className="space-y-1">
                    {Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 w-3">{rating}</span>
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-amber-400 h-2 rounded-full transition-all"
                            style={{ width: `${(count / stats.totalReviews) * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs w-8">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search and Filter Controls */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search reviews..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" 
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
                    <Filter size={18} className="text-gray-400" />
                    <select 
                      value={filter} 
                      onChange={(e) => setFilter(e.target.value)} 
                      className="bg-transparent text-white focus:outline-none"
                    >
                      <option value="all">All Reviews</option>
                      <option value="positive">Positive (4-5 ★)</option>
                      <option value="negative">Critical (1-3 ★)</option>
                      <option value="recent">Recent (Last Week)</option>
                      <option value="popular">Popular (10+ Likes)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
                    <TrendingUp size={18} className="text-gray-400" />
                    <select 
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [newSortBy, newSortOrder] = e.target.value.split('-') as ['date' | 'rating' | 'likes', 'asc' | 'desc'];
                        setSortBy(newSortBy);
                        setSortOrder(newSortOrder);
                      }}
                      className="bg-transparent text-white focus:outline-none"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="rating-desc">Highest Rated</option>
                      <option value="rating-asc">Lowest Rated</option>
                      <option value="likes-desc">Most Liked</option>
                      <option value="likes-asc">Least Liked</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <div className="animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-1/4 mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-slate-700 rounded"></div>
                            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredReviews.length > 0 ? (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-600">
                          <img 
                            src={review.profileImage} 
                            alt={review.profileName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                Review for {review.profileName}
                              </h3>
                              <p className="text-sm text-gray-400">
                                by {review.reviewerName} • {formatDate(review.date)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-sm font-medium text-amber-400">
                                {review.rating}/5
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {review.content}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                            <div className="flex items-center gap-4">
                              <button 
                                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                                  userVotes[review.id] === 'like' 
                                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' 
                                    : 'text-gray-400 hover:text-amber-400 hover:bg-amber-400/10'
                                }`}
                                onClick={() => handleVote(review.id, 'like')}
                                disabled={!user}
                              >
                                <ThumbsUp size={16} />
                                <span className="font-medium">{review.likes}</span>
                              </button>
                              <button 
                                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                                  userVotes[review.id] === 'dislike' 
                                    ? 'bg-rose-400/20 text-rose-400 border border-rose-400/30' 
                                    : 'text-gray-400 hover:text-rose-400 hover:bg-rose-400/10'
                                }`}
                                onClick={() => handleVote(review.id, 'dislike')}
                                disabled={!user}
                              >
                                <ThumbsDown size={16} />
                                <span className="font-medium">{review.dislikes}</span>
                              </button>
                            </div>
                            <button className="text-amber-400 text-sm hover:underline px-2 py-1 rounded">
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Reviews Found
                </h3>
                <p className="text-gray-400">
                  No reviews match your search criteria.
                </p>
              </div>
            )}
            
            <div className="mt-10 text-center">
              <p className="text-gray-300 mb-4">
                Have you used our service recently?
              </p>
              <Button variant="primary">
                <Star size={16} className="mr-2" />
                Write a Review
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}