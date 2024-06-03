const {User} = require('../models')
const {authMiddleware, signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        async me(_,args){

        }
    },
    Mutation:{
        async login(_,args){
            const user = await User.findOne({email: args.email})
            const correctPw = await user.isCorrectPassword(args.password);
            const token = signToken(user)
            return {token: token, user: user}
        },
        async addUser(_,args){
            const user = await User.create(args)
            const token = signToken(user)
            return {token: token, user: user}
        },
        async saveBook(_,args,context){

        },
        async removeBook(_,args,context){

        }
    }
}

module.exports = resolvers