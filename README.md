# Notifications System

This repository contains the complete implementation and system design for a comprehensive Notifications Platform, developed across 7 distinct stages.

## Overview of Stages

### Stage 1: REST API & System Design
- Defined the core REST API contract (`GET /notifications`, `POST /notifications`, `PUT /notifications/{id}/read`).
- Designed JSON request/response schemas.
- Proposed WebSockets as the mechanism for delivering real-time notifications to connected clients.
- Detailed in `notification_system_design.md`.

### Stage 2: Database & Storage Strategy
- Selected a persistent storage solution (e.g., PostgreSQL for structured consistency or MongoDB for high write throughput).
- Designed the DB schema and analyzed potential scaling issues as data volume increases.
- Detailed in `notification_system_design.md`.

### Stage 3: Query Optimization
- Analyzed and optimized a slow-performing SQL query used to fetch unread notifications.
- Evaluated the tradeoffs of adding database indexes.
- Wrote optimized queries to fetch specific types of notifications within a time window.
- Detailed in `notification_system_design.md`.

### Stage 4: Performance & Caching
- Addressed performance bottlenecks caused by fetching notifications on every page load.
- Proposed caching layers (e.g., Redis) and pagination/cursor-based fetching strategies.
- Detailed in `notification_system_design.md`.

### Stage 5: Reliable Delivery at Scale
- Refactored pseudo-code for a "Notify All" feature that previously failed midway.
- Separated database inserts from email API calls using asynchronous message queues (e.g., RabbitMQ, Kafka) to ensure fast, reliable, and fault-tolerant delivery to 50,000+ users.
- Detailed in `notification_system_design.md`.

### Stage 6: Priority Inbox (Backend)
- Implemented logic to calculate a `priority` score based on a combination of notification weight (`Placement` > `Result` > `Event`) and recency.
- Created an Express server (Backend-For-Frontend) in `notification_app_be` to sort and serve the top 'n' most important notifications efficiently.
- Token generation and external API authentication dynamically handles token expiry.

### Stage 7: Frontend Application
A responsive React/Vite application built with Material UI to display notifications to users.
- **All Notifications**: View all incoming notifications.
- **Priority Inbox**: Filter top N priority notifications based on type and limit.
- **Read/Unread Status**: Distinct visual states for new vs. already viewed notifications, tracked locally.
- **Local Proxy Integration**: Communicates seamlessly with the local backend server.

---

## Screenshots

### All Notifications
![All Notifications View](./screenshots/Screenshot%202026-06-08%20132228.png)

### Priority Inbox
![Priority Notifications View](./screenshots/Screenshot%202026-06-08%20132239.png)

---

## How to Run the Application

The application is split into two parts: the backend proxy server and the React frontend.

### 1. Start the Backend
```bash
cd notification_app_be
npm install
npm start
```
*The backend server will run on `http://localhost:5000`.*

### 2. Start the Frontend
In a new terminal window:
```bash
cd notification_app_fe
npm install
npm run dev
```
*The frontend application will run exclusively on `http://localhost:3000`.*