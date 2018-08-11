const fromEvent = require('graphcool-lib').fromEvent
const bcryptjs = require('bcryptjs')
const validator = require('validator')

const userQuery = `
query UserQuery($username: String!) {
  User(username: $username){
    id
    password
  }
}`

const createUserMutation = `
mutation CreateUserMutation($username: String!, $passwordHash: String!) {
  createUser(
    username: $username,
    password: $passwordHash
  ) {
    id
  }
}`

const getGraphcoolUser = (api, username) => {
  return api.request(userQuery, { username })
    .then(userQueryResult => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error)
      } else {
        return userQueryResult.User
      }
    })
}

const createGraphcoolUser = (api, username, passwordHash) => {
  return api.request(createUserMutation, { username, passwordHash })
    .then(userMutationResult => {
      return userMutationResult.createUser.id
    })
}

module.exports = function(event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: 'Username Signup not configured correctly.'}
  }

  // Retrieve payload from event
  const username = event.data.username
  const password = event.data.password

  // Create Graphcool API (based on https://github.com/graphcool/graphql-request)
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  const SALT_ROUNDS = 10
  const salt = bcryptjs.genSaltSync(SALT_ROUNDS);

  // if (validator.isEmail(email)) {
    return getGraphcoolUser(api, username)
      .then(graphcoolUser => {
        if (!graphcoolUser) {
          return bcryptjs.hash(password, salt)
            .then(hash => createGraphcoolUser(api, username, hash))
        } else {
          return Promise.reject('username already in use')
        }
      })
      .then(graphcoolUserId => {
        return graphcool.generateAuthToken(graphcoolUserId, 'User')
          .then(token => {
            return { data: {id: graphcoolUserId, token}}
        })
      })
      .catch(error => {
        // Log error, but don't expose to caller
        console.log(`Error: ${JSON.stringify(error)}`)
        return { error: 'An unexpected error occured.' }
      })
  // } else {
  //   return { error: 'Not a valid email' }
  // }
}
