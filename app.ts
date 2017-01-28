import {Configuration} from './configurations/ConfigurationLoader'
import {Server} from './Server'
import {RamlAutoRoute} from './RamlAutoRoute'

let config:any = Configuration
var server = new Server()

// Load Raml Specification file
server.setRamlFile(config.raml_specification_file)
server.processRaml()

// Debug : print schema if true
let print_schema = false
// Here to get raml parsed
if (print_schema) {
    let ramljson = server.getRamlJsonSchema()
    console.log(JSON.stringify(ramljson, null, 2))
}

// Searching routes from raml file
let raml_auto_route = new RamlAutoRoute(server.getRamlJsonSchema())
raml_auto_route.extractFlatRoutes()

raml_auto_route.toExpressProcessRamlFlatRoutes()
//console.log(raml_auto_route.getExpressNormalizedRoutes())
raml_auto_route.generateControllersNames()
console.log(raml_auto_route.getGeneratedControllersName())

// Standart routes management (express)
server.app.get('/', function (req: any, res: any) {
    console.log(req)
    console.log(res)
    res.send('Hello World')
})

// Launching server
server.app.listen(config.application_port)
