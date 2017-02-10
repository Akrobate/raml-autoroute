'use strict';
var RamlAutoRoute = require('./src/RamlAutoRoute')
var AutoRouteUses = require('./src/AutoRouteUses')
var auto_route = new RamlAutoRoute('./raml/api.raml')

//            _            __ _     _            _
//         __| |_ __ __ _ / _| |_  | |_ ___  ___| |_
//        / _` | '__/ _` | |_| __| | __/ _ \/ __| __|
//       | (_| | | | (_| |  _| |_  | ||  __/\__ \ |_
//        \__,_|_|  \__,_|_|  \__|  \__\___||___/\__|


// console.log(JSON.stringify(auto_route.getRamlJsonSchema(), null, 2))
// console.log(JSON.stringify(auto_route.getRoutes(), null, 2))
// console.log(JSON.stringify(auto_route.getFlatRoutes(), null, 2))

// var route_id = 'GetTestrouteId'
// var example = auto_route.getExample(route_id)
// console.log(JSON.stringify(example, null, 2))


// var route_id = 'GetParamstestReadId'
// var parameters = auto_route.getQueryParameters(route_id)
// console.log(JSON.stringify(parameters, null, 2))

let auto_route_uses = new AutoRouteUses({raml_file: './raml/types/paramsTest.raml'})
let t = auto_route_uses.processRaml('./raml/types/paramsTest.raml')
console.log(JSON.stringify(t, null, 2))
console.log(JSON.stringify(auto_route_uses, null, 2))
