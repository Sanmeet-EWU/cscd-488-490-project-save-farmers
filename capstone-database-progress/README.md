# Database Implementation README

## Directory Structure
```
├── ER_Diagram_SaveFarmers021425.pdf           # Entity-Relationship diagram of the database.
├── Database_Justification.pdf                 # Document explaining the rationale behind database design choices.
├── DatabaseExpliantionVideo_021425.txt        # Link to video explanation of the database implementation.
├── schema/                                    # Directory containing database schema definitions.
│   ├── dbo.AspNetUsers                        # Table schema for user.
│   ├── dbo.Posts                              # Table schema for posts.
├── data_files/                                # Directory containing sample data.
│   ├── dbo.AspNetUsers.data                   # Sample user data.
│   ├── dbo.Posts.data                         # Sample post data.
├── README                                     # Documentation explaining the database structure and implementation details.
```

## Overview
This document provides an overview of the database implementation, detailing key design decisions, challenges, and future improvements. It serves as a guide for understanding the structure and rationale behind the database choices made for this project.

## Database Type
The initial database choice was **SQLite** due to its simplicity and quick setup. However, as the project grew, we transitioned to **Microsoft ASP.Net Core** for better scalability and integration with Azure in the future.

## Key Design Decisions

### Transition from SQLite to ASP.Net Core
Originally, SQLite was chosen for its ease of use and rapid development benefits. However, when implementing user authentication and integrating with the front-end, SQLite's limitations became apparent. The transition to ASP.Net Core provided a more scalable and efficient back-end solution.

### Normalization
The database follows best practices in normalization to ensure data integrity and reduce redundancy. In user we have some information that we are not using currently but we aren't getting rid of it because we might need to down the road.

### Indexing
Indexes have been implemented on key fields such as **user IDs and post IDs** to enhance query performance and reduce lookup times.

### Relationships
The database structure includes relationships such as:
- **One-to-Many** (User to Post)
- **Many-to-Many** (Post to TransactionHistory) TransactionHistory is not yet implemented into the back-end (not core feature)
- **One-to-Many** (User to TransactionHistory) TransactionHistory is not yet implemented into the back-end (not core feature)

### Entity-Relationship Structure
The database structure is modeled based on the following entities:
- **User**: Stores user authentication and profile data, including fields like `Id`, `RefreshToken`, `Email`, `PasswordHash`, and timestamps for tracking user activity.
- **Post**: Contains details of crop sales posts, including `PostId`, `Title`, `Price`, `CropType`, `Amount`, `Location`, and `Contact`.
- **TransactionHistory**: Tracks transactions between users, linking `userId` and `postId` with timestamps and transaction amounts.

### API Endpoints
- **User Management**
  - `POST /api/register()`: Allows a new user to register.
  - `POST /api/login()`: Authenticates the user.
  - `GET /api/user(Id)`: Displays user information.
  - `DELETE /api/user(Id)`: Deletes a user.
- **Post Management**
  - `POST /api/posts()`: Creates a new crop-selling post.
  - `GET /api/posts()`: Retrieves all posts.
  - `GET /api/posts/user/(UserId)`: Fetches posts by a specific user.
  - `PUT /api/posts(PostId)`: Edits a user’s post.
  - `DELETE /api/posts(PostId)`: Deletes a post.
- **Transaction History**
  - Not Implemented

## Current Challenges
- **Frontend-Backend Integration**: The team is currently working on connecting the backend API to the existing frontend.
- **Development Environment**: Two out of three team members primarily use Mac, which does not support ASP.Net natively, requiring them to use home desktops for development.
- **Authentication & User Management**: Login and signup functionalities are implemented, but the profile page and posting features still need work.

## Planned Improvements
- **Completing Core Features**: Priority is to finalize the profile and posting functionalities.
- **Finish All Other Features**: Finishing the other feature within the core ones.
- **Smoothing out the App**: Functionally and visually fix anything that isn't feeling right.

## Conclusion
This database implementation has evolved from an initial SQLite setup to a more scalable ASP.Net Core-based solution. Despite challenges in integration and development constraints, the team is actively working on refining the system and ensuring good functional support.
