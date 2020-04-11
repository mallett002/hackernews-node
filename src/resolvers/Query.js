const {getIsAuthorized, getUserId} = require('../utils');

function feed(parent, args, context, info) {
    getIsAuthorized(context);

    try {
        return context.prisma.links()
    } catch(error) {
        throw new Error(error);
    }
}

function linksForUser(parent, args, context, info) {
    const userId = getUserId(context);
 
    try {
        return context.prisma.user({id: userId}).links();
    } catch(error) {
        throw new Error(error);
    }
}

module.exports = {
    feed,
    linksForUser
};