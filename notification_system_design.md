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

# Stage 2 - Database Design

## Database Choice

PostgreSQL is chosen for the notification system.

Reasons:

- ACID compliance ensures reliable data storage.
- Strong support for indexing.
- Handles large datasets efficiently.
- Supports complex queries.
- Scales well for thousands of students and millions of notifications.

### Students

| Column     |     Type              |
|------------|----------             |
| id         | BIGSERIAL PRIMARY KEY |
| name       | VARCHAR(100)          |
| email      | VARCHAR(255) UNIQUE   |
| created_at | TIMESTAMP             |

SQL :
`CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

### Notifications

| Column | Type |
|----------|----------|
| id | BIGSERIAL PRIMARY KEY |
| student_id | BIGINT |
| notification_type | VARCHAR(50) |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id)
    REFERENCES students(id)
);


## Relationship

One Student can have many Notifications.

Student (1) -----< Notifications (Many)

#### Example data
### Sample Student

ID: 1
Name: Aakash Chauhan
Email: aakash@college.edu

### Sample Notification

ID: 101
Student ID: 1
Type: Placement
Message: Microsoft hiring drive
Read: False

Unread notifications:

SELECT *
FROM notifications
WHERE student_id = 1
AND is_read = false;

Latest notifications:

SELECT *
FROM notifications
WHERE student_id = 1
ORDER BY created_at DESC
LIMIT 20;

Mark notification as read:

UPDATE notifications
SET is_read = true
WHERE id = 101;

## Scalability

Indexes will be added on:

- student_id
- is_read
- created_at

This enables fast retrieval of notifications even when the system stores millions of records.