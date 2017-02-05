// var exec = require('exec');
var Bluebird = require('bluebird')
var raml = require('raml-1-parser')
var raml_test_filepath = './raml/api.raml'

describe('RamlCop Test', () => {
    it('Check that raml file is valid', (done) => {
        Bluebird
        .resolve(raml.loadRAML(raml_test_filepath, [], { rejectOnErrors: true }))
        .then(() => {
            done()
        })
        .catch((err) => {
            throw new Error('RamlCop unvalid')
        })
    })
})
