"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");

let AutoRouteFormater = require('./AutoRouteFormater')
let AutoRouteExamples = require('./AutoRouteExamples')
let AutoRouteParams = require('./AutoRouteParams')
let AutoRouteUses = require('./AutoRouteUses')

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class RamlAutoRoute {

//   ____  _   _ ____  _     ___ ____
//  |  _ \| | | | __ )| |   |_ _/ ___|
//  | |_) | | | |  _ \| |    | | |
//  |  __/| |_| | |_) | |___ | | |___
//  |_|    \___/|____/|_____|___\____|

    constructor(raml_file) {
        this.raml_file = raml_file
        this.flat_routes = []
        this.enriched_routes = []
        this.raml_json_schema = this.processRaml(this.raml_file)
        this._arf = new AutoRouteFormater()

        // Process the raml_file
        this.extractFlatRoutes(this.raml_json_schema)
        this.enriched_routes = this.enrichFlatRoutes(this.flat_routes)

        this._are = new AutoRouteExamples(this.flat_routes)
        this._arp = new AutoRouteParams(this.raml_json_schema)
        this._aru = new AutoRouteUses(this.flat_routes)
    }

    getRoutes() {
        return this.enriched_routes
    }

    getExample(route_id) {
        return this._are.getExample(route_id)
    }

    getQueryParameters(route_id) {
        return this._arp.getQueryParameters(route_id)
    }

//   ____  ____  _____     ___  _____ _____
//  |  _ \|  _ \|_ _\ \   / / \|_   _| ____|
//  | |_) | |_) || | \ \ / / _ \ | | |  _|
//  |  __/|  _ < | |  \ V / ___ \| | | |___
//  |_|   |_| \_\___|  \_/_/   \_\_| |_____|

    getRamlJsonSchema() {
        return this.raml_json_schema
    }

    setRamlFile(raml_file) {
        this.raml_file = raml_file
    }

    processRaml(raml_file) {
        var api = raml1Parser.loadApiSync(path.resolve(process.cwd(), raml_file));
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
        return api.toJSON()
    }


    getFlatRoutes() {
        return this.flat_routes
    }

    extractFlatRoutes(raml_json_schema) {
        this.recursiveFindRoutes(raml_json_schema, "")
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
                    route_id: this._arf.generateUniqueRouteId(branch.absoluteUri, method.method, this.raml_file_baseuri),
                    verb: method.method,
                    absoluteUri: branch.absoluteUri,
                    absoluteUriFull: branch.absoluteUri.replace('{version}', version),
                    example: reponse_200.body['application/json'].example,
                    queryParameters: method.queryParameters
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
    enrichFlatRoutes(flat_routes) {
        let enriched_routes = [];
        for(let flat_route of flat_routes) {
            //console.log(flat_route)
            let enriched_route = {
                route_id: flat_route.route_id,
                // route_id: this._arf.generateUniqueRouteId(flat_route.absoluteUri, flat_route.verb, this.raml_file_baseuri),
                verb: flat_route.verb,
                queryParameters: flat_route.queryParameters,
                absoluteUri: flat_route.absoluteUri,
                absoluteUriFull: flat_route.absoluteUriFull,
                // example: flat_route.example,
                controller_name: this._arf.generateFieldControllerNameFromAbsoluteUri(flat_route.absoluteUri, this.raml_file_baseuri),
                express_uri: this._arf.generateExpressUrlFromAbsoluteUri(flat_route.absoluteUriFull),
            }
            enriched_routes.push(enriched_route)
        }
        return enriched_routes
    }
}
