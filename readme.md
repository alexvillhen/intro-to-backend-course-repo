# Intro to Backend Web Development

A REST API built while following the [freeCodeCamp Intro to Backend Web Development tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM&t=5793s). The project covers core backend concepts—Express routing, MongoDB with Mongoose, user authentication basics, and CRUD operations—extended with full post management endpoints.

## Features

- **User management** — register, login, and logout with bcrypt password hashing
- **Post CRUD** — create, read (all or by ID), partial update, and delete posts
- **MongoDB integration** — Mongoose models with schema validation and timestamps
- **Structured architecture** — separated routes, controllers, models, and config

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) — password hashing
- [dotenv](https://www.npmjs.com/package/dotenv) — environment variables

## Project Structure

```
backend/src/
├── config/
│   ├── constants.js      # App constants (e.g. DB name)
│   └── database.js       # MongoDB connection
├── controllers/
│   ├── post.controller.js
│   └── user.controller.js
├── models/
│   ├── post.model.js
│   └── user.model.js
├── routes/
│   ├── post.route.js
│   └── user.route.js
├── app.js                # Express app & middleware
└── index.js              # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alexvillhen/intro-to-backend-course-repo.git
   cd intro-to-backend-course-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Or run in production mode:

   ```bash
   npm start
   ```

The server runs on `http://localhost:4000` by default (or the port set in `.env`).

## API Reference

Base URL: `http://localhost:4000/api/v1`

### Users

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/users/register`     | Register a new user            |
| POST   | `/users/login`        | Log in with email and password |
| POST   | `/users/logout`       | Log out a user by email        |

**Register / Login body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

Passwords are hashed with bcrypt before being stored. User responses never include the password field.

### Posts

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/posts/create`    | Create a new post                    |
| GET    | `/posts/`          | Get all posts                        |
| GET    | `/posts/:id`       | Get a single post by ID              |
| PATCH  | `/posts/:id`       | Partially update a post              |
| DELETE | `/posts/:id`       | Delete a post by ID                  |

**Create post body** (all fields required):

```json
{
  "name": "My Post",
  "description": "A short description",
  "age": 25
}
```

**Update post body** (send only the fields you want to change):

```json
{
  "name": "Updated title"
}
```

At least one field must be provided when updating. Omitted fields are left unchanged.

## Example Requests

```bash
# Create a post
curl -X POST http://localhost:4000/api/v1/posts/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Hello","description":"World","age":30}'

# Get all posts
curl http://localhost:4000/api/v1/posts/

# Get post by ID
curl http://localhost:4000/api/v1/posts/<post_id>

# Update a post (partial)
curl -X PATCH http://localhost:4000/api/v1/posts/<post_id> \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'

# Delete a post
curl -X DELETE http://localhost:4000/api/v1/posts/<post_id>

# Register a user
curl -X POST http://localhost:4000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"password123"}'
```

## Changes Beyond the Tutorial

This repo extends the FCC tutorial with:

- **Full post CRUD** — get by ID, partial update (`PATCH`), and delete by ID (`DELETE`)
- **Partial updates** — `editPost` only modifies fields sent in the request body
- **Consistent error handling** — 400, 404, and 500 responses across endpoints

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Alexvillhen** — [GitHub](https://github.com/alexvillhen)
