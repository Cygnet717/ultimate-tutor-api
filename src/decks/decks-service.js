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

      deleteDeck(db, deck_id) {
          return db('ut_decks')
          .where({deck_id})
          .delete()
      },
//services for cards
      getAllCards(db, deck_id) {
        return db
        .select('*')
        .from('ut_decklist')
        .where('deck_id', deck_id)
    },

    insertCardInDeck(db, newCard) {
        return db
        .insert(newCard)
        .into('ut_decklist')
        .returning('*')
        .then(([user]) => user)
    },

    deleteCard(db, card_id) {
        return db('ut_decklist')
        .where({card_id})
        .delete()
    },
}

module.exports = decksService