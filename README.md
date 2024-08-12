# Configuration Management Panel and REST API

This project is a configuration management system designed to serve JSON configuration files for mobile applications. The system consists of a frontend built with Vue.js (3), a backend powered by Node.js, a MongoDB database, and JWT-based authentication. The panel allows application managers to log in, update, and manage configuration parameters, ensuring consistency and preventing conflicts. 

The application available at [https://app.yazilimdev.com](https://app.yazilimdev.com).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive UI**: The panel is responsive and optimized for both desktop and mobile views.
- **Authentication**: Users authenticate using JWT tokens.
- **Conflict Prevention**: Edits are managed to prevent data overwrites when multiple users modify configurations simultaneously.
- **REST API**: Provides JSON configurations to mobile applications.
- **Secure**: JWT tokens are used for secure data access and validation.
- **MongoDB Database**: Stores configuration data, ensuring scalability and reliability.

## Technologies Used

- **Frontend**: Vue.js (3)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker

## Project Structure

```plaintext
├── backend
│   ├── functions
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── serializers
│   ├── db.js
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   ├── dockerfile
│   └── nginx.conf
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── router
│   │   ├── store
│   │   ├── views
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Setup and Installation

1. **Clone the Repository**

  ```
   git clone [https://github.com/suleymanddonmez/app-management.git](https://github.com/suleymanddonmez/app-management.git)
   cd your-repo
  ```

2. **Install Dependencies**

   - **Backend**:
     ```
     cd backend
     npm install
     ```

   - **Frontend**:
     ```
     cd frontend
     npm install
     ```

3. **Setup MongoDB**

   - Install MongoDB locally or use a MongoDB Atlas cluster.
   - Obtain your MongoDB connection string.

4. **Configure Environment Variables**

   - Rename `.env.example` files in `backend` directory to `.env`.
   - Populate the `.env` files with your MongoDB connection string, JWT secret, and other necessary environment variables.

5. **Run the Application**

   - **Backend**:
     ```
     cd backend
     npm start
     ```

   - **Frontend**:
     ```
     cd frontend
     npm run dev
     ```

## Environment Variables

### Backend `.env`

```
CONNECTIONSTR=your-mongodb-connection-string
JWT_SECRET_KEY=your-jwt-secret
```

## Usage

- **Sign In**: Users can sign in via the `/signin` page using their credentials.
- **Manage Configurations**: After logging in, users can add, edit, and update configuration parameters from the homepage (`/`).
- **Conflict Prevention**: The system prevents data overwrites by marking a record as active during edits. This ensures that no other user can edit the record until the save operation is complete, effectively managing simultaneous edits.


## Endpoints

### REST API

- **GET /configurations**: Retrieve the latest configuration JSON file.
- **POST /configurations**: Update configuration parameters.

### Authentication

- All update requests must include a valid JWT token in the `Authorization` header.
- Configuration retrieval requests must include a pre-defined API token in the headers.

## Deployment

To deploy this application using Docker:

1. Ensure Docker is installed on your system.
2. Set up your environment variables in the `.env` files.
3. Use Docker Compose to build and run the application:

   ```
   docker-compose up --build
   ```

4. The application will be available at `http://localhost:3007` and `http://localhost:3006` (or the port you configured).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License.
