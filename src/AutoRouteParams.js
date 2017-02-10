'use strict';

module.exports = class AutoRouteParams {

    constructor(flat_routes) {
        this.query_parameters = this.extractParameters(flat_routes)
    }

    getQueryParameters(route_id) {
        if (this.query_parameters.hasOwnProperty(route_id)) {
            return this.query_parameters[route_id]
        }
        return undefined
    }

    extractParameters(flat_routes) {
        let query_parameters_collection = {}
            let enriched_routes = [];
            for(let flat_route of flat_routes) {
                if (flat_route.hasOwnProperty('queryParameters')) {
                    query_parameters_collection[flat_route.route_id] = flat_route.queryParameters
                }
            }
        return query_parameters_collection
    }
}
