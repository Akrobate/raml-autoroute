"use strict";

var RamlAutoRoute = require('./src/RamlAutoRoute')
var raml_auto_route = new RamlAutoRoute('./raml/api.raml')

console.log(raml_auto_route.getGeneratedControllersName())

console.log("in index.js")
