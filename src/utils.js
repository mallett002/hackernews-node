const jwt = require('jsonwebtoken');
const APP_SECRET = '9425196B-3B6A-4F7F-85E9-45F30839E41C';

function getIsAuthorized({request}) {
    const Authorization = request.get('Authorization');

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');

        return jwt.verify(token, APP_SECRET);
    }

    throw new Error('Not authorized');
}

function getUserId(context) {
    const {userId} = getIsAuthorized(context);

    if (userId) {
        return userId;
    }

    throw new Error('No user id found');
}

module.exports = {
    APP_SECRET,
    getUserId,
    getIsAuthorized
};
