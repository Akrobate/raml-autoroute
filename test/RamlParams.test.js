'use strict'
var RamlAutoRoute = require('../index')

var raml_test_filepath = './raml/api.raml'

var test_route_object = {
  "parameter1name": {
    "name": "parameter1name",
    "displayName": "String parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "string"
    ],
    "example": "Value String parameter",
    "required": false,
    "description": "The String parameter",
    "structuredExample": {
      "value": "Value String parameter",
      "strict": true,
      "name": null,
      "structuredValue": "Value String parameter"
    }
  },
  "parameter2name": {
    "name": "parameter2name",
    "displayName": "number parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "number"
    ],
    "example": 1984,
    "required": false,
    "description": "the number parameter",
    "structuredExample": {
      "value": "1984",
      "strict": true,
      "name": null,
      "structuredValue": 1984
    }
  },
  "parameterIsbn": {
    "name": "parameterIsbn",
    "displayName": "ISBN parameter",
    "typePropertyKind": "TYPE_EXPRESSION",
    "type": [
      "string"
    ],
    "example": "0321736079?",
    "required": false,
    "minLength": 10,
    "structuredExample": {
      "value": "0321736079?",
      "strict": true,
      "name": null,
      "structuredValue": "0321736079?"
    }
  }
}

describe('AutoRouteParams Test', () => {
    it('Check that getQueryParameters correctly formed', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var params = raml_auto_route.getQueryParameters('GetParamstestReadId')

        if (params.hasOwnProperty('parameter1name')) {
            done()
        } else {
                throw new Error('getQueryParameters dismatch: dont has parameter1name')
        }
    })
})
