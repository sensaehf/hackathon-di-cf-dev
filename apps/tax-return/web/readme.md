# Web Application

## Overview

The Web application is a frontend project designed to provide a user interface for interacting with the system. It serves as the primary entry point for users to access various features and services.

## Features

- **User Interface**: A responsive and user-friendly interface for interacting with backend services.
- **Integration**: Seamless communication with backend APIs to fetch and display data.
- **Customizable**: Built with modern web technologies, allowing for easy customization and scalability.

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **Docker**: Required for running dependent services locally.

## Development Setup
The web frontend requires the API, the backend, and the National Registry API all to run.

### Installation

1. Navigate to the `web` project directory:
   ```bash
   cd apps/web
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start tax-return-web
   ```

### Running Tests

To run the tests for the application:
```bash
npm test tax-return-web
```

## Deployment

The application is designed to be deployed as part of the larger system. Ensure all dependencies and configurations are properly set up before deployment.

## Contributing

Contributions are welcome! Please follow the guidelines outlined in the main repository.

## License

This project is licensed under the terms of the [LICENSE](../../LICENSE) file.