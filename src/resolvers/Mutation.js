const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {APP_SECRET, getUserId} = require('../utils');

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({...args, password});
    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {token, user};
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({email: args.email});

    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {token, user};
}

function post(parent, args, context, info) {
    const userId = getUserId(context);

    if (userId) {
        try {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
                postedBy: {connect: {id: userId}}
            });
        } catch(error) {
            throw new Error(error);
        }
    }

    throw new Error('User id not found');
}

async function updateLink(parent, args, context, info) {
    const isAuthorized = getIsAuthorized(context);

    if (isAuthorized) {
        const {id, ...data} = args;

        try {
            return await context.prisma.updateLink({
                data,
                where: {id}
            });
        } catch(error) {
            throw new Error(error);
        }
    }
}

async function deleteLink(parent, args, context, info) {
    const isAuthorized = getIsAuthorized(context);

    if (isAuthorized) {
        try {
            return await context.prisma.deleteLink({id: args.id});
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = {
    signup,
    login,
    post,
    updateLink,
    deleteLink
};

