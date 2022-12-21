const express = require('express');
const userRouter = express.Router();

const {
    add,
    list
} = require('../../controllers/user.ctrl');

const {
    asyncHandler
} = require('../../helpers/error-handler');


userRouter.post(
    '/',
    asyncHandler(add)
);

userRouter.post(
    '/search-sort',
    asyncHandler(list)
);

module.exports = userRouter;
