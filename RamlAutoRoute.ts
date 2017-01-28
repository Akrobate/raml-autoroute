"use strict";
// declare var require: any
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");

// declare var process: any

// import * as bodyParser from "body-parser";
// import * as express from "express";
// import * as path from "path";
// var raml1Parser = require('raml-1-parser');

/**
 * The RamlAutoRoute.
 *
 * @class RamlAutoRoute
 */
export class RamlAutoRoute {

    private raml_json_schema: any;
    private flat_routes: any[];
    private express_normalized_routes: any []
    private routes_with_controllers_name: any[]
    private raml_file_baseuri: string;

    constructor(raml_json_schema: any) {
        this.raml_json_schema = raml_json_schema
        this.flat_routes = [];
        this.express_normalized_routes = [];
        this.routes_with_controllers_name = [];
    }


    public extractFlatRoutes() {
        this.recursiveFindRoutes(this.raml_json_schema, "")
        // console.log(this.flat_routes)
    }

    public getFlatRoutes() {
        return this.flat_routes
    }

    public getExpressNormalizedRoutes() {
        return this.express_normalized_routes
    }

    public toExpressProcessRamlFlatRoutes(){
        for(let flat_route of this.flat_routes) {
            let current_route: any = flat_route;

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


    public recursiveFindRoutes(branch: any, version: string) {

        if (branch.version !== undefined) {
            version = branch.version
            this.raml_file_baseuri = branch.baseUri
        }

        if (branch.absoluteUri !== undefined && branch.methods !== undefined) {
            for(let method of branch.methods) {
                let current_route: any = {
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


    public generateControllersNames() {
        for(let flat_route of this.express_normalized_routes) {
            let current_controller: any = flat_route;
            current_controller.controller_name = this.generateFieldControllerNameFromAbsoluteUri(current_controller.absoluteUri)
            this.routes_with_controllers_name.push(current_controller)
        }
    }


    // Auto Routes Fields buildes
    private generateFieldControllerNameFromAbsoluteUri(absolute_uri: string): string {
        let response: string = absolute_uri
        response = response.replace(this.raml_file_baseuri, "")
        response = response.replace(/\//g, "_")
        response = response.replace(/{/g, "_")
        response = response.replace(/}/g, "_")
        response = camelcase(response)
        response = ucfirst(response)
        return response
    }
/*
    private generateFieldabsoluteUriFull(absolute_uri: string, version: string): string {

    }
*/

    public getGeneratedControllersName() {
        return this.routes_with_controllers_name
    }

}
