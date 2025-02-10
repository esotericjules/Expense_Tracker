<p><a target="_blank" href="https://app.eraser.io/workspace/XLfuA5ejgOUvGNvkinpn" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

## 1. Introduction
### 1.1 Purpose
This document provides a comprehensive architectural design for the Personal Expense Tracker application. It is intended for developers, architects, and stakeholders to understand the system’s design, functionality, and technical approach. This document will serve as a reference throughout the development lifecycle.

### 1.2 Scope
The Personal Expense Tracker is a web application that allows users to manage and analyze their expenses. It supports individual user, offering features such as expense logging, categorization, reporting, and user authentication. It will potentially scale to support small groups. Future scalability and integration with third-party services are key considerations.

### 1.3 Definitions, Acronyms, and Abbreviations
- API: Application Programming Interface
- CRUD: Create, Read, Update, Delete
- JWT: JSON Web Token
- REST: Representational State Transfer
- CDN: Content Delivery Network
### 1.4 References
- System architecture diagrams
- Database schema diagrams
- REST API documentation
### 1.5 Overview
This document outlines the system’s architectural representation, stakeholder concerns, system overview, architectural strategies, key decisions, quality attributes, and identified risks.

## 2. Architectural Representation
### 2.1 Architectural Style and Rationale
The system follows a monolithic architecture to centralize application logic and streamline development. All core features (e.g., user management, expense tracking, reporting) are integrated within a single codebase, simplifying deployment and maintenance. The backend is designed as a RESTful API for client-server communication.

## 3. System Stakeholders and Concerns
### 3.1 Stakeholders
- End Users: Require a user-friendly interface and reliable data management.
- Developers: Need a modular and maintainable codebase.
### 3.2 System Concerns
- Performance: The system should handle up to 100,000 concurrent users with low latency.
- Scalability: Support increased user base and additional features.
- Security: Protect user data and ensure secure authentication.
## 4. System Overview
### 4.1 High-Level Description
The Personal Expense Tracker consists of a responsive frontend, a RESTful backend, and a PostgreSQL database. Users can log expenses, generate reports, and manage categories. The system ensures data security and supports real-time group collaboration.

## 5. Architectural Strategies
### 5.1 Key Strategies
- Utilize React.js for a dynamic and responsive front-end.
- Implement Node.js with Express.js for a robust back-end.
- Use PostgreSQL as the primary RDBMS. PostgreSQL is selected for its ability to handle complex queries efficiently, support for ACID compliance ensuring data integrity, scalability for high user loads, and its extensive ecosystem of tools for database optimization
- Use HTTPS, JWT for authentication, and encryption for sensitive data such as passwords.
- Implement load balancers, API gateways, and caching mechanisms to support scalability
- Employ Redis caching, database optimization, and indexing to improve query speed and overall system efficiency. Indexing in the PostgreSQL database ensures faster lookups for frequently queried fields, such as expense categories and user-specific data, thereby reducing latency.
## 6. System Architecture
### 6.1 Overview of Layers/Modules
- Frontend: Handles the user interface and client-side logic.
- Backend: Manages server-side logic, API requests, and database interactions.
- Database: Stores and retrieves all application data.
### 6.2 Component Diagrams
![Expense tracker component diagram](/.eraser/XLfuA5ejgOUvGNvkinpn___J5B1LTY5OmhP3PfPSAonmWRaBMG3___---figure---y4OHI49HyUmsCwP0-r77c---figure---_Q0Syxvs-VPF_3gF-9gEew.png "Expense tracker component diagram")

### 6.3 Database Design
[﻿dbdiagram.io/d/Personal-expense-tracker-673b135fe9daa85acacfc80c](https://dbdiagram.io/d/Personal-expense-tracker-673b135fe9daa85acacfc80c) 

```
<iframe width="560" height="315" src='https://dbdiagram.io/e/673b135fe9daa85acacfc80c/67aa307b263d6cf9a0a874c0'> </iframe>
```
## 7. Key Architectural Decisions
### 7.1 Decision Log
Monolithic Architecture: Chosen for its simplicity and ease of deployment for the MVP.
Tech Stack Selection: Chosen based on team expertise, project requirements, speed of development, and community support.

## 8. Quality Attributes
### 8.1 Performance
- Use Redis for caching frequently accessed data.
- Optimize database queries with indexing and partitioning.
### 8.2 Scalability
- Prepare for future scaling by designing a modular and maintainable codebase.
### 8.3 Security
- HTTPS for all communication.
- Data encryption (at rest and in transit).
- Data validation
### 8.4 Maintainability
Follow best coding practices and comprehensive documentation for easy maintenance.

## 9. Risks and Technical Debt
### 9.1 Identified Risks
- Scaling Costs: Increased cloud resource usage may raise costs.
### 9.2 Technical Debt
Initial technical debt in advanced reporting features, planned for post-MVP phase.

## 10. Appendices
### 10.1 Glossary
- API Gateway: Middleware that manages API traffic.
- JWT: A compact token used for secure data transfer.
### 10.2 Index
- Architectural Strategies: Section 5
- System Architecture: Section 6
### 10.3 Revision History
- Version 1.0: Initial draft.




<!--- Eraser file: https://app.eraser.io/workspace/XLfuA5ejgOUvGNvkinpn --->