"use strict";
var RamlAutoRoute = require('./src/RamlAutoRoute')
var auto_route = new RamlAutoRoute('./raml/api.raml')


//console.log(JSON.stringify(auto_route.getRamlJsonSchema(), null, 2))
console.log(JSON.stringify(auto_route.getRoutes(), null, 2))
