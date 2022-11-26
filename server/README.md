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


| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/regions    |Get all regions           |
| GET         | api/regions/id |Get one region         |
| GET         | api/regions/100 |Get UZB map layer         |
| POST        | api/regions/id    |get region with dists         |

## Quick Start

Clone the repo.

Create the .env file.

```bash
DB_URL = mongodb://sanjar_12:sanjar_12@ac-3b7w8e6-shard-00-00.b8we4x8.mongodb.net:27017,ac-3b7w8e6-shard-00-01.b8we4x8.mongodb.net:27017,ac-3b7w8e6-shard-00-02.b8we4x8.mongodb.net:27017/baseStationsMap?ssl=true&replicaSet=atlas-7bcqyw-shard-0&authSource=admin&retryWrites=true&w=majority
# DB_URL = mongodb://localhost:27017/stations
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
