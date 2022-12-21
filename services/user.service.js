const mongoose = require('../database/mongodb');
const { tryCatchHandler } = require('../helpers/error-handler');
const { DbAddUser, DbFindUser, DbCountUser } = require('../models/users');


const ServiceAddUser = tryCatchHandler(async (body) => {

    let a = await DbAddUser(body);

    return a;

});

const ServiceListUser = tryCatchHandler(async (body) => {

    var query = {}
    if (body.search)
        query['name'] = {$regex: body.search, '$options': 'i'}

    const totalRecords = await DbCountUser({
        query:query
    });
    let records = [];


    if (totalRecords) {
        records = await DbFindUser(
            {
                query: query,
                project: {},
                limit: body.limit,
                skip: body.skip,
                multiple: true,
                sort: body.sort
            }
        );
    }

    return {
        records,
        totalRecords
    };

});

module.exports = {
    ServiceAddUser,
    ServiceListUser
};
