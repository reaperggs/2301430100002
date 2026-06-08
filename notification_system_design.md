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


## Stage 3 - Query Optimization

### Given Query


SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;


### Is the Query Accurate?

The query is functionally correct because it retrieves all unread notifications for a specific student. However, it is not optimal for a production system handling 50,000 students and 5,000,000 notifications.

Issues with the query:

1. Uses SELECT *, which retrieves unnecessary columns and increases network and memory usage.
2. Returns all unread notifications without pagination.
3. Sorting can become expensive on large datasets.
4. Displays the oldest unread notifications first (ASC), whereas users generally expect the most recent notifications first.

A more efficient query would be:

sql
SELECT id, notificationType, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC
LIMIT 50;


### Why Is It Slow?

With millions of notifications stored in the database, the query may perform a full table scan if appropriate indexes are not available.

The database must:

1. Scan a large number of rows.
2. Filter records matching studentID and isRead.
3. Sort the filtered results by createdAt.
4. Return the matching rows.

Without indexing, the time complexity is approximately:

O(N)

where N is the total number of notifications.

As the number of notifications grows, query performance degrades significantly.

### Optimization Strategy

Create a composite index that supports both filtering and sorting:


CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt);


Benefits:

* Faster filtering by studentID.
* Faster filtering by isRead.
* Faster sorting by createdAt.
* Reduced disk I/O.
* Better scalability for millions of records.

Expected complexity improves to approximately:


O(log N)


for index lookup operations.

### Should Every Column Be Indexed?

No.

Indexing every column is not recommended.

Disadvantages of excessive indexing:

1. Increased storage consumption.
2. Slower INSERT operations.
3. Slower UPDATE operations.
4. Slower DELETE operations.
5. Additional maintenance overhead.

Indexes should only be created on columns that are frequently used for filtering, sorting, or joining.

### Query to Find Students Who Received Placement Notifications in the Last 7 Days


SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';


### Additional Scaling Recommendations

To further improve performance as data volume grows:

1. Implement pagination using `LIMIT` and `OFFSET`.
2. Avoid `SELECT *`; retrieve only required columns.
3. Archive old notifications to separate storage.
4. Partition the notifications table based on date ranges.
5. Use Redis caching for frequently accessed notification data.
6. Monitor query execution plans and optimize indexes as usage patterns evolve.

### Conclusion

The original query is correct but inefficient at scale. A composite index on `(studentID, isRead, createdAt)`, pagination, selective column retrieval, and caching strategies significantly improve performance and ensure the system can handle millions of notifications efficiently.
