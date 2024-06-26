const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Book{
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
}

type User {
    _id: Int
    username: String!
    email: String!
    bookCount: Int
    savedBooks:[Book]
}

type Auth{
    token: String!
    user: User
}

input bookInput{
    authors: [String!] 
    description: String! 
    title: String! 
    bookId: String! 
    image: String! 
    link:String!
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(info: bookInput): User
    removeBook(bookId: String!): User
}
`

module.exports = typeDefs