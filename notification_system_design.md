# Notification System Design

## Stage 1 - API Design

### Get All Notifications

GET /notifications

Response

{
  "notifications": [
    {
      "id": 1,
      "type": "Placement",
      "message": "Microsoft hiring drive",
      "isRead": false,
      "createdAt": "2026-06-08T10:00:00Z"
    }
  ]
}

### Get Notification By ID

GET /notifications/{id}

### Create Notification

POST /notifications

Request

{
  "studentId": 1,
  "type": "Placement",
  "message": "Microsoft hiring drive"
}

### Mark Notification As Read

PATCH /notifications/{id}/read

### Mark All Notifications Read

PATCH /notifications/read-all

### Delete Notification

DELETE /notifications/{id}

Notifications will be delivered using WebSockets.

Workflow:

1. User logs in.
2. Frontend establishes WebSocket connection.
3. Backend pushes notifications instantly.
4. Frontend updates notification list without refresh.

Advantages:
- Low latency
- Reduced polling
- Better scalability