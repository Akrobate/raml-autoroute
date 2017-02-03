"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class AutoRouteExemples {

    constructor(flat_routes) {
        this.examples = {}

    }

    extractExamples(flat_routes) {
        let examples_collection = {}
        return examples_collection
    }

}
