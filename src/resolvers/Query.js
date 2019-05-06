import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    myPosts(parent, args, { prisma, request}, info) {
        const userId = getUserId(request)
        if(!userId) {
            throw new Error("Needs to be logged in")
        }
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }
        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
    // const allPosts = await prisma.query.posts({
    //     where: {
    //         author: {
    //         id: userId
    //         },
    //         OR: [
    //         {
    //             published: published
    //         },
    //         {
    //             title_contains: find
    //         },
    //         {
    //             body_contains: find
    //         }
    //         ]
    //     }
    //     })
        const opArgs = {
            where: {
                published: true
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    },
    me(parent, args, { prisma, request}, info) {
        const userId = getUserId(request, true)

        return prisma.query.user({
            id: userId
        }, info)
    },
    async post(parent, args, { prisma, request }) {
        const userId = getUserId(request, false)
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        })
        if(posts.length === 0) {
            throw new Error("Post not found!")
        }
        return posts[0]
    }   
}
export { Query as default }