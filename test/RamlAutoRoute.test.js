'use strict'
var RamlAutoRoute = require('../index')

var raml_test_filepath = './raml/api.raml'

var test_route_object = {
    verb: 'get',
    absoluteUri: '/{version}/testroute/{id}',
    absoluteUriFull: '/v1/testroute/{id}',
    express_uri: '/v1/testroute/:id',
    controller_name: 'TestrouteId'
}

describe('RamlAutoRoute Test', () => {

    it('Check that absoluteUri is correctly formed', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var routes_list = raml_auto_route.getRoutes()
        for (let route of routes_list) {
            if (route.absoluteUri == test_route_object.absoluteUri) {
                done();
            }
        }
        throw new Error('Test route not found absoluteUri dismatch')
    })

    it('Check that absoluteUriFull is correctly formed', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var routes_list = raml_auto_route.getRoutes()

        for (let route of routes_list) {
            if (route.absoluteUriFull == test_route_object.absoluteUriFull) {
                done();
            }
        }
        throw new Error('Test route not found absoluteUriFull dismatch')
    })

    it('Check that express_uri is correctly formed', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var routes_list = raml_auto_route.getRoutes()

        for (let route of routes_list) {
            if (route.express_uri == test_route_object.express_uri) {
                done();
            }
        }
        throw new Error('Test route not found express_uri dismatch')
    })

    it('Check that controller_name is correctly formed', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        var routes_list = raml_auto_route.getRoutes()

        for (let route of routes_list) {
            if (route.controller_name == test_route_object.controller_name) {
                done();
            }
        }
        throw new Error('Test route not found controller_name dismatch')
    })

})
