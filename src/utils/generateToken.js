import jwt from 'jsonwebtoken'

const generateToken = userId => {
    return jwt.sign({ user: userId }, 'thisisasecret', { expiresIn: '7 days'})
}

export default generateToken 

