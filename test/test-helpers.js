const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../src/app')

function makeUsersArray() {
    return [
        {
            user_id: 5,
            username: 'testUser1',
            password: 'Password1!',
        },
        {
            user_id: 2,
            username: 'testUser2',
            password: 'Password1!',
        },
        {
            user_id: 3,
            username: 'testUser3',
            password: 'Password1!',
        },
    ]
}

function makeDecksArray (users) {
    return [
        {
            deck_id: 1,
            deck_name: 'test deckname1',
            user_id: users[0].user_id,
        },
        {
            deck_id: 2,
            deck_name: 'test deckname2',
            user_id: users[0].user_id,
        },
        {
            deck_id: 3,
            deck_name: 'test deckname3',
            user_id: users[1].user_id,
        },
        {
            deck_id: 4,
            deck_name: 'test deckname4',
            user_id: users[1].user_id,
        },
        {
            deck_id: 5,
            deck_name: 'test deckname5',
            user_id: users[2].user_id,
        },
        {
            deck_id: 6,
            deck_name: 'test deckname6',
            user_id: users[2].user_id,
        },
    ]
}

function makeDeckListArray(decks) {
    return [
        {
            card_id: 1,
            card_name: 'test card1',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 12345,
            deck_id: decks[0].deck_id,
        },
        {
            card_id: 2,
            card_name: 'test card2',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 22345,
            deck_id: decks[1].deck_id,
        },
        {
            card_id: 3,
            card_name: 'test card3',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 32345,
            deck_id: decks[2].deck_id,
        },
        {
            card_id: 4,
            card_name: 'test card4',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 42345,
            deck_id: decks[3].deck_id,
        },
        {
            card_id: 5,
            card_name: 'test card5',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 52345,
            deck_id: decks[4].deck_id,
        },
        {
            card_id: 6,
            card_name: 'test card6',
            image_url: 'https://i.imgur.com/oKvvagP.jpg?2',
            multiverseid: 62345,
            deck_id: decks[5].deck_id,
        },
    ]
}

function seedUsers(db, users){
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('ut_users').insert(preppedUsers)
    //.then(() =>
  //update the auto sequence to stay insync
    //db.raw(
      //`SELECT setval('ut_users_user_id_seq', ?)`,
      //[users[users.length -1].id],
   //)
  //)
  }

  function seedDecks(db, decks){
    return db.into('ut_decks').insert(decks)
  }

  function seedCards(db, cards) {
    return db.into('ut_decklist').insert(cards)
  }

function makeTestUsersFixtures() {
    const testUsers = makeUsersArray()
    const testDecks = makeDecksArray(testUsers)
    const testDeckLists = makeDeckListArray(testDecks)
    return { testUsers, testDecks, testDeckLists}
  }

  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        ut_users,
        ut_decks,
        ut_decklist
        RESTART IDENTITY CASCADE`
    )
  }

  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
        
    const user_id = user.user_id
    const token = jwt.sign({ user_id: user_id }, secret, {
      subject: user.username,
      expiresIn:'8h',
      algorithm: 'HS256'
    })
    return `Bearer ${token}`
  }

  module.exports = {
    makeTestUsersFixtures,
    makeUsersArray,
    makeDecksArray,
    makeDeckListArray,
    cleanTables,
    seedUsers,
    seedDecks,
    seedCards,
    makeAuthHeader,
  }