import { apiClient, ApiResponse } from './api';

// Review types
export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  profileId: string;
  profileName: string;
  profileImage: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  isHelpful: boolean;
  isReported: boolean;
  userVote?: 'like' | 'dislike' | null;
}

export interface CreateReviewRequest {
  profileId: string;
  rating: number;
  content: string;
}

export interface ReviewVoteRequest {
  reviewId: string;
  voteType: 'like' | 'dislike';
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Review Service
export class ReviewService {
  // Get all reviews with pagination and filters
  static async getReviews(params?: {
    page?: number;
    limit?: number;
    profileId?: string;
    rating?: number;
    search?: string;
    sortBy?: 'date' | 'rating' | 'likes';
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ reviews: Review[]; total: number; hasMore: boolean }>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.profileId) queryParams.append('profileId', params.profileId);
      if (params?.rating) queryParams.append('rating', params.rating.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await apiClient.get<{ reviews: Review[]; total: number; hasMore: boolean }>(
        `/reviews?${queryParams.toString()}`
      );
      
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch reviews');
    }
  }

  // Get review statistics for a profile
  static async getReviewStats(profileId: string): Promise<ApiResponse<ReviewStats>> {
    try {
      const response = await apiClient.get<ReviewStats>(`/reviews/stats/${profileId}`);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch review stats');
    }
  }

  // Create a new review
  static async createReview(data: CreateReviewRequest): Promise<ApiResponse<Review>> {
    try {
      const response = await apiClient.post<Review>('/reviews', data);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create review');
    }
  }

  // Vote on a review (like/dislike)
  static async voteOnReview(data: ReviewVoteRequest): Promise<ApiResponse<{ likes: number; dislikes: number }>> {
    try {
      const response = await apiClient.post<{ likes: number; dislikes: number }>(
        `/reviews/${data.reviewId}/vote`,
        { voteType: data.voteType }
      );
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to vote on review');
    }
  }

  // Remove vote from a review
  static async removeVote(reviewId: string): Promise<ApiResponse<{ likes: number; dislikes: number }>> {
    try {
      const response = await apiClient.delete<{ likes: number; dislikes: number }>(
        `/reviews/${reviewId}/vote`
      );
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to remove vote');
    }
  }

  // Report a review
  static async reportReview(reviewId: string, reason: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.post<{ success: boolean }>(
        `/reviews/${reviewId}/report`,
        { reason }
      );
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to report review');
    }
  }

  // Delete a review (admin or owner only)
  static async deleteReview(reviewId: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.delete<{ success: boolean }>(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete review');
    }
  }

  // Get user's reviews
  static async getUserReviews(userId: string): Promise<ApiResponse<Review[]>> {
    try {
      const response = await apiClient.get<Review[]>(`/reviews/user/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch user reviews');
    }
  }
}
