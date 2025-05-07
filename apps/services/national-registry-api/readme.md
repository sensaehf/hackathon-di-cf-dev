# API for the national registry
The "API for the National Registry" application is a backend service that interacts with the national registry system. 

## Setup Requirements:

Requires Docker for local development.
Includes commands to start related services, run database migrations, and seed data.

To initialize the application, the database and seed it, run these commands:

``` 
 docker compose up
 yarn install
 yarn nx run national-registry-api:migrate
 yarn nx run national-registry-api:seed
```

## Local Development:
The application can be accessed locally via localhost:3210. There's a Swagger endpoint at http://localhost:3210/api/swagger


This application is a part of a larger system, with dependencies on other services and applications within the workspace.

## Key features

The API allows other services to get information about a person.