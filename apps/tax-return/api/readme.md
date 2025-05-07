# Tax Return GraphQL API

## Overview

The Tax Return Backend API exposes a GraphQL API for working with tax return records for individuals. It uses the underlying [REST API](../backend/) as data source for tax records, as well as the [National Registry API](../../services/national-registry-api/) for personal information.

Look at how you start them locally before setting up this service.

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
    yarn install

### Installation

1. Clone the repository and navigate to the `tax-return/api` app directory:
   ```bash
   cd apps/tax-return/api   
2. Install dependencies:
    ```bash
    yarn install
3. Start the application:
    ```bash
    yarn start tax-return-api
### Running Tests
To run the tests for the application:
    ```bash
    yarn test tax-return-api

### Testing locally
You can reach the graphQL playground locally at http://localhost:3333/api/graphql

### Deployment
The application is designed to be deployed as part of the larger system. Ensure all dependencies and configurations are properly set up before deployment.