import notificationModel from "../models/notificationModel.js";

// This function creates a new notification in the database
// It takes the request and response objects as parameters
// The request body should contain the userId, userType, title, message, relatedEntity, relatedEntityId, and isImportant (optional)
// The function saves the new notification to the database and sends a success response
const createNotification = async (req, res) => {
  try {
    const { userId, userType, title, message, relatedEntity, relatedEntityId, isImportant } = req.body;
    
    const newNotification = new notificationModel({
      userId,
      userType,
      title,
      message,
      relatedEntity,
      relatedEntityId,
      isImportant: isImportant || false
    });
    
    await newNotification.save();
    
    res.json({ success: true, message: "Notification created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// This function retrieves the count of unread notifications for a specific user
// It takes the request and response objects as parameters
// The request query should contain the userId and userType
// The function retrieves the count of unread notifications from the database and sends a success response
const getUnreadNotificationCount = async (req, res) => {
  try {
    const { userId, userType } = req.query;
    
    const count = await notificationModel.countDocuments({
      userId,
      userType,
      isRead: false
    });
    
    res.json({ success: true, count });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { createNotification, getUnreadNotificationCount };