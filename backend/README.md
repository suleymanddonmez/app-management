# Backend - Node.js Application

This is the backend part of the configuration management panel, built with Node.js and Express.js.

The application available at [https://appapi.yazilimdev.com](https://appapi.yazilimdev.com).

## Project Setup

```
npm install
```

### Start the Application

```
npm start
```

## Environment Variables

Create a `.env` file in the root of the `backend` directory and set the following environment variables:

```
CONNECTIONSTR=your-mongodb-connection-string
JWT_SECRET_KEY=your-jwt-secret
```

## Recommended IDE Setup

For the best development experience, use:

- [VSCode](https://code.visualstudio.com/)

## API Endpoints

- **GET /configurations**: Retrieve the latest configuration JSON file.
- **POST /configurations**: Update configuration parameters.

## Deployment

Ensure you have Docker installed and run the following command to build and run the application:

```
docker-compose up --build
```

The application will be available at [http://localhost:3007](http://localhost:3007).
