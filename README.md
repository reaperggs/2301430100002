# Affordmed Notifications System

## Stage 7 Implementation
A responsive React/Next application has been developed to display notifications. 

### Features:
- **All Notifications**: View all notifications delivered from the backend.
- **Priority Inbox**: Filter top N priority notifications based on type and limit.
- **Read/Unread Status**: Easily distinguish between new and already viewed notifications.
- **Backend API Integration**: Connects to the local Express backend serving the notifications.

### Screenshots

#### All Notifications
![All Notifications View](./screenshots/all-notifications.png)

#### Priority Inbox
![Priority Notifications View](./screenshots/priority-notifications.png)

## Backend Details
- **Token Generation**: Dynamic fetching of authentication token successfully handles token expiry.
- **Logging Middleware**: Fix applied for the `invalid authorization token` issue; logging to the external evaluation service works as expected.
- **BFF Server**: The backend Express server runs on port 5000 and serves as a Backend-For-Frontend proxy.

## How to Run
1. **Backend**: `cd notification_app_be && npm start` (Runs on `http://localhost:5000`)
2. **Frontend**: `cd notification_app_fe && npm run dev` (Runs exclusively on `http://localhost:3000`)