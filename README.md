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
