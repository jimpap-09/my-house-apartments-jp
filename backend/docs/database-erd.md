# Database Schema Diagram (ERD)

Generated: 2026-06-03T08:24:04.897Z

```mermaid
erDiagram
    APARTMENT {
        int id PK
        string title
        text description
        float pricePerNight
        string location
        string urlCover
    }

    APARTMENTIMAGE {
        int id PK
        int apartmentId FK
        string url
        string alt
        int sortOrder
        boolean isCover
    }

    USER {
        int id PK
        string username
        string password
        string firstName
        string lastName
        string email UK
        string phone UK
        string role
    }

    REVIEW {
        int id PK
        int rating
        text comment
        int userId FK
        int apartmentId FK
    }

    RESERVATION {
        int id PK
        date checkIn
        date checkOut
        int userId FK
        int apartmentId FK
    }

    APARTMENT ||--o{ APARTMENTIMAGE : "apartmentId"
    USER ||--o{ REVIEW : "userId"
    APARTMENT ||--o{ REVIEW : "apartmentId"
    USER ||--o{ RESERVATION : "userId"
    APARTMENT ||--o{ RESERVATION : "apartmentId"
```f
