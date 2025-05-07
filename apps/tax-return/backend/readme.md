# Tax Return Backend API

## Overview

The Tax Return Backend API exposes a REST API for working with tax return records for individuals.

## Features

- **Tax Return Submission**: Handles the submission of tax return data.
- **Validation**: Ensures the accuracy and completeness of submitted data.
- **Integration**: Communicates with external systems for processing and verification.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Docker**: Required for running dependent services locally.

## Development Setup

1. Run these commands:
    ```bash
    docker compose up
    yarn install
    yarn nx run tax-return-backend:migrate
### Installation

1. Clone the repository and navigate to the `tax-return/backend` app directory:
   ```bash
   cd apps/tax-return/backend   
2. Install dependencies:
    ```bash
    yarn install
3. Start the application:
    ```bash
    yarn start tax-return-backend
### Running Tests
To run the tests for the application:
    ```bash
    yarn test tax-return-backend

### Testing locally
You can test locally using http://localhost:3000 and there's a Swagger endpoint at http://localhost:3000/api/swagger

### Deployment
The application is designed to be deployed as part of the larger system. Ensure all dependencies and configurations are properly set up before deployment.