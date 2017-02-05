"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");
let AutoRouteFormater = require('./AutoRouteFormater')

// import * as bodyParser from "body-parser";
// import * as express from "express";

module.exports = class AutoRouteUses {

    constructor(flat_routes, raml_json_schema) {
        this.uses = {}
        this.raml_json_schema = raml_json_schema
        this.uses = this.extractUses(flat_routes)
        this._arf = new AutoRouteFormater()
    }

    getUses(uses_name) {
        if (this.uses.hasOwnProperty(uses_name)) {
            return this.uses[uses_name]
        }
        return undefined
    }

    extractUses(raml_json_schema) {

    }
}
