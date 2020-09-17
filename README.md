# SchemaApi

## HTTP Requests

| HTTP REQUEST | DEFINITION            | 
| ----------- | --------------- |
| GET /         | Shraga authentication => Permission check => proxy to client |
| GET /api/currentuser       | Get current logged in user with permission data |
| GET /api/getuserbyid       | Get permission user data by adfs id |
| POST /api/adduser       | Add a new permission user |
| PUT /api/edituser       | Edit user permission data |
| DELETE /api/deleteuser       | Delete permission user |


## Permission User Interface

    {
        adfsId: String,
        name?: String,
        permission: Number
    }

## Permission Field Options

* 0 = Default viewer user - Access to system proxy to client
* 1 = Admin user - Can edit content
* 2 = Super user

### API Access
* Only user with permission type 2 can access the api's endpoints

## Request & Response Examples
  
### GET /api/schema/[id]

Response body:

    {
        "schemaProperties": [
            "5f60f0b30f0b504044b149bb"
        ],
        "_id": "5f60f0b30f0b504044b149bc",
        "schemaName": "Schema1",
        "permissions": "schema premissions",
        "createdAt": "2013-10-01T00:00:00.000Z",
        "updatedAt": "2013-10-01T00:00:00.000Z",
        "__v": 0
    }
    
### GET /api/schema

Response body:

    [
        {
            "schemaProperties": [
                "5f60f0b30f0b504044b149bb"
            ],
            "_id": "5f60f0b30f0b504044b149bc",
            "schemaName": "Schema1",
            "permissions": "schema premissions",
            "createdAt": "2013-10-01T00:00:00.000Z",
            "updatedAt": "2013-10-01T00:00:00.000Z",
            "__v": 0
        },
        {
            "schemaProperties": [
                "5f60f0b30f0b504044b149bc"
            ],
            "_id": "5f60f0b30f0b504044b149bd",
            "schemaName": "Schema2",
            "permissions": "schema premissions",
            "createdAt": "2013-10-01T00:00:00.000Z",
            "updatedAt": "2013-10-01T00:00:00.000Z",
            "__v": 0
        }
    ]
    
### POST /api/schema

Request body:

    {
     "schemaName": "Schema1",
     "schemaProperties":[
        {
           "propertyName":"property1",
           "propertyType":"Number",
           "defaultValue":1,
           "propertyRef":"property ref",
           "enum":[
              1,
              2,
              3
           ],
           "isUnique":true,
           "index":true,
           "required":true,
           "createdAt":"2013-10-01T00:00:00.000Z",
           "updatedAt":"2013-10-01T00:00:00.000Z"
        }
      ],
      "permissions":"schema premissions",
      "createdAt":"2013-10-01T00:00:00.000Z",
      "updatedAt":"2013-10-01T00:00:00.000Z"
    }
    
### PUT /api/schema/[id]

Request body:

    {
     "schemaName": "NewSchema1",
     "schemaProperties":[
        {
           "propertyName":"newProperty1",
           "propertyType":"Number",
           "defaultValue":1,
           "propertyRef":"property ref",
           "enum":[
              1,
              2,
              3
           ],
           "isUnique":true,
           "index":true,
           "required":true,
           "createdAt":"2013-10-01T00:00:00.000Z",
           "updatedAt":"2013-10-01T00:00:00.000Z"
        }
      ],
      "permissions":"schema premissions",
      "createdAt":"2013-10-01T00:00:00.000Z",
      "updatedAt":"2013-10-01T00:00:00.000Z"
    }  
    
## Http Errors

Error responses includes a common HTTP status code, error name and message for the developer. For example:

    {
    "name": "InvalidId",
    "message": "Invalid id",
    "status": 404
    }

Error codes and meanings:
* 200 - OK
* 400 - Bad Request
* 404 - User Error
* 500 - Internal Server Error
