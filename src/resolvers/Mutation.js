import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        // data validation is actually not needed since Prisma does the job for us
        // const emailExists = await prisma.exists.User({ email: args.data.email })
        // if(emailExists) {
        //     throw new Error("User already exists!")
        // }

        // take in password -> validate password -> hash password -> genereate auth token
        if(args.data.password.length < 8) {
            throw new Error("Pasword must be 8 characters or longer")
        }

        const password = await bcrypt.hash(args.data.password, 10)

        const user = prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            } 
        })
        return { 
            user, 
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })
        if(!user) {
            throw new Error("Unable to login")
        }
        const isMatch = await bcrypt.compare(args.data.password, user.password)
        if(!isMatch) {
            throw new Error("Unable to login")
        }
        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }

    },
    async deleteUser(paret, args, { prisma, request }, info) {
        // no need to check, Prisma handles that verification with the @unique directive 
        // const userExists = await prisma.exists.User({ id: args.id })
        // if(!userExists) {
        //     throw new Err("User not found")
        // }
        const userId = getUserId(request)
        return prisma.mutation.deleteUser({ 
            where: {
                id: userId
            }
        }, info)
    }, 
    updateUser(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        return prisma.mutation.updateUser({ 
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    createPost(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }   
        })
        if(!postExists) {
            throw new Error("Unable to delete post!")
        }
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if(!postExists) {
            throw new Error("Unable to update the post")
        }

        const isPublished = prisma.exists.Post({
            id: args.id,
            published: true
        })

        if(isPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            })
        }
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createComment(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const postExists = prisma.exists.Post({
            id: args.data.post,
            published: true
        })

        if(!postExists) {
            throw new Error("Unable to find post")
        }
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
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
    updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })
        if(!commentExists) {
            throw new Error("Comment could not be updated")
        }
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    deleteComment(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const commentExists = prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })
        if(!commentExists) {
            throw new Error("Comment could not be updated")
        } 
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    }

}

export default Mutation