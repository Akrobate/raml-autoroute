"use strict";

let raml1Parser = require('raml-1-parser');
let path = require("path");

module.exports = class RamlJsonParser {

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
}
