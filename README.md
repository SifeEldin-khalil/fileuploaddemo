## Description

A Nest application build to upload attachments to an AWS S3 Bucket.

## Adding .env

A dd the following env variables in .env file (S3 bucket keys and info).

```bash
MONGOURI='mongodb+srv://drdawy:drdawy1234@mytestdb.8uxtrpu.mongodb.net/?retryWrites=true&w=majority'

LIST_EXTENSION='application/pdf,image/png'

AWS_REGION=''

AWS_ACCESS_KEY_ID=''

AWS_SECRET_ACCESS_KEY=''

AWS_BUCKET_NAME=''
```

## Manual Installation and Running

```bash
# install dependencies
$ npm install

# run development
$ npm run start:dev
```

## Running the app Dockerized

```bash
# build image
$ docker build -t fileuploaddemo .

# run container
$ docker run -p 3000:3000 fileuploaddemo
```
