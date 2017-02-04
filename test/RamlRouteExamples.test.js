'use strict'
var RamlAutoRoute = require('../index')

var raml_test_filepath = './raml/api.raml'

var example = {
  "id": 1,
  "name": "Jean Dupont",
  "email": "jeandupont@exemple.com",
  "created_at": "2016-03-01T10:10:10Z",
  "updated_at": "2017-03-01T10:10:10Z"
}


describe('RamlRouteExample Test', () => {

    it('Check that GetTestrouteId example is correct', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var gotten_example = raml_auto_route.getExample('GetTestrouteId')
        if ((example.name == gotten_example.name) &&
            (example.email == gotten_example.email)) {
            done()
        } else {
            throw new Error('GetTestrouteId example dismatch')
        }
    })

    it('must not return example for UnexistingRouteId', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var gotten_example = raml_auto_route.getExample('UnexistingRouteId')
        if (gotten_example === undefined) {
            done()
        } else {
            throw new Error('GetTestrouteId example dismatch')
        }
    })
})
