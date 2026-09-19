# Task Tracker – Full Stack Web Application

A simple full-stack Task Tracker application developed as part of the **ZoyaSofts Python Full Stack Development Internship – Week 4**.

The application allows users to create, view, update, complete, and delete tasks through a React frontend connected to a Django REST API.

## Live Project

[Open Task Tracker](https://task-tracker-frontend-6mc1.onrender.com)


## Features

* Add new tasks
* View all tasks
* Edit existing tasks
* Mark tasks as completed
* Undo completed tasks
* Delete tasks
* Task statistics for total, completed, and pending tasks
* Form validation
* Responsive and professional user interface
* REST API integration

## Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite for local development
* PostgreSQL for deployment

### Tools & Deployment

* Visual Studio Code
* Thunder Client
* Git & GitHub
* Render

## Project Structure

```text
Task-Tracker/
│
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint      | Purpose           |
| ------ | ------------- | ----------------- |
| GET    | `/tasks/`     | Get all tasks     |
| POST   | `/tasks/`     | Create a new task |
| PUT    | `/tasks/:id/` | Update a task     |
| DELETE | `/tasks/:id/` | Delete a task     |

## How It Works

The React frontend sends HTTP requests to the Django REST API.

```text
React Frontend
      ↓
Django REST API
      ↓
PostgreSQL Database
```

When a user adds, edits, completes, or deletes a task, the frontend communicates with the backend API and the changes are stored in the database.

## Internship Work Completed

During Week 4, the following concepts were practiced:

* Python backend setup
* Virtual environment and pip
* Django project and app creation
* URLs and views
* GET, POST, PUT and DELETE requests
* Django models and migrations
* Django REST Framework
* Serializers and validation
* React frontend integration
* API data fetching
* CORS configuration
* GitHub version control
* Render deployment

## Deployment

The backend is deployed on **Render** with a PostgreSQL database.

The React frontend is deployed as a **Render Static Site** and connected to the deployed Django API using an environment variable.

## GitHub Repository

[View Source Code](https://github.com/snehalBedage/ZoyaSofts-Week-4-Task-Tracker)

## Conclusion

The Task Tracker project demonstrates the integration of a React frontend with a Django REST backend and database. It provides practical experience in full-stack development, REST API communication, CRUD operations, validation, version control, and cloud deployment.
