"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");
let AutoRouteFormater = require('./AutoRouteFormater')

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class AutoRouteExemples {

    constructor(flat_routes) {
        this.examples = this.extractExamples(flat_routes)
        this._arf = new AutoRouteFormater()
    }

    getExample(route_id) {
        if (this.examples.hasOwnProperty(route_id)) {
            return this.examples[route_id]
        }
        return undefined
    }

    extractExamples(flat_routes) {
        let examples_collection = {}

            let enriched_routes = [];
            for(let flat_route of flat_routes) {
                if (flat_route.hasOwnProperty('example')) {
                    examples_collection[flat_route.route_id] = flat_route.example
                }
            }
        return examples_collection
    }
}
