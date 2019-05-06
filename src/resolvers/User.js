import getUserId from '../utils/getUserId'

const User = {
    // You don't need any of the following because
    // the argument "info" argument includes all the info regarding
    // the fields and the relationship requested
    // posts(parent, args, { db }, info) {
    //     return db.posts.filter(post => {
    //         return post.author === parent.id
    //     })
    // },
    // comments(parent, args, { db }, info) {
    //     return db.comments.filter(comment => {
    //         return comment.author === parent.id
    //     })
    // }
    email(parent, args, { request }, info) {
        const userId = getUserId(request)
        if (userId && userId === parent.id) {
            return parent.email
        } else {
            return null
        }
    }
}

export default User