const xss = require('xss')

const decksService = {
    getAllDecks(db, id) {
        return db
        .select('*')
        .from('ut_decks')
        .where('user_id', id)
    },

    insertDeck(db, newDeck) {
        return db
        .insert(newDeck)
        .into('ut_decks')
        .returning('*')
        .then(([user]) => user)
    },

    serializeDeckName(newDeck) {
        return {
          deck_name: xss(newDeck.deck_name),
          user_id: newDeck.user_id
        }
      },

      deckExists(db, deck_id) {
          return db('ut_decks')
          .where({deck_id})
          .first()
          .then(deck => deck)
      },

      deleteDeck(db, deck_id) {
          return db('ut_decks')
          .where({deck_id})
          .delete()
      }
}

module.exports = decksService