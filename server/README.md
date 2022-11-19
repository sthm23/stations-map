# stations in map api

A simple REST API in Node.js

API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/stations    |Get all stations           |
| GET         | api/stations/id |Get a specific station         |
| POST        | api/stations    |Create a new station         |
| PUT        | api/stations/id    |Update an existing station|
| DELETE        | api/stations/id    |Delete an existing station|

## Quick Start

Clone the repo.

Create the .env file.

```bash
DB_URL = mongodb://localhost:27017/stations
TEST_DB_URL = localhost/test-stations
PORT = 5000
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm run dev
```

created according to info

For more details check [Build a Restful CRUD API with Node.js](https://dev.to/zagaris/build-a-restful-crud-api-with-node-js-2334).