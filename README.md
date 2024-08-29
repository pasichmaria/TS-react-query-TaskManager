# Task Manager

## Overview

Task Manager is a full-featured task management application. This README provides instructions for setting up and running both the client and server.

## Getting Started

To get started with the Task Manager, follow these steps to set up and run the application locally.

### Prerequisites

Make sure you have the following tools installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Setting Up the Client

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install the dependencies:

    ```bash
    pnpm i
    ```

3. Start the development server:

    ```bash
    pnpm run dev
    ```

### Running the Server

1. Open a new terminal window and navigate to the project directory.

2. Start the JSON server:

    ```bash
    npx json-server db.json --port 8000
    ```

### Access the Application

- **Index**: [http://localhost:8000/](http://localhost:8000/)
- **Static Files**: Serving files from the `./public` directory if it exists.
- **API Endpoints**:
    - **Tasks**: [http://localhost:8000](http://localhost:8000)

## Additional Information

- The client-side application uses [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for styling.

- The server-side is powered by [json-server](https://github.com/typicode/json-server) to provide a simple REST API for development purposes.

