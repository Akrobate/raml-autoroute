# raml-autoroute
Tool for your routes, generators, ... based on RAML 1 definitions

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
