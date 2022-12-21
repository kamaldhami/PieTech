const mongoose = require('../database/mongodb');

let userSchema = mongoose.Schema({
    name: { type: String, maxlength: 255 },
    age: { type: Number },
    created_at: { type: Date, default: Date.now }
});

let User = null;

try {
    User = mongoose.model('users');
}
catch (error) {
    User = mongoose.model('users', userSchema);
}

const {
    tryCatchHandler
} = require('../helpers/error-handler');

const DbAddUser = tryCatchHandler(async (body) => {
    const user = new User(body);
    return await user.save();
});

const DbFindUser = tryCatchHandler(async (body) => {

    let {
        multiple,
        query,
        project,
        sort,
        limit,
        skip
    } = body;

    multiple = multiple || false;
    query = query || {};
    project = project || {};
    sort = sort || {};
    limit = limit || 0;
    skip = skip || 0;

    let records = [];

    if (multiple) {
        records = await User.find(query, project).sort(sort).skip(skip).limit(limit).lean();
    } else {
        records = await User.findOne(query, project).lean();
    }

    return records;
});

const DbCountUser = tryCatchHandler(async (body) => {

    const {
        query,
    } = body;

    const res = await User.count(query).lean();

    return res;
});

module.exports = {
    DbAddUser,
    DbFindUser,
    DbCountUser
};
