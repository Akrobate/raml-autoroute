# raml-autoroute
Module to easily work with RAML1 specification in order to integrate dynamic checks, routing and controls in your API server implementation.

## Installation

```bash
npm install raml-autoroute
```

## Testing

```bash
cd /your/node/modules/path/raml-autoroute
npm install
npm test
```

## Usage

### Extracting all routes from a RAML

Getting all routes in an array extracted from a RAML1 file. You can check the [RAML specification used for this example](https://github.com/Akrobate/raml-autoroute/tree/master/raml) in the repository


```javascript
var RamlAutoRoute = require('raml-autoroute')
var raml_definition_filepath = './raml/api.raml'

var auto_route = new RamlAutoRoute(raml_definition_filepath)
var routes_objects = auto_route.getRoutes()

console.log(JSON.stringify(routes_objects, null, 2))

/** output
[
    {
    "route_id": "GetTestrouteId",
    "verb": "get",
    "absoluteUri": "/{version}/testroute/{id}",
    "absoluteUriFull": "/v1/testroute/{id}",
    "controller_name": "TestrouteId",
    "express_uri": "/v1/testroute/:id"
    },
    {
    "route_id": "GetParamstestReadId",
    "verb": "get",
    "absoluteUri": "/{version}/paramstest/read/{id}",
    "absoluteUriFull": "/v1/paramstest/read/{id}",
    "controller_name": "ParamstestReadId",
    "express_uri": "/v1/paramstest/read/:id"
    }
]
*/

```

### Extracting an example for a given route

Getting example for a route extracted from a RAML1 specification. You can check the [RAML specification used for this example](https://github.com/Akrobate/raml-autoroute/tree/master/raml) in the repository

```javascript
var RamlAutoRoute = require('raml-autoroute')
var raml_definition_filepath = './raml/api.raml'

var auto_route = new RamlAutoRoute(raml_definition_filepath)

var route_id = 'GetTestrouteId'
var example = auto_route.getExample(route_id)

console.log(JSON.stringify(example, null, 2))

/** output
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "jeandupont@exemple.com",
  "created_at": "2016-03-01T10:10:10Z",
  "updated_at": "2017-03-01T10:10:10Z"
}
*/

```

### Extracting query parameters for a given route (unstable)

Getting query parameters for a route extracted from a RAML1 specification. You can check the [RAML specification used for this example](https://github.com/Akrobate/raml-autoroute/tree/master/raml) in the repository

```javascript
var RamlAutoRoute = require('raml-autoroute')
var raml_definition_filepath = './raml/api.raml'

var auto_route = new RamlAutoRoute(raml_definition_filepath)

var route_id = 'GetTestrouteId'
var parameters = auto_route.getQueryParameters(route_id)

console.log(JSON.stringify(parameters, null, 2))

/** output
{
  "parameter1name": {
    "name": "parameter1name",
    "displayName": "String parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "string"
    ],
    "example": "Value String parameter",
    "required": false,
    "description": "The String parameter",
    "structuredExample": {
      "value": "Value String parameter",
      "strict": true,
      "name": null,
      "structuredValue": "Value String parameter"
    }
  },
  "parameter2name": {
    "name": "parameter2name",
    "displayName": "number parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "number"
    ],
    "example": 1984,
    "required": false,
    "description": "the number parameter",
    "structuredExample": {
      "value": "1984",
      "strict": true,
      "name": null,
      "structuredValue": 1984
    }
  },
  "parameterIsbn": {
    "name": "parameterIsbn",
    "displayName": "ISBN parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "string"
    ],
    "example": "0321736079?",
    "required": false,
    "minLength": 10,
    "structuredExample": {
      "value": "0321736079?",
      "strict": true,
      "name": null,
      "structuredValue": "0321736079?"
    }
  }
}
*/

```
