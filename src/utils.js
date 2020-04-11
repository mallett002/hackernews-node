const jwt = require('jsonwebtoken');
const APP_SECRET = '9425196B-3B6A-4F7F-85E9-45F30839E41C';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const {userId} = jwt.verify(token, APP_SECRET);

        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId
};