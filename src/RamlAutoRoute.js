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
        this.enriched_routes = []

        // Process the raml_file
        this.processRaml(this.raml_file)
        this.extractFlatRoutes()
        this.enriched_routes = this.enrichFlatRoutes()
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
        return this.enriched_routes
    }

    getFlatRoutes() {
        return this.flat_routes
    }

    extractFlatRoutes() {
        this.recursiveFindRoutes(this.raml_json_schema, "")
    }


    recursiveFindRoutes(branch, version) {

        if (branch.version !== undefined) {
            version = branch.version
            this.raml_file_baseuri = branch.baseUri
        }

        if (branch.absoluteUri !== undefined && branch.methods !== undefined) {
            let uriParameters

            for(let method of branch.methods) {
                // console.log(JSON.stringify(method, null, 2))
                let reponse_200 = method.responses['200']
                let current_route = {
                    verb: method.method,
                    absoluteUri: branch.absoluteUri,
                    absoluteUriFull: branch.absoluteUri.replace('{version}', version),
                    example: reponse_200.body['application/json'].example
                }

                if (branch.uriParameters !== undefined ) {
                    current_route.uriParameters = branch.uriParameters
                }

                this.flat_routes.push(current_route)
            }
        }

        if (branch.resources !== undefined) {
            for (let resource of branch.resources)
            this.recursiveFindRoutes(resource, version)
        }
    }

    // new version
    // to test
    enrichFlatRoutes() {
        let enriched_routes = [];
        for(let flat_route of this.flat_routes) {
            //console.log(flat_route)
            let enriched_route = {
                verb: flat_route.verb,
                absoluteUri: flat_route.absoluteUri,
                absoluteUriFull: flat_route.absoluteUriFull,
                example: flat_route.example,
                controller_name: this.generateFieldControllerNameFromAbsoluteUri(flat_route.absoluteUri),
                express_uri: this.generateExpressUrlFromAbsoluteUri(flat_route.absoluteUriFull),
                unique_route_id: this.generateUniqueRouteId(flat_route.absoluteUri, flat_route.verb)
            }
            enriched_routes.push(enriched_route)
        }
        return enriched_routes
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

    // New version generation
    generateExpressUrlFromAbsoluteUri(absolute_uri) {
        let express_uri = absolute_uri
        // str = "/users/{id}/company/{company_id}/me";
        let result_str_match = absolute_uri.match(/{(.*?)}/g)
        let result = []
        if (result_str_match !== null) {
            result = result_str_match.map(function(val){
               return val
            })
        }
        for (let uri_param of result) {
            let formated_express_param = ':' + uri_param.replace('{', '').replace('}','')
            express_uri = express_uri.replace(uri_param, formated_express_param)
        }
        return express_uri
    }


    generateUniqueRouteId(absolute_uri, verb) {
        return ucfirst(verb) + this.generateFieldControllerNameFromAbsoluteUri(absolute_uri)
    }

}
