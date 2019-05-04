const Mutation = {
    async createUser(parent, args, { prisma },info) {
        const emailExists = await prism.exists.User({ email: email: args.data.email })
        // data validation is actually not needed since Prisma does the job for us
        if(emailExists) {
            throw new Error("User already exists!")
        }
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async deleteUser(paret, args, { prisma }, info) {
        const userExists = await prisma.exists.User({ id: args.id })
        if(!userExists) {
            throw new Err("User not found")
        }
        return prisma.mutation.deleteUser({ 
            where: {
                id: args.id
            }
        }, info)
    }, 
    updateUser(parent, args, { prisma }, info){
        return prisma.mutation.updateUser({ 
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    createPost(parent, args, { prisma }, info){
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma }, info){
        const postExists = await prisma.exists.Post({ id: args.id })
        if(!postExists) {
            throw new Error("Post not found!")
        }
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    updatePost(parent, args, { prisma }, info) {
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: data
        }, info)
    },
    createComment(parent, args, { prisma }, info){
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },
    updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: data
        }, info)
    },
    deleteComment(parent, args, { prisma }, info){
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    }

}