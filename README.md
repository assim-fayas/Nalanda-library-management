Nalanda Library Management System
Overview
The Nalanda Library Management System is a backend project designed to manage a library's operations, such as user management, book management, borrowing system, and generating reports. This system offers both RESTful and GraphQL APIs to perform the necessary operations.

The system is built using Node.js, Express, and MongoDB, and includes JWT-based authentication and role-based access control. The project also utilizes the MongoDB aggregation framework to generate reports.

Features
User Management
User Registration: Users can register with their name, email, and password.
User Login: Users can log in using their email and password.
User Roles: The system supports two roles: Admin and Member. Admins have full access, while Members have restricted access.
Book Management
Add Book: Admins can add new books with details such as title, author, ISBN, publication date, genre, and number of copies.
Update Book: Admins can update existing book details.
Delete Book: Admins can remove books from the library.
List Books: All users can view a list of books with pagination and filtering options.
Borrowing System
Borrow Book: Members can borrow books, ensuring availability.
Return Book: Members can return borrowed books.
Borrow History: Members can view their borrowing history.
Reports and Aggregations
Most Borrowed Books: Report on the most borrowed books.
Active Members: List the most active members based on their borrowing history.
Book Availability: Summary report of book availability, including total, borrowed, and available books.
Tech Stack
Backend: Node.js, Express
Database: MongoDB
APIs: RESTful API, GraphQL API
Authentication: JWT-based authentication with role-based access control
Documentation: Swagger for RESTful API documentation
Setup Instructions
Prerequisites
Node.js (v14.x or higher)
MongoDB
Git
Installation
Clone the repository

bash
Copy code
git clone https://github.com/your-username/nalanda-library-management.git
cd nalanda-library-management
Install dependencies

bash
Copy code
npm install
Set up environment variables
Create a .env file in the root directory with the following content:

env
Copy code
PORT=3001
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Run the application

bash
Copy code
npm start
The application will run on http://localhost:3001.

Deployment
The application has been deployed on Render. You can access it here.

API Documentation
RESTful API
The RESTful API is documented using Swagger. You can view the documentation at the following URL:

Swagger API Docs
GraphQL API
The GraphQL API is accessible at:

http://localhost:3001/graphql (locally)
Testing
To run tests, use the following command:

bash
Copy code
npm test
Version Control
This project uses Git for version control. It is recommended to follow semantic commit messages for clarity.

Contributing
If you wish to contribute to the project, feel free to fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
