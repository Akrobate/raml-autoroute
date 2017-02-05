"use strict";

let RamlJsonParser = require('./RamlJsonParser')

module.exports = class AutoRouteUses {

    constructor(flat_routes, raml_json_schema) {
        this.uses = {}
        this.raml_json_schema = raml_json_schema
        this.uses = this.extractUses(flat_routes)
        this._ar_parser = new RamlJsonParser();
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
