'use strict'
var RamlAutoRoute = require('../index')

var raml_test_filepath = './raml/api.raml'

var test_route_object = {
    route_id: 'GetTestrouteId',
    verb: 'get',
    absoluteUri: '/{version}/testroute/{id}',
    absoluteUriFull: '/v1/testroute/{id}',
    express_uri: '/v1/testroute/:id',
    controller_name: 'TestrouteId',
}



describe('RamlAutoRoute Test --------------- PARAMS to implement', () => {

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
})
