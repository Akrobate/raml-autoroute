"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");
let AutoRouteFormater = require('./AutoRouteFormater')

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class AutoRouteParams {

    constructor(flat_routes) {
        this.query_parameters = this.extractExamples(flat_routes)
        this._arf = new AutoRouteFormater()
    }

    getQueryParameters(route_id) {
        if (this.query_parameters.hasOwnProperty(route_id)) {
            return this.query_parameters[route_id]
        }
        return undefined
    }

    extractExamples(flat_routes) {
        let query_parameters_collection = {}

            let enriched_routes = [];
            for(let flat_route of flat_routes) {
                if (flat_route.hasOwnProperty('queryParameters')) {
                    query_parameters_collection[flat_route.route_id] = flat_route.queryParameters
                }
            }
        return query_parameters_collection
    }
}
