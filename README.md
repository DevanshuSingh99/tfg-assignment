# Very Basic RabbitMQ-Based Micro-Service for User Registration Events

## Description
This project implements a micro-service architecture for processing user registration events using RabbitMQ message queue. It separates functionalities into independent services:
  - User Registration Service: Responsible for handling user registration requests and sending registration events to RabbitMQ.
  - Event Processor Service: Consumes registration events from RabbitMQ, logs them to a file, and performs additional processing as needed.

## Technology Stack
  - Node.js
  - Express.js
  - MySQL
  - MongoDb
  - RabbitMQ
  - AMQP library (RabbitMq)

## Installation
  1. Clone the repository. ```git clone https://github.com/DevanshuSingh99/tfg-assignment.git```
  2. Install dependencies: ```npm i```
  3. Configure environment variables:
        - ENCRYPTION_KEY=anythingYouWantToWrite
        - JWT_SECRET=anythingYouWantToWrite
        - MONGO_URI= {Use Your Own Mongo URI}
        - MYSQL_HOST= {Your Host Name}
        - MYSQL_USER= {Your Username}
        - MYSQL_PASSWORD= {Your Passwrod}
        - MYSQL_DB= {Your Database Name}
        - RABBITMQ_URL=amqp://localhost
  4. Start the services
       -  Start the main Publisher Server ```node index.js```
       -  Start the Consumer Server ```node subscriber.js```
  
## Postman API [Here](https://www.postman.com/clubzerobalance/workspace/tfg-postman-apis/collection/20436767-af09df10-ce50-4bb2-8fa9-b35a2674ed34?action=share&creator=20436767)
 
# Have a good coding ahead
