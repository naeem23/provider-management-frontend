"use client"

import React, { useEffect, useState } from 'react';
import { Bell, CheckCheck, ArrowLeft, FileText, MessageSquare, CheckCircle, XCircle, AlertTriangle, User } from 'lucide-react';
import { Notification } from '@/types/dashboard';
import { fetchWithAuth } from '@/lib/auth';
import { formatTimestamp } from '@/lib/utils';


const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setIsFetching(true)

    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/notifications`)

        if (response.ok) {
            const data = await response.json()
            setNotifications(data)
        }
    } catch (error) {
        console.error('Failed to fetch notifications:', error)
    } finally {
        setIsFetching(false)
    }
  }
  
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAllAsRead = async () => {
    try {
        const response = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/notifications/mark-all-read/`,
            {
                method: "POST",
            }
        )

        if (response.ok) {
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
        }
    } catch (error) {
        console.error('Failed to mark notifications as read:', error)
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, is_read: true } : n
    ));

    // Navigate to related page based on notification type
    // router.push(`/related-page/${notification.relatedId}`)
    console.log('Navigate to:', notification.entity_id);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={goBack}
            className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-3 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <CheckCheck className="w-5 h-5 mr-2" />
                Mark All as Read
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`rounded-lg border-2 p-5 transition-all cursor-pointer hover:shadow-md ${!notification.is_read ? "bg-gray-50 border-red-300" : "bg-white border-gray-300"} ${!notification.is_read ? 'shadow-sm' : ''}`}
              >
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <Bell className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-base font-semibold ${
                        !notification.is_read ? 'text-gray-900' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                        {formatTimestamp(notification.created_at)}
                      </span>
                    </div>
                    
                    <p className={`text-sm mt-2 leading-relaxed ${
                      !notification.is_read ? 'text-gray-600' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>

                    {notification.entity_id && (
                      <div className="mt-3 flex items-center">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {notification.entity_type}
                        </span>
                        <span className="ml-3 text-xs text-gray-500">
                          Click to view details →
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {notifications.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;