"use strict";
var RamlAutoRoute = require('./src/RamlAutoRoute')
var auto_route = new RamlAutoRoute('./raml/api.raml')

// console.log(JSON.stringify(auto_route.getRamlJsonSchema(), null, 2))
 // console.log(JSON.stringify(auto_route.getRoutes(), null, 2))
// var route_id = 'GetTestrouteId'
// var example = auto_route.getExample(route_id)

// console.log(JSON.stringify(example, null, 2))


var route_id = 'GetParamstestReadId'
var parameters = auto_route.getQueryParameters(route_id)


console.log(JSON.stringify(parameters, null, 2))
