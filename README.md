# LudOhana

## Project description
Discover LudOhana, the non-profit association that unites fun and learning in the Canary Islands! Immerse yourself in exciting events in contact with nature, animal care and environmental preservation. Join our community of families and schools to live unique experiences! Do you have ideas for new events? Share them with us and let's make magic together! We are waiting for you at LudOhana to create unforgettable memories together!


## Authors

+ ![Juan Diego Fernández Déniz](https://github.com/judifede)
+ ![Yennyth Renne Sánchez Nieto](https://github.com/Yennsanpro)
+ ![Daniela Romero García](https://github.com/bqcount)

## Technologies
+ <img style = "vertical-align: cent" src = "https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js&logoColor=white" height =  "30" width = "120"> **Node.js**
+ <img style = "vertical-align: cent" src = "https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" height =  "30" width = "120"> **Express**
+ <img style = "vertical-align: cent" src = "https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" height =  "30" width = "120"> **Sequelize**
+ <img style = "vertical-align: cent" src = "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" height =  "30" width = "120">  **MySQL**
+ <img style = "vertical-align: cent" src = "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height =  "30" width = "120"> **JavaScript (JS)**
+ <img style = "vertical-align: cent" src = "https://github.com/Yennsanpro/LudOhana/assets/79409049/99eca35b-2acd-41d0-be38-a42bb53f911c" height =  "30" width = "120"> **Stripe**


## Authorization

- Administrator Role: Administrators have full access to all functionalities. They can make requests and access all tables, including events,users,contributions and materials.
- User Role: Users have limited access, they can only access and edit data related to it, (register, edit your profile, register for an event, cancel your registration) can not create events, only propose ideas for events that will have to go through a validation process carried out by the administrator. 

## Requeriments

- Nodejs
- Database(Change .env-> Dialect with the one you use)

## Installation

To get started with the School Administration API, just get into the repo and run:

``` npm i ```

## Usage

Create .env file to your own settings. To start the api server just run:

``` node index.js```

## Data structure and models

![Data structure model](https://github.com/Yennsanpro/LudOhana/assets/79409049/badd9666-305a-4885-9eb9-510a57fd53cc)


### Relations

#### Many to many

+ Ref: material_event.id_material < materials.id 
+ Ref: material_event.id_event < events.id
+ Ref: user_event.id_user < users.id 
+ Ref: user_event.id_event < events.id 

#### One to many
+ Ref: contributions.id_user > users.id 
+ Ref: contributions.id_event < events.id 


## Endpoints
{{baseURL}} = http://localhost:port/api
### Users

| METHOD | ENDPOINT                        | TOKEN | ROLE          | DESCRIPTION                | POST PARAMS              | RETURNS                  |
| ------ | ------------------------------- | ----- | ------------- | -------------------------- | ------------------------ | ------------------------ |
| GET    | {{baseURL}}/users/:userId       | YES   | User          | Get user by id             | -                        | [{ users }]              |
| POST   | {{baseURL}}/users/signup        | NO    | User          | Create one user            | req.body                 | { users }                |
| POST   | {{baseURL}}/users/login         | NO    | User          | Sign in                    | req.body                 | { users }                |
| PUT    | {{baseURL}}/users/:userId       | YES   | User          | Update user                | req.body,req.params      | { users }                |
| DELETE | {{baseURL}}/users/:userId       | YES   | User          | Remove one user            | userId                   | "User deleted"           |


### Events

| METHOD | ENDPOINT                                       | TOKEN | ROLE          | DESCRIPTION                         | POST PARAMS              | RETURNS                  
| ------ | ---------------------------------------------- | ----- | ------------- | ----------------------------------- | ------------------------ | -------------------|
| GET    | {{baseURL}}/events                             | NO    | Public        | Get currents events                 | req.query                | [{ events }]       |     
| GET    | {{baseURL}}/events?filter=previous             | NO    | Public        | Get previous events                 | req.params               | [{ events }]       |     
| GET    | {{baseURL}}/events/user/:userId                | YES   | User          | Get registered events from the user | req.params,req.query     | [{ events }]       |     
| GET    | {{baseURL}}/events/user/:userId?filter=previous| YES   | User          | Get past user events                | req.params               | [{ events }]       |     
| GET    | {{baseURL}}/events/:eventId/user/:userId       | YES   | User          | Get user events propoused           | req.params               | [{ events }]       |      
| GET    | {{baseURL}}/events/:eventState                 | YES   | Admin         | Get user events by state            | req.params               | [{ events }]       |  
| POST   | {{baseURL}}/events                             | YES   | Admin/User    | Create events                       | req.body                 | { events }         |   
| PUT    | {{baseURL}}/events/:eventId/user/:userId       | YES   | User          | Registers to an evento              | req.params,req.body      | { events }         |    
| PUT    | {{baseURL}}/events/:eventId                    | YES   | Admin         | Update evento                       | req.params,req.body      | { events }         |     
| DELETE | {{baseURL}}/events/:eventId                    | YES   | Admin         | Remove one event                    | eventId                  | "Event deleted"    |      


### Contributions
      
| METHOD | ENDPOINT                                                | TOKEN | ROLE          | DESCRIPTION                  | POST PARAMS              | RETURNS                  |
| ------ | ------------------------------------------------------  | ----- | ------------- | ---------------------------- | ------------------------ | ------------------------ |
| GET    | {{baseURL}}/contributions                               | YES   | Admin         | Get contribtions             | -                        | [{ contributions }]      |
| GET    | {{baseURL}}/contributions/:contributionId/event/:eventId| YES   | User/Admin    | Get contributions by eventId | req.params               | { contributions }        |       
| POST   | {{baseURL}}/contributions                               | YES   | User          | make a contribution          | req.body                 | { contributions }        |
| PUT    | {{baseURL}}/contributions/idContribution                | YES   | User          | Update contribution          | req.body,req.params      | { contributions}         |
| DELETE | {{baseURL}}/contributions/:contributionId               | YES   | Admin         | Remove one contrbution       | contributionId           | "Contribution deleted"   |

### Materials
      
| METHOD | ENDPOINT                                                | TOKEN | ROLE          | DESCRIPTION                | POST PARAMS              | RETURNS                  |
| ------ | ------------------------------------------------------  | ----- | ------------- | -------------------------- | ------------------------ | ------------------------ |
| GET    | {{baseURL}}/materials                                   | YES   | Admin         | Get materials              | -                        | [{ materials }]      |
| GET    | {{baseURL}}materials/:materialId                        | YES   | Admin         | Get materials by id        | req.params               | { materials }        |       
| GET    | {{baseURL}}events/:eventId/materials/:materialId        | YES   | Admin         | Get materials by eventId   | req.params               | { materials }        |       
| POST   | {{baseURL}}/materials                                   | YES   | Admin         | Create material            | req.body                 | { materials }        |
| PUT    | {{baseURL}}/materials/:materialId                       | YES   | Admin         | Update material by id      | req.body,req.params      | { materials}         |
| PUT    | {{baseURL}}/events/:eventId/materials/:materialId       | YES   | Admin         | Update material by eventId | req.body,req.params      | { materials}         |
| DELETE | {{baseURL}}/materials/:materialId                       | YES   | Admin         | Remove one material        | materialId               | "Material deleted"   |


