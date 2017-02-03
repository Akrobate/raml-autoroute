"use strict";
// declare var require
let camelcase = require("camelcase");
let ucfirst = require("ucfirst");
let raml1Parser = require('raml-1-parser');
let path = require("path");

module.exports = class AutoRouteFormater {

    // Auto Routes Fields buildes
    generateFieldControllerNameFromAbsoluteUri(absolute_uri, raml_file_baseuri) {
        let response = absolute_uri
        response = response.replace(raml_file_baseuri, "")
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


    generateUniqueRouteId(absolute_uri, verb, raml_file_baseuri) {
        return ucfirst(verb) + this.generateFieldControllerNameFromAbsoluteUri(absolute_uri, raml_file_baseuri)
    }

}
