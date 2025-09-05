import { useState } from 'react';
import { Bell, X, User, CreditCard, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from './Button';
interface Notification {
  id: number;
  type: 'payment' | 'profile' | 'system' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}
interface AdminNotificationCenterProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: number) => void;
  onClearAll: () => void;
}
export function AdminNotificationCenter({
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClearAll
}: AdminNotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard size={16} className="text-amber-400" />;
      case 'profile':
        return <User size={16} className="text-blue-400" />;
      case 'system':
        return <CheckCircle size={16} className="text-emerald-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-rose-400" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };
  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-slate-700/50';
    switch (type) {
      case 'payment':
        return 'bg-amber-500/10';
      case 'profile':
        return 'bg-blue-500/10';
      case 'system':
        return 'bg-emerald-500/10';
      case 'warning':
        return 'bg-rose-500/10';
      default:
        return 'bg-slate-700';
    }
  };
  return <div className="relative">
      <button className="relative p-2 text-gray-400 hover:text-white rounded-md hover:bg-slate-700 transition" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} />
        {unreadCount > 0 && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>}
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-50">
          <div className="flex justify-between items-center p-3 border-b border-slate-700">
            <h3 className="font-medium text-white flex items-center">
              <Bell size={16} className="mr-2 text-amber-400" />
              Notifications
            </h3>
            <div className="flex gap-2">
              {unreadCount > 0 && <button onClick={onMarkAllAsRead} className="text-xs text-amber-400 hover:text-amber-300">
                  Mark all as read
                </button>}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? <div className="divide-y divide-slate-700">
                {notifications.map(notification => <div key={notification.id} className={`p-3 ${getNotificationBgColor(notification.type, notification.read)}`} onClick={() => !notification.read && onMarkAsRead(notification.id)}>
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="p-6 text-center text-gray-400">
                <Bell size={24} className="mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>}
          </div>
          {notifications.length > 0 && <div className="p-3 border-t border-slate-700 text-center">
              <Button variant="outline" size="sm" onClick={onClearAll}>
                Clear All Notifications
              </Button>
            </div>}
        </div>}
    </div>;
}