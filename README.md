# BookList App

## Description
This project is a web application built with Vite and JSON Server. It allows users to interact with a simulated backend for development and testing purposes.

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (>= 20)
- **npm** (comes with Node.js)

## Installation
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Available Scripts
The following scripts are available to manage the project:

### Start the Development Server
```sh
npm run dev
```
This will start the Vite development server and JSON Server on port `8080`.

### Build the Project
```sh
npm run build
```
This compiles the TypeScript files and builds the application for production.

### Serve the Built Application
```sh
npm run start
```
This command starts the JSON Server and serves the built application using Vite's preview mode.

## JSON Server API
The JSON Server is used as a mock backend and runs on `http://localhost:8080/`. The database file is located at `server/db.json`. You can modify this file to change the mock data.

## Demo pages
