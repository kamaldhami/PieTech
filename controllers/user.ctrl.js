const {
    ServiceAddUser,
    ServiceListUser,
} = require('../services/user.service');

const mongoose = require('../database/mongodb');


const add = async (req, res) => {

    const {
        body
    } = req;

    const response = await ServiceAddUser(body);

    res.status(201).json({ message: "success", data: response });

};


const list = async (req, res) => {

    const {
        q,
        p,
        s,
        o,
        l,
        search
    } = req.body;

    response = await ServiceListUser(
        {
            query: q || {},
            project: p || {},
            sort: s || {},
            skip: o || 0,
            limit: l || 10,
            search:search
        }
    );

    res.status(200).json(
        {
            message: "success",
            data: response
        }
    );

};



module.exports =
{
    add,
    list
};
