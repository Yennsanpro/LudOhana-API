# LudOhana

## Project description
Discover LudOhana, the non-profit association that unites fun and learning in the Canary Islands! Immerse yourself in exciting events in contact with nature, animal care and environmental preservation. Join our community of families and schools to live unique experiences! Do you have ideas for new events? Share them with us and let's make magic together! We are waiting for you at LudOhana to create unforgettable memories together!


## Team

+ [Yennyth Renne Sánchez Nieto](https://github.com/Yennsanpro)
+ [Juan Diego Fernández Déniz](https://github.com/judifede)
+ [Daniela Romero García](https://github.com/bqcount)

## Tech
+ <img src = "https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js&logoColor=white" height ="30" width = "120"> <span>**Node.js**</span>
+ <img src = "https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" height ="30" width = "120"> <span>**Express**</span>
+ <img src = "https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"
  height ="30" width = "120"> <span>**Sequelize**</span>
+ <img src = "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" height ="30" width = "120"> <span>**MySQL**</span>
+ <img src = "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"  height ="30" width = "120"> <span>**JavaScript (JS)**</span>
+ <img src = "https://github.com/Yennsanpro/LudOhana/assets/79409049/99eca35b-2acd-41d0-be38-a42bb53f911c"  height ="30" width = "120"> <span>**Stripe**</span>


## Authorization

- Administrator Role: Administrators have full access to all functionalities. They can make requests and access all tables, including events,users,contributions and materials.
- User Role: Users have limited access, they can only access and edit data related to it, (register, edit your profile, register for an event, cancel your registration) can not create events, only propose ideas for events that will have to go through a validation process carried out by the administrator. 

## Requeriments

- Nodejs
- Database (Change .env -> Dialect with the one you use)

## Installation

To get started with the School Administration API, just get into the repo and run:

``` npm i ```

## Usage

Create .env file to your own settings.

**Check our .env.example**

To start the api server just run:

``` node index.js```

## Data structure and models

![Data structure model](https://github.com/Yennsanpro/LudOhana/assets/79409049/03794f5e-5251-40ba-bacd-35034a5b301e)

## Relations

### Many to many

+ Ref: material_event.id_material < materials.id 
+ Ref: material_event.id_event < events.id
+ Ref: user_event.id_user < users.id 
+ Ref: user_event.id_event < events.id 

### One to many
+ Ref: contributions.id_user > users.id 
+ Ref: contributions.id_event < events.id 


## Backend Endpoints
Base URL = https://ludohana.onrender.com

 <details>
<summary>:point_right: Users Endpoints</summary> 

| METHOD | ENDPOINT                        | TOKEN | ROLE          | DESCRIPTION                | POST PARAMS              | RETURNS                               |
| ------ | ------------------------------- | ----- | ------------- | -------------------------- | ------------------------ | ------------------------------------- |
| GET    | {{baseURL}}/auth                | YES   | User          | Get user by id             | -                        | { user }                              |
| POST   | {{baseURL}}/auth/signup         | NO    | User          | Create one user            | req.body                 | { token, message: "Account created" } |
| POST   | {{baseURL}}/auth/login          | NO    | User          | Sign in                    | req.body                 | { token }                             |
| PUT    | {{baseURL}}/auth                | YES   | User          | Update one user            | req.body                 | { message: "User updated", user }     |
| DELETE | {{baseURL}}/auth                | YES   | User          | Remove one user            | -                        | "User deleted"                        |
</details>

 <details>
<summary>:point_right: Events Endpoints</summary> 

| METHOD | ENDPOINT                                       | TOKEN | ROLE          | DESCRIPTION                         | POST PARAMS              | RETURNS                  
| ------ | ---------------------------------------------- | ----- | ------------- | ----------------------------------- | ------------------------ | -------------------|
| GET    | {{baseURL}}/events                             | NO    | Public        | Get currents events                 | req.query                | [{ events }]       |     
| GET    | {{baseURL}}/events?filter=previous             | NO    | Public        | Get previous events                 | req.query                | [{ events }]       |     
| GET    | {{baseURL}}/events?state=Propoused             | NO    | Public        | Get events by state                 | req.query                | [{ events }]       |  
| GET    | {{baseURL}}/events/user                        | YES   | User          | Get registered events from the user | req.params,req.query     | [{ events }]       |     
| GET    | {{baseURL}}/events/user?filter=previous        | YES   | User          | Get past user events                | req.params               | [{ events }]       |     
| GET    | {{baseURL}}/events/:eventId/user               | YES   | User          | Get user events propoused           | req.params               | [{ events }]       |      
| GET    | {{baseURL}}/events/:eventState                 | YES   | Admin         | Get user events by state            | req.params               | [{ events }]       |
| GET    | {{baseURL}}/events/:eventId                    | NO    | Public        | Get one event                       | req.params               | { event }          |   
| GET    | {{baseURL}}/events/:eventId/user/contribution  | YES   | User          | Get user contribution by eventId    | req.params               | [{ contributions }]|       
| GET    | {{baseURL}}/events/:eventId/contributions      | YES   | Admin         | Get contributions by eventId        | req.params               | [{ contributions }]|
| POST   | {{baseURL}}/events                             | YES   | Admin/User    | Create one event                    | req.body                 | { events }         |   
| PUT    | {{baseURL}}/events/:eventId/user               | YES   | User          | Registers to an event               | req.params,req.body      | { events }         |    
| PUT    | {{baseURL}}/events/:eventId                    | YES   | Admin         | Update one event                    | req.params,req.body      | { event }          |     
| DELETE | {{baseURL}}/events/:eventId                    | YES   | Admin         | Remove one event                    | eventId                  | "Event deleted"    |  
</details>    

 <details>
<summary>:point_right: Contributions Endpoints</summary> 


In local we have to use this command to allow webhook to work:
- Linux
```./stripe listen --forward-to localhost:3000/api/contribution/webhook```
- Windows
```stripe listen --forward-to localhost:3000/api/contribution/webhook```
      
| METHOD | ENDPOINT                                                | TOKEN | ROLE          | DESCRIPTION                  | POST PARAMS              | RETURNS                  |
| ------ | ------------------------------------------------------  | ----- | ------------- | ---------------------------- | ------------------------ | ------------------------ |
| POST   | {{baseURL}}/contribution/checkout                       | YES   | User          | Show Stripe checkout         | req.body                 | [{ session }]            |
| POST   | {{baseURL}}/contribution/webhook                        | YES   | User          | Events from Stripe           | webhook                  | -                        |
| PUT    | {{baseURL}}/contributions/:contributionId               | YES   | Admin         | Update contribution          | req.body,req.params      | "Contribution updated"   |
| DELETE | {{baseURL}}/contributions/:contributionId               | YES   | Admin         | Remove one contrbution       | contributionId           | "Contribution deleted"   |
</details>

 <details>
<summary>:point_right: Materials Endpoints</summary> 

      
| METHOD | ENDPOINT                                                | TOKEN | ROLE          | DESCRIPTION                      | POST PARAMS              | RETURNS              |
| ------ | ------------------------------------------------------  | ----- | ------------- | -------------------------------- | ------------------------ | -------------------- |
| GET    | {{baseURL}}/materials                                   | YES   | Admin         | Get materials                    | -                        | [{ materials }]      |
| GET    | {{baseURL}}materials/:materialId                        | YES   | Admin         | Get one material by id           | req.params               | { material }         |       
| GET    | {{baseURL}}events/:eventId/materials                    | YES   | Admin         | Get materials of one event       | req.params               | [{ materials }]      |       
| POST   | {{baseURL}}/materials                                   | YES   | Admin         | Create one material              | req.body                 | { material }         |
| PUT    | {{baseURL}}/materials/:materialId                       | YES   | Admin         | Update one material by id        | req.body,req.params      | { material }         |
| PUT    | {{baseURL}}/events/:eventId/materials/:materialId       | YES   | Admin         | Update one material of one event | req.body,req.params      | { material }         |
| DELETE | {{baseURL}}/materials/:materialId                       | YES   | Admin         | Remove one material              | materialId               | "Material deleted"   |
</details>

