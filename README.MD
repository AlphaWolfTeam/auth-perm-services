# UserAPI

## HTTP Requests

| HTTP REQUEST | DEFINITION | PERMISSION |
| ----------- | --------------- | --------------- |
| ALL /*       | General UserAPI Access |0|
| ALL /api/schema       | General SchemaAPI Access |0|
| ALL /api/instance       | General InstanceAPI Access |0|
| GET /api/user       | Get users list |1|
| GET /api/user/[current]     |  Get current connected user | 2| 
| GET /api/user/[id]     |  Get user by id | 3| 
| POST /api/user       | Create user |4|
| PUT /api/user       | Update user |5|
| DELETE /api/user/[id]       | Delete user by id |6|

## User Interface

    {
        adfsId: string,
        name?: string,
        permission: number[]
    }

## Request & Response Examples
  
### GET /api/user

Response body:
[
    {
        "adfsId": "t12345678@deadpool.com",
        "name": "Wade Winston Wilson",
        "permission": [
            0,
            1,
            2,
            4,
            3,
            5
        ]
    },
    {
        "adfsId": "t69698854@jarvis.com",
        "name": "Toni Stark",
        "permission": [
            0,
            2,
            4,
            6,
            8
        ]
    }
]
    
### GET /api/user/[id]

Response body:

    {
        "adfsId": "t69698854@jarvis.com",
        "name": "Toni Stark",
        "permission": [
            0,
            2,
            4,
            6,
            8
        ]
    }
    

### POST /api/user

Request body:

  "newUser": {
      "adfsId": "a123",
      "name": "rafiki",
      "permission": [0, 8, 10]
  }
    
### PUT /api/user/[id]

Request body:

  "userDetails": {
      "adfsId": "a123",
      "name": "new rafiki",
      "permission": [0, 3]
  }

