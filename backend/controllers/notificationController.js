import notificationModel from "../models/notificationModel.js";

const createNotification = async (req, res) => {
  try {
    const {
      userId,
      userType,
      title,
      message,
      relatedEntity,
      relatedEntityId,
      priority,
      actionUrl,
      metadata,
    } = req.body;

    const newNotification = new notificationModel({
      userId,
      userType,
      title,
      message,
      relatedEntity,
      relatedEntityId,
      priority: priority || "medium",
      actionUrl,
      metadata,
    });

    await newNotification.save();

    res.json({
      success: true,
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const { userId, userType, limit = 20, page = 1 } = req.query;
    if (!userId || !userType) {
      return res.status(400).json({
        success: false,
         message: "User ID and type are required as query parameters"
      });
    }

    const skip = (page - 1) * limit;

   const notifications = await notificationModel
      .find({ 
        userId: userId, 
        userType: userType 
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

     const total = await notificationModel.countDocuments({ 
      userId: userId, 
      userType: userType 
    });
    const unreadCount = await notificationModel.countDocuments({ 
      userId: userId, 
      userType: userType,
      isRead: false 
    });

    res.json({
      success: true,
      notifications,
      total,
      unreadCount,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    await notificationModel.updateMany(
      { userId, userType, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const notification = await notificationModel.findByIdAndDelete(
      notificationId
    );

    if (!notification) {
      return res.json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get unread notification count
const getUnreadNotificationCount = async (req, res) => {
  try {
    const { userId, userType } = req.query;

    const unreadCount = await notificationModel.countDocuments({
      userId,
      userType,
      isRead: false,
    });

    res.json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadNotificationCount,
};
