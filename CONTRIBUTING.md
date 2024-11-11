# Contribution Guidelines

## Project Structure

The project structure is as follows:
### components/
This is where the client side reactive components live. In our case, any tsx files go here. Reactive components are rendered on the client side only and can be composed of other reactive components.
### config/
Any configuration files required for say establishing a connection with a database go here, another use case can be to load any environment variables in the form of feature flags.
### layouts/
Similar to components, but only atomic components go here like a button, a label, a textarea, etc.
### models/
Typescript representation of database tables go here, basically your DB schema files.
### pages/
This is where the server side rendered components live. Any and all javascript that runs on the server should belong here. DO NOT add any reactive client side components here, as a rule of thumb if you are using the script tag in this section, you should be using a reactive component that lives under components/. Any and all session cookies MUST be set here and should, under no situation, be put in a client side component.
### pages/api/
All backend REST APIs go here. Use cases include making a database call from the client side, etc.
### services/
A functional wrapper over fetch() calls. This will make a REST API call from client side components.
### styles/
Minimal global styles like themes go here. Keep as little css in this file as possible and colocate all css with the components in either pages/ or components/.

A .env file is required to run this project in your local machine, The .env file should be at the root of the project and contain 2 environment variables:
- DATABASE_URL
- REDIS_URL