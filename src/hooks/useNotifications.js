import { useState, useEffect } from 'react';
import { notificationsService } from '../backend/notificationsService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all notifications (admin only)
  const fetchAllNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getAllNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create notification (admin only)
  const createNotification = async (notificationData) => {
    setLoading(true);
    setError(null);
    try {
      const newNotification = await notificationsService.createNotification(notificationData);
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update notification (admin only)
  const updateNotification = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNotification = await notificationsService.updateNotification(id, updates);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? updatedNotification : notification
        )
      );
      return updatedNotification;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete notification (admin only)
  const deleteNotification = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await notificationsService.deleteNotification(id);
      setNotifications(prev => prev.filter(notification => notification.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle notification status (admin only)
  const toggleNotificationStatus = async (id, isActive) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNotification = await notificationsService.toggleNotificationStatus(id, isActive);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? updatedNotification : notification
        )
      );
      return updatedNotification;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    fetchAllNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    toggleNotificationStatus,
    formatTimeAgo
  };
};
