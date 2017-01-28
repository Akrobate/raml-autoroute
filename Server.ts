"use strict";
declare var require: any
declare var process: any

// import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
var raml1Parser = require('raml-1-parser');

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;
  private raml_file: string
  private raml_json_schema: any

  private flat_routes: any[]

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express()
    this.flat_routes = [];
  }

  /**
   * [setRamlFile description]
   * @param  {string} raml_file [description]
   * @return {[type]}           [description]
   */
  public setRamlFile(raml_file: string) {
      this.raml_file = raml_file
  }

  /**
   * [getRamlJsonSchema description]
   * @return {any} [description]
   */
  public getRamlJsonSchema(): any {
      return this.raml_json_schema
  }

  /**
   * [processRaml Parses the raml_file and put the result variable member]
   */
  public processRaml(): void {
      var api = raml1Parser.loadApiSync(path.resolve(process.cwd(), this.raml_file));
      api.errors().forEach(function(x: any){
          console.log(JSON.stringify({
              code: x.code,
              message: x.message,
              path: x.path,
              start: x.start,
              end: x.end,
              isWarning: x.isWarning
          },null,2));
      });

      this.raml_json_schema = api.toJSON()
  }

}
