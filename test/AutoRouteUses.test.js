// var exec = require('exec');
// var raml = require('raml-1-parser')
var raml_test_filepath = './raml/type/user.raml'
var RamlAutoRoute = require('../index')

var test_route_object = {
    route_id: 'GetTestrouteId',
    verb: 'get',
    absoluteUri: '/{version}/testroute/{id}',
    absoluteUriFull: '/v1/testroute/{id}',
    express_uri: '/v1/testroute/:id',
    controller_name: 'TestrouteId',
}

describe('RamlRouteUses Test', () => {
    it('Check extractet uses is correct', (done) => {
        var raml_auto_route = new RamlAutoRoute(raml_test_filepath)
        done()

        throw new Error('extractet uses dismatch')

    })
})
