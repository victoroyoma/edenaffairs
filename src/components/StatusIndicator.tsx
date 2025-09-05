import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';
import { onlineStatusService, OnlineStatus, UserStatus } from '../services/onlineStatus';

interface StatusIndicatorProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function StatusIndicator({ userId, size = 'md', showText = false, className = '' }: StatusIndicatorProps) {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    // Get initial status
    const status = onlineStatusService.getUserStatus(userId);
    setUserStatus(status);

    // Subscribe to status updates
    const unsubscribe = onlineStatusService.subscribeToStatusUpdates(userId, (updatedStatus) => {
      setUserStatus(updatedStatus);
    });

    return unsubscribe;
  }, [userId]);

  if (!userStatus) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'md':
        return 'w-3 h-3';
      case 'lg':
        return 'w-4 h-4';
      default:
        return 'w-3 h-3';
    }
  };

  const getTextSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const statusColor = onlineStatusService.getStatusColor(userStatus.status);
  const statusText = onlineStatusService.getStatusText(userStatus.status, userStatus.lastSeen);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="relative">
        <Circle 
          className={`${getSizeClasses()} ${statusColor} border border-white/20 rounded-full`}
          fill="currentColor"
        />
        {userStatus.status === 'online' && (
          <div className={`absolute inset-0 ${statusColor} rounded-full animate-ping opacity-75`} />
        )}
      </div>
      {showText && (
        <span className={`${getTextSizeClass()} text-gray-300 font-medium`}>
          {statusText}
        </span>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  userId: string;
  variant?: 'default' | 'compact';
  className?: string;
}

export function StatusBadge({ userId, variant = 'default', className = '' }: StatusBadgeProps) {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    const status = onlineStatusService.getUserStatus(userId);
    setUserStatus(status);

    const unsubscribe = onlineStatusService.subscribeToStatusUpdates(userId, (updatedStatus) => {
      setUserStatus(updatedStatus);
    });

    return unsubscribe;
  }, [userId]);

  if (!userStatus) return null;

  const statusText = onlineStatusService.getStatusText(userStatus.status, userStatus.lastSeen);
  const statusColor = onlineStatusService.getStatusColor(userStatus.status);

  const getStatusBgColor = (status: OnlineStatus) => {
    switch (status) {
      case 'online':
        return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'away':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'offline':
        return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border backdrop-blur-sm ${getStatusBgColor(userStatus.status)} ${className}`}>
        <Circle 
          className={`w-2 h-2 ${statusColor}`}
          fill="currentColor"
        />
        <span className="text-xs font-medium">
          {userStatus.status === 'online' ? 'Online' : userStatus.status === 'away' ? 'Away' : 'Offline'}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-sm ${getStatusBgColor(userStatus.status)} ${className}`}>
      <div className="relative">
        <Circle 
          className={`w-3 h-3 ${statusColor}`}
          fill="currentColor"
        />
        {userStatus.status === 'online' && (
          <div className={`absolute inset-0 ${statusColor} rounded-full animate-ping opacity-75`} />
        )}
      </div>
      <span className="text-sm font-medium">
        {statusText}
      </span>
    </div>
  );
}
