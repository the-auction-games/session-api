# Session API
The API for tracking active user sessions. This API provides functionality for creating and validating sessions. It utilizes Dapr for service discovery and state management.

## Project Structure
The project is structured as follows:
```
.
├── src/                'Source files'
│   ├── index.ts        'Entry point'
├── test/               'Testing directory'
│   ├── test.ts         'Test cases'
├── package.json        'Project manifest'
├── tsconfig.json       'Typescript configuration'
└── README.md           'This file'
```

## API Documenation
https://app.swaggerhub.com/apis/JOELSMITH19/session-api/1.0.0

# Please Note
This API is not secure in the sense that anyone can trick the API into thinking they are logged in as a specific user. This will be fixed in the next itteration and this version is specifically used only as a proof-of-concept microservice.
