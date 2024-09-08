# Task Management Application
This is a full-stack Task Management Application built with React for the frontend and Node.js for the backend. It allows users to add, edit, delete, and view 
tasks with due dates. Tasks are stored in a database (using SQLite3), and CRUD operations are performed via a RESTful API.
## Features
- Add tasks with a title, description, and due date.
- Edit existing tasks.
- Delete tasks from the list.
- View all tasks in a list format.
- Real-time updates on task actions (add/edit/delete).
## Technologies Used
### Frontend:
- **React:** JavaScript library for building user interfaces.
- **Axios:** Promise-based HTTP client for API requests.
- **CSS:** For styling the components.
### Backend:
- **Node.js:** JavaScript runtime for building the server.
- **Express.js:** Web framework for handling API requests.
- **SQLite3:** Relational database for storing task data.
### State Management:
- **React Hooks:** Used for managing state and lifecycle in functional components.
## API Endpoints
- GET /tasks: Fetch all tasks.
- POST /tasks: Add a new task.
- PUT /tasks/:id : Update an existing task.
- DELETE /tasks/:id : Delete a task by ID.
