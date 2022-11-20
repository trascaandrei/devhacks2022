# devhacks2022

## Run dummy script

Before runnig the script make sure to define the following *.env* file inside **scripts** folder
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017
DB_NAME=devhacks
MONGO_USERNAME= # username; leave it empty if no password is required
MONGO_PASSWORD= # password; leave it empty if no password is required
```

```bash
cd scripts
npx ts-node insert_dummy_data.ts
```

```bash
cd scripts
npx ts-node insert_dummy_data.ts --file data.csv # populate db from file
```

## Run server

Before running the server make sure to define the following *.env* file in the project root directory
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017
DB_NAME=devhacks
MONGO_USERNAME= # username; leave it empty if no password is required
MONGO_PASSWORD= # password; leave it empty if no password is required
SECRET_KEY= # secret string
EXPIRES_IN=86400
ORIGIN=http://localhost:3000

```

## Activities API

1. get list of defined activities
```bash
GET /api/v1/activities/
```

```JSON
{
    "activities": [
        {
            "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
            "name": "Adunare gunoaie",
            "description": "Adunarea gunoaielor de pe spatiile verzi",
            "details": [
                "nrSquareMeters",
                "pricePerSquareMeter"
            ]
        },
        {
            "activityId": "9745e713-979c-47ef-aaa8-ede2f852db26",
            "name": "Plantare copaci",
            "description": "Plantare copaci in parcuri",
            "details": [
                "nrTrees",
                "pricePerTree"
            ]
        }
    ]
}
```

## Actions API

1. create a new action
```bash
POST /api/v1/actions/
```

```JSON
{
    "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
    "title": "Plantare copaci in Tineretului",
    "description": "Save the environment by your actions",
    "details": {
        "nrSquareMeters": 200,
        "pricePerSquareMeter": 1
    }
}
```

```JSON
{
    "message": "action created successfully"
}
```

2. get list of created actions for a logged ONG
```bash
GET /api/v1/actions/
```

```JSON
{
    "actions": [
        {
            "actionId": "c2d64cfc-55f7-4208-9f00-b678354ce031",
            "details": {
                "nrSquareMeters": 100,
                "pricePerSquareMeter": 2
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "title": "Plantare copaci in Tineretului",
            "description": "Save the environment by your actions"
        },
        {
            "actionId": "88b9fc90-5af4-4e6c-ba84-06551cdeafb9",
            "details": {
                "nrSquareMeters": 200,
                "pricePerSquareMeter": 1
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "title": "Plantare copaci in Tineretului",
            "description": "Save the environment by your actions"
        }
    ]
}
```

3. get list of all created actions
```bash
GET /api/v1/actions/all
```

```JSON
{
    "actions": [
        {
            "actionId": "c2d64cfc-55f7-4208-9f00-b678354ce031",
            "title": "Plantare copaci in Tineretului",
            "description": "Save the environment by your actions",
            "details": {
                "nrSquareMeters": 100,
                "pricePerSquareMeter": 2
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "ong": {
                "email": "andrei.trasca@trsdesign.ro"
            }
        },
        {
            "actionId": "88b9fc90-5af4-4e6c-ba84-06551cdeafb9",
            "title": "Plantare copaci in Tineretului",
            "description": "Save the environment by your actions",
            "details": {
                "nrSquareMeters": 200,
                "pricePerSquareMeter": 1
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "ong": {
                "email": "andrei.trasca@trsdesign.ro"
            }
        }
    ]
}
```

## Requests API

1. create a new request by a company

```bash
POST /api/v1/requests/
```

```JSON
{
    "actionId": "88b9fc90-5af4-4e6c-ba84-06551cdeafb9",
    "details": {
        "nrSquareMeters": 100,
        "pricePerSquareMeter": 2
    }
}
```

```JSON
{
    "message": "request created successfully"
}
```

2. get all requets for a logged ONG

```bash
GET /api/v1/requests/
```

```JSON
{
    "requests": [
        {
            "requestId": "bdb3470b-d67b-4f5d-a1f7-f4a5089d2b31",
            "status": "pending",
            "details": {
                "nrSquareMeters": 100,
                "pricePerSquareMeter": 2
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "action": {
                "title": "Plantare copaci in Tineretului",
                "description": "Save the environment by your actions"
            },
            "company": {
                "cui": "18189442",
                "email": "adrianstefan376@gmail.com",
                "name": "Company1",
                "logoUrl": "http://my-company.com/logo.jpg"
            }
        },
        {
            "requestId": "fb46c4dd-a4bb-4c87-b774-29c0311f559e",
            "status": "pending",
            "details": {
                "nrSquareMeters": 10,
                "pricePerSquareMeter": 2
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "action": {
                "title": "Plantare copaci in Tineretului",
                "description": "Save the environment by your actions"
            },
            "company": {
                "cui": "18189442",
                "email": "contact@trsdesign.ro",
                "name": "Company1",
                "logoUrl": "http://my-company.com/logo.jpg"
            }
        }
    ]
}
```

3. update request status by logged ONG

```bash
PUT /api/v1/requests/:requestId
```

```JSON
{
    "status": "accepted"
}
```

```JSON
{
    "message": "request updated successfully"
}
```

## History API

1. get list of histories for a logged company

```bash
GET /api/v1/histories/
```

```JSON
{
    "histories": [
        {
            "historyId": "3c2309ff-015e-4916-a94a-f80e5349e65a",
            "ongDetails": {
                "nrSquareMeters": 200,
                "pricePerSquareMeter": 1
            },
            "companyDetails": {
                "nrSquareMeters": 10,
                "pricePerSquareMeter": 2
            },
            "status": "rejected",
            "action": {
                "title": "Planatare copaci in Tineretului",
                "description": "Save the environment by your actions"
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "ong": {
                "email": "andrei.trasca@trsdesign.ro"
            },
            "company": {
                "email": "andrei.trasca@trsdesign.ro"
            }
        },
        {
            "historyId": "1884d631-d071-458b-861b-4c658cde50a2",
            "ongDetails": {
                "nrSquareMeters": 200,
                "pricePerSquareMeter": 1
            },
            "companyDetails": {
                "nrSquareMeters": 10,
                "pricePerSquareMeter": 2
            },
            "status": "completed",
            "action": {
                "title": "Planatare copaci in Tineretului",
                "description": "Save the environment by your actions"
            },
            "activity": {
                "activityId": "edc88eaa-bd8a-4a8a-9b18-ed2ec2320435",
                "name": "Adunare gunoaie",
                "description": "Adunarea gunoaielor de pe spatiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "ong": {
                "email": "andrei.trasca@trsdesign.ro"
            },
            "company": {
                "email": "andrei.trasca@trsdesign.ro"
            }
        }
    ]
}
```

## Auth API

1. signup

```bash
POST /signup
```

-  if ong account was created

```JSON
{
    "username": "adrian",
    "password": "password",
    "email": "adrianstefan372@gmail.com",
    "type": "ong",
    "name": "ONG1",
    "cui": "13547272"
}
```

```JSON
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNGU4YTIyMy1mMjkwLTQ5YjUtOThmMS1jMmZiZTkwMDVkMjEiLCJ0eXBlIjoib25nIiwiaWF0IjoxNjY4OTAwMjg0LCJleHAiOjE2Njg5ODY2ODR9.hZsvOynAw7hZXii7_zqzohxscT1jJy84OheWryY8QNU",
    "type": "ong",
    "name": "ong-name"
}
```

- if company account was created

```JSON
{
    "username": "adrian",
    "password": "password",
    "email": "adrianstefan372@gmail.com",
    "type": "company",
    "name": "Company1",
    "cui": "13547272"
}
```

```JSON
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWQ4YWM0ZS00ZDQzLTRlYzYtYTc0Yy03ODg1NmM2Y2RmZjQiLCJ0eXBlIjoiY29tcGFueSIsImlhdCI6MTY2ODkwMTExMSwiZXhwIjoxNjY4OTg3NTExfQ._h2gMAURroe6j4I1M0awA3QGwnuKE8GQgBf5fhzCsf0",
    "currentCredit": 0,
    "targetCredit": 1000,
    "type": "company",
    "name": "company-name"
}
```

2. login

```bash
POST /login
```

```JSON
{
    "username": "adrian",
    "password": "password",
}
```

- if ong account

```JSON
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNGU4YTIyMy1mMjkwLTQ5YjUtOThmMS1jMmZiZTkwMDVkMjEiLCJ0eXBlIjoib25nIiwiaWF0IjoxNjY4OTAwMjg0LCJleHAiOjE2Njg5ODY2ODR9.hZsvOynAw7hZXii7_zqzohxscT1jJy84OheWryY8QNU",
    "type": "ong",
    "name": "ong-name"
}
```

- if company account

```JSON
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWQ4YWM0ZS00ZDQzLTRlYzYtYTc0Yy03ODg1NmM2Y2RmZjQiLCJ0eXBlIjoiY29tcGFueSIsImlhdCI6MTY2ODkwMTExMSwiZXhwIjoxNjY4OTg3NTExfQ._h2gMAURroe6j4I1M0awA3QGwnuKE8GQgBf5fhzCsf0",
    "currentCredit": 500,
    "targetCredit": 1000,
    "type": "company",
    "name": "company-name"
}
```

## Statistic API

1. get companies with their rank

```bash
GET /api/v1/statistics/companies/ranks
```

```JSON
{
    "companies": [
        {
            "email": "adrianstefan33756@gmail.com",
            "name": "name-mane",
            "targetCredit": 1000,
            "currentCredit": 0,
            "logoUrl": "http://my-company.com/logo.jpg",
            "companyId": "3df0bc0e-ea17-4e74-8ec3-7a548af24bdc"
        }
    ]
}
```