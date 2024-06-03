const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {resolvers, typeDefs} = require('./schema');
const { authMiddleware } = require('./utils/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

async function startServer() {

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  app.use(
    expressMiddleware(server,{context: authMiddleware})
  )

  app.listen(PORT, () => {
      console.log(`🚀 Express Server ready at`, PORT)
      console.log('GraphQL ready at', server.graphqlPath)
  }
  )
}

startServer()
