# raml-autoroute
Tool for your routes, generators, ... based on raml definitions

## Installation

```bash
npm install raml-autoroute
```

## Usage

```javascript
var RamlAutoRoute = require('raml-autoroute')
var raml_definition_filepath = './raml/api.raml'

var auto_route = new RamlAutoRoute(raml_definition_filepath)
var routes_objects = auto_route.getRoutes()

console.log(JSON.stringify(routes_objects, null, 2))
```
