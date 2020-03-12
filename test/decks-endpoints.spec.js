const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.skip('Decks Endpoints', () => {
    let db

  const { testUsers, testDecks, testDeckLists } = helpers.makeTestUsersFixtures()
  const testUser = testUsers[0]
  const testDeck = testDecks[0]
  const testDeckList = testDeckLists[0]

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

    describe('GET /api/decks', () => {
        beforeEach('insert users', () => {
            helpers.seedUsers(db, testUsers)
        })

        context('Given unauthorized request', () => {
            it(`responds with 401 unauthorized`, () => {
                return supertest(app)
                  .get('/api/decks')
                  .expect(401)
              })
        })

        context('Given authorized request', () => {
            const authorizedUserToken = helpers.makeAuthHeader(testUser)
            console.log(authorizedUserToken)
            context('And no decks in db', () => {
                it('responds with 200 and empty list of decks', () => {
                    return supertest(app)
                    .get('/api/decks')
                    .set('Authorization', authorizedUserToken)
                    .expect(200, [])
                })
            })
        })
    
    })
})