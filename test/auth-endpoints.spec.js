const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Auth Endpoints', function() {
  let db

  const { testUsers } = helpers.makeTestUsersFixtures()
  const testUser = testUsers[0]
  console.log(testUser)

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/auth/login`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    const reuqiredFields = ['username', 'password']

    reuqiredFields.forEach(field => {
        const loginAttemptBody = {
            username: testUser.username,
            password: testUser.password,
        }

        it(`responds with 400 required error when '${field}' is missing`, () => {
            delete loginAttemptBody[field]

            return supertest(app)
            .post('/api/auth/login')
            .send(loginAttemptBody)
            .expect(400, {
                error: `Missing '${field}' in request body`,
            })
        })
    })

    it(`responds 400 'invalid user_name or password' when bad user_name`, () => {
        const userInvalidUser = {username: 'user-not', password: 'existy'}
        return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, {error: `Incorrect user_name or password`})
    })

    it(`responds 400 'invalid user_name or password' when bad password`, () => {
        const userInvalidPass = { username: testUser.username, password: 'incorrect'}
        return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPass)
        .expect(400, { error: `Incorrect user_name or password`})
    })

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
            user_name: testUser.username,
            password: testUser.password,
        }
        const expectedToken = jwt.sign(
            {user_id: testUser.user_id}, //payload
            process.env.JWT_SECRET,
            {
                subject: testUser.username,
                expiresIn:'20s',
                algorithm: 'HS256',
            }
        )

        return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
            authToken: expectedToken,
        })
    })

  })
})