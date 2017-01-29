"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class RamlAutoRoute {


    constructor(raml_file) {
        this.raml_file = raml_file
        this.raml_json_schema = ''
        this.flat_routes = []
        this.express_normalized_routes = []
        this.routes_with_controllers_name = []

        // Process the raml_file
        this.processRaml(this.raml_file)
        this.extractFlatRoutes()
        this.toExpressProcessRamlFlatRoutes()
        this.generateControllersNames()
    }

    getRamlJsonSchema() {
        return this.raml_json_schema
    }

    setRamlFile(raml_file) {
        this.raml_file = raml_file
    }

    processRaml() {
        var api = raml1Parser.loadApiSync(path.resolve(process.cwd(), this.raml_file));
        api.errors().forEach(function(x){
            console.log(JSON.stringify({
                code: x.code,
                message: x.message,
                path: x.path,
                start: x.start,
                end: x.end,
                isWarning: x.isWarning
            },null,2));
        });

        this.raml_json_schema = api.toJSON()
    }

    getRoutes() {
        return this.routes_with_controllers_name
    }

    extractFlatRoutes() {
        this.recursiveFindRoutes(this.raml_json_schema, "")
        // console.log(this.flat_routes)
    }


    getFlatRoutes() {
        return this.flat_routes
    }


    getExpressNormalizedRoutes() {
        return this.express_normalized_routes
    }


    toExpressProcessRamlFlatRoutes(){
        for(let flat_route of this.flat_routes) {
            let current_route = flat_route;

            current_route.express_uri = flat_route.absoluteUriFull
            // str = "/users/{id}/company/{company_id}/me";
            let result_str_match = flat_route.absoluteUriFull.match(/{(.*?)}/g)
            let result = []
            if (result_str_match !== null) {
                result = result_str_match.map(function(val){
                   return val
                })
            }
            for (let uri_param of result) {
                let formated_express_param = ':' + uri_param.replace('{', '').replace('}','')
                current_route.express_uri = current_route.express_uri.replace(uri_param, formated_express_param)
            }

            this.express_normalized_routes.push(current_route)
        }
    }


    recursiveFindRoutes(branch, version) {

        if (branch.version !== undefined) {
            version = branch.version
            this.raml_file_baseuri = branch.baseUri
        }

        if (branch.absoluteUri !== undefined && branch.methods !== undefined) {
            for(let method of branch.methods) {
                let current_route = {
                    verb: method.method,
                    absoluteUri: branch.absoluteUri,
                    absoluteUriFull: branch.absoluteUri.replace('{version}', version)
                }
                this.flat_routes.push(current_route)
            }
        }

        if (branch.resources !== undefined) {
            for (let resource of branch.resources)
            this.recursiveFindRoutes(resource, version)
        }
    }


    generateControllersNames() {
        for(let flat_route of this.express_normalized_routes) {
            let current_controller = flat_route;
            current_controller.controller_name = this.generateFieldControllerNameFromAbsoluteUri(current_controller.absoluteUri)
            this.routes_with_controllers_name.push(current_controller)
        }
    }


    // Auto Routes Fields buildes
    generateFieldControllerNameFromAbsoluteUri(absolute_uri) {
        let response = absolute_uri
        response = response.replace(this.raml_file_baseuri, "")
        response = response.replace(/\//g, "_")
        response = response.replace(/{/g, "_")
        response = response.replace(/}/g, "_")
        response = camelcase(response)
        response = ucfirst(response)
        return response
    }


    getGeneratedControllersName() {
        return this.routes_with_controllers_name
    }
}
