export type OnlineStatus = 'online' | 'away' | 'offline';

export interface UserStatus {
  userId: string;
  status: OnlineStatus;
  lastSeen: Date;
  lastActivity: Date;
}

export interface StatusUpdate {
  userId: string;
  status: OnlineStatus;
  timestamp: Date;
}

class OnlineStatusService {
  private statusMap = new Map<string, UserStatus>();
  private statusListeners = new Map<string, Set<(status: UserStatus) => void>>();
  private awayTimeout = 5 * 60 * 1000; // 5 minutes
  private offlineTimeout = 15 * 60 * 1000; // 15 minutes

  constructor() {
    // Simulate real-time status updates
    this.initializeMockStatuses();
    this.startStatusMonitoring();
  }

  private initializeMockStatuses() {
    // Mock data for demonstration - in real app this would come from backend
    const mockStatuses: UserStatus[] = [
      {
        userId: '1',
        status: 'online',
        lastSeen: new Date(),
        lastActivity: new Date()
      },
      {
        userId: '2',
        status: 'away',
        lastSeen: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
        lastActivity: new Date(Date.now() - 7 * 60 * 1000)
      },
      {
        userId: '3',
        status: 'offline',
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        userId: '4',
        status: 'online',
        lastSeen: new Date(),
        lastActivity: new Date()
      },
      {
        userId: '5',
        status: 'away',
        lastSeen: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
        lastActivity: new Date(Date.now() - 12 * 60 * 1000)
      },
      {
        userId: '6',
        status: 'online',
        lastSeen: new Date(),
        lastActivity: new Date()
      }
    ];

    mockStatuses.forEach(status => {
      this.statusMap.set(status.userId, status);
    });
  }

  private startStatusMonitoring() {
    // Simulate random status changes for demo
    setInterval(() => {
      this.statusMap.forEach((_, userId) => {
        // Randomly update status for demo purposes
        if (Math.random() < 0.1) { // 10% chance every interval
          const statuses: OnlineStatus[] = ['online', 'away', 'offline'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          this.updateUserStatus(userId, newStatus);
        }
      });
    }, 30000); // Check every 30 seconds
  }

  updateUserStatus(userId: string, status: OnlineStatus): void {
    const currentTime = new Date();
    const currentStatus = this.statusMap.get(userId) || {
      userId,
      status: 'offline',
      lastSeen: currentTime,
      lastActivity: currentTime
    };

    const updatedStatus: UserStatus = {
      ...currentStatus,
      status,
      lastSeen: status === 'online' ? currentTime : currentStatus.lastSeen,
      lastActivity: status === 'online' ? currentTime : currentStatus.lastActivity
    };

    this.statusMap.set(userId, updatedStatus);
    this.notifyStatusListeners(userId, updatedStatus);
  }

  getUserStatus(userId: string): UserStatus | null {
    return this.statusMap.get(userId) || null;
  }

  subscribeToStatusUpdates(userId: string, callback: (status: UserStatus) => void): () => void {
    if (!this.statusListeners.has(userId)) {
      this.statusListeners.set(userId, new Set());
    }
    
    this.statusListeners.get(userId)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.statusListeners.get(userId);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.statusListeners.delete(userId);
        }
      }
    };
  }

  private notifyStatusListeners(userId: string, status: UserStatus): void {
    const listeners = this.statusListeners.get(userId);
    if (listeners) {
      listeners.forEach(callback => callback(status));
    }
  }

  getStatusColor(status: OnlineStatus): string {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  }

  getStatusText(status: OnlineStatus, lastSeen?: Date): string {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        if (lastSeen) {
          return this.getLastSeenText(lastSeen);
        }
        return 'Offline';
      default:
        return 'Unknown';
    }
  }

  private getLastSeenText(lastSeen: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return lastSeen.toLocaleDateString();
    }
  }

  // Get all users with a specific status
  getUsersByStatus(status: OnlineStatus): string[] {
    const users: string[] = [];
    this.statusMap.forEach((userStatus, userId) => {
      if (userStatus.status === status) {
        users.push(userId);
      }
    });
    return users;
  }

  // Get online count for statistics
  getOnlineCount(): number {
    return this.getUsersByStatus('online').length;
  }

  // Activity tracking methods
  recordActivity(userId: string): void {
    const currentStatus = this.statusMap.get(userId);
    if (currentStatus) {
      currentStatus.lastActivity = new Date();
      if (currentStatus.status === 'away' || currentStatus.status === 'offline') {
        this.updateUserStatus(userId, 'online');
      }
    }
  }

  // Register a new user with initial status
  registerUser(userId: string, initialStatus: OnlineStatus = 'online'): void {
    if (!this.statusMap.has(userId)) {
      const currentTime = new Date();
      const userStatus: UserStatus = {
        userId,
        status: initialStatus,
        lastSeen: currentTime,
        lastActivity: currentTime
      };
      this.statusMap.set(userId, userStatus);
      this.notifyStatusListeners(userId, userStatus);
    }
  }

  // Get users who have been active recently (within last hour)
  getRecentlyActiveUsers(): string[] {
    const now = new Date();
    const oneHourAgo = now.getTime() - (60 * 60 * 1000);
    const activeUsers: string[] = [];
    
    this.statusMap.forEach((status, userId) => {
      if (status.lastActivity.getTime() > oneHourAgo) {
        activeUsers.push(userId);
      }
    });
    
    return activeUsers;
  }

  // Get status summary for analytics
  getStatusSummary(): { online: number; away: number; offline: number; total: number } {
    const summary = { online: 0, away: 0, offline: 0, total: 0 };
    
    this.statusMap.forEach((status) => {
      summary[status.status]++;
      summary.total++;
    });
    
    return summary;
  }

  // Batch update multiple users (useful for admin operations)
  batchUpdateStatus(userIds: string[], status: OnlineStatus): void {
    userIds.forEach(userId => {
      this.updateUserStatus(userId, status);
    });
  }

  // Remove user from status tracking (when they delete account, etc.)
  removeUser(userId: string): void {
    this.statusMap.delete(userId);
    this.statusListeners.delete(userId);
  }

  // Check if user should be marked as away or offline
  checkInactiveUsers(): void {
    const now = new Date();
    this.statusMap.forEach((status, userId) => {
      const timeSinceActivity = now.getTime() - status.lastActivity.getTime();
      
      if (status.status === 'online' && timeSinceActivity > this.awayTimeout) {
        this.updateUserStatus(userId, 'away');
      } else if (status.status === 'away' && timeSinceActivity > this.offlineTimeout) {
        this.updateUserStatus(userId, 'offline');
      }
    });
  }
}

export const onlineStatusService = new OnlineStatusService();
