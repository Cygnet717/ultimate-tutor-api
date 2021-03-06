const knex = require('knex')
const bcrypt =require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function() {
    let db 
   
    const {testUsers} = helpers.makeTestUsersFixtures()
    const testUser = testUsers[0]

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

    it('POST new users returns 201 added new user', () =>{
        const newUser = {
            username: 'knobber USER', 
            password: 'Password1!'
        }

        return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
    })

    describe('POST /api/users', () => {
        context('User Validation', () => {
            beforeEach('insert users', () => 
            helpers.seedUsers(
                db,
                testUsers,
            )
        )

        const requiredFields = ['username', 'password']

        requiredFields.forEach(field => {
            const registerAttemptBody = {
                username: 'test username',
                password: 'test password',
            }

            it(`responds with 400 required error when '${field}' is missing`, () => {
                delete registerAttemptBody[field]

                return supertest(app)
                .post('/api/users')
                .send(registerAttemptBody)
                .expect(400, {
                    error: `Missing '${field}' in request body`,
                })
            })
        })

        it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
            const userShortPassword = {
                username: 'test user_name',
                password: '1234567',
            }
            return supertest(app)
            .post('/api/users')
            .send(userShortPassword)
            .expect(400, {error: `Password must be longer than 8 characters`})
        })

        it(`responds with 400 'Password must be less than 72 characters' when long password`, () => {
            const userLongPassword = {
                username: 'test user_name',
                password: '*'.repeat(73),
            }
            return supertest(app)
            .post('/api/users')
            .send(userLongPassword)
            .expect(400, { error: `Password must be less than 72 characters`})
        })

        it(`responds 400 error when password starts with spaces`, () => {
            const userPasswordStartsSpaces = {
              username: 'test user_name',
              password: ' 1A!2bB@',
            }
            return supertest(app)
            .post('/api/users')
            .send(userPasswordStartsSpaces)
            .expect(400, {error: `Password must not start or end with empty spaces`})
        })

        it(`responds 400 error when password ends with spaces`, () => {
            const userPasswordEndsSpaces = {
              username: 'test user_name',
              password: '1A!2bB@ ',
            }
            return supertest(app)
            .post('/api/users')
            .send(userPasswordEndsSpaces)
            .expect(400, {error: `Password must not start or end with empty spaces`})
        })

        it(`responds 400 error when password isn't complex enough`, () => {
            const userPasswordNotComplex = {
              username: 'test user_name',
              password: '11AAaabb',
            }
            return supertest(app)
            .post('/api/users')
            .send(userPasswordNotComplex)
            .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character`})
        })

        it(`responds 400 'User name already taken' when user_name sin't unique`, () => {
            const duplicateUser = {
                username: testUser.username,
                password: '11AAaa!!',
            }
            return supertest(app)
            .post('/api/users')
            .send(duplicateUser)
            .expect(400, {error: `Username already taken`})
        })

        context(`Happy path`, () => {
            it(`responds 201, serialized user, storing bcrypted password`, () => {
                const newUser = {
                    username: 'testerr user_name',
                    password: '11AAaa!!',
                }
                return supertest(app)
                .post('/api/users')
              .send(newUser)
              .expect(201)
              .expect(res => {
                  expect(res.body).to.have.property('user_id')
                  expect(res.body.username).to.eql(newUser.username)
                  expect(res.body).to.not.have.property('password')
                  expect(res.headers.location).to.eql(`/api/users/${res.body.user_id}`)
              })
              .expect(res =>
                db
                .from('ut_users')
                .select('*')
                .where({ user_id: res.body.user_id })
                .first()
                .then(row =>{
                    expect(row.username).to.eql(newUser.username)
        
                  return bcrypt.compare(newUser.password, row.password)
                })
                .then(compareMatch => {
                    expect(compareMatch).to.be.true
                })
                )
            })
        })

        })
    })

})