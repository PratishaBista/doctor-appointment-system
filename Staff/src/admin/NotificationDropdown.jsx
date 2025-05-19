import { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const NotificationDropdown = () => {
  const { backendUrl, admin_token } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/notifications/admin`, {
        headers: { admin_token },
        params: {
          userId: userData?._id,
          userType: 'admin',
          limit: 20,
          page: 1,
        }
      });
      console.log("API Response:", data);

      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error(error.response?.data?.message || "Failed to fetch notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/notifications/admin/mark-read`,
        { notificationId },
        { headers: { admin_token } }
      );

      if (data.success) {
        // Update local state
        setNotifications(prev => prev.map(n =>
          n._id === notificationId ? { ...n, isRead: true } : n
        ));
        setUnreadCount(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/notifications/admin/mark-all-read`,
        {},
        { headers: { admin_token } }
      );

      if (data.success) {
        // Update all notifications to read
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  useEffect(() => {
    if (isOpen && admin_token) {
      fetchNotifications();
    }
  }, [isOpen, admin_token]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-gray-500 relative focus:outline-none"
        aria-label="Notifications"
      >
        <div className="relative">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800"
              disabled={unreadCount === 0}
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <div className={`h-2 w-2 rounded-full ${!notification.isRead ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center text-xs text-gray-400">
                          <span>{moment(notification.createdAt).fromNow()}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;