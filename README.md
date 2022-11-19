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
            "description": "Adunarea gunoaielor de pe saptiile verzi",
            "details": [
                "nrSquareMeters",
                "pricePerSquareMeter"
            ]
        },
        {
            "activityId": "9745e713-979c-47ef-aaa8-ede2f852db26",
            "name": "Plantare copaci",
            "description": "Planatare copaci in parcuri",
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
                "details": "Adunarea gunoaielor de pe saptiile verzi"
            }
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
                "description": "Adunarea gunoaielor de pe saptiile verzi",
                "details": "Adunarea gunoaielor de pe saptiile verzi"
            }
        }
    ]
}
```

3. get list of created actions TODO: change it later; it will be a request made by a company to get all available actions
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
                "details": "Adunarea gunoaielor de pe saptiile verzi"
            }
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
                "description": "Adunarea gunoaielor de pe saptiile verzi",
                "details": "Adunarea gunoaielor de pe saptiile verzi"
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
                "description": "Adunarea gunoaielor de pe saptiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "company": {}
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
                "description": "Adunarea gunoaielor de pe saptiile verzi",
                "details": [
                    "nrSquareMeters",
                    "pricePerSquareMeter"
                ]
            },
            "company": {}
        }
    ]
}
```