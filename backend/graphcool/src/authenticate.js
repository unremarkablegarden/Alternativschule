const fromEvent = require('graphcool-lib').fromEvent
const bcryptjs = require('bcryptjs')

const userQuery = `
query UserQuery($username: String!) {
  User(username: $username){
    id
    password
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

module.exports = event => {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: '--- Authentication not configured correctly.'}
  }

  // Retrieve payload from event
  const username = event.data.username
  const password = event.data.password

  // Create Graphcool API (based on https://github.com/graphcool/graphql-request)
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getGraphcoolUser(api, username)
    .then(graphcoolUser => {
      if (!graphcoolUser) {
        return Promise.reject('gc/authenticate.js > getGraphcoolUser > Invalid Credentials #1') //returning same generic error so user can't find out what emails are registered.
      } else {
        return bcryptjs.compare(password, graphcoolUser.password)
          .then(passwordCorrect => {
            if (passwordCorrect) {
              return graphcoolUser.id
            } else {
              return Promise.reject('gc/authenticate.js > getGraphcoolUser > Invalid Credentials #2')
            }
          })
      }
    })
    .then(graphcoolUserId => {
      return graphcool.generateAuthToken(graphcoolUserId, 'User')
    })
    .then(token => {
      return { data: { token } }
    })
    .catch(error => {
      // Log error, but don't expose to caller
      console.log(`Error: ${JSON.stringify(error)}`)
      return { error: `gc/authenticate.js > getGraphcoolUser > catch error > An unexpected error occured` }
    })
}
