'use strict';

let RamlJsonParser = require('./RamlJsonParser')

module.exports = class AutoRouteUses {

    // raml_json_schema

    constructor(options) {
        let load_all = false
        let raml_file = options.raml_file;
        if ((options.load_all !== undefined) && options.load_all) {
            load_all = true
        }
        this.uses = {}
        this._ar_parser = new RamlJsonParser();
    }


    processRaml(raml_file) {
        let raml_json_schema = this._ar_parser.processRaml(raml_file)
        // this.uses = this.extractUses(raml_json_schema)
        return raml_json_schema
    }


    processRecursive(raml_file) {

    }

    getUses(uses_name) {
        if (this.uses.hasOwnProperty(uses_name)) {
            return this.uses[uses_name]
        }
        return undefined
    }

    extractUses(raml_json_schema) {
        this.uses = raml_json_schema.uses
    }

    enrichUses(uses) {
        let uses_enriched = []
        for (use of uses) {
            uses_enriched.push(use)
        }
        return uses_enriched
    }

}
