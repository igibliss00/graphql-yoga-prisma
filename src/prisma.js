import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466',
    secret: 'thisisasupersecretcode'
})

export default prisma

// prisma.query prisma.mutation prisma.subscription prisma.exists

// const createPostforUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId })

//     if(!userExists) {
//         throw new Error("User does not exist")
//     }
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published }}}')
//    return post.author
// }

// createPostforUser("cjv602555003y0797sd77kjb8", {
//     title: "User exists test",
//     body: "No body here",
//     published: true
// }).then(user => {
//     console.log("user", JSON.stringify(user, undefined , 2))
// }).catch(err => {
//     console.log("Error from createPostUser:", err.message)
// })

// const updatePostforUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({ id: postId })
//     if(!postExists) {
//         throw new Error("Post not found!")
//     }
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id name email posts { id title body }}}')
//     return post.author
// }

// updatePostforUser("cjv81gsew000g0797adf8yy5f", {
//     title: "Update Post Revised",
//     body: "Heyoooo"
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(err => {
//     console.log("Error from updatePostforUser: ", err.message)
// })