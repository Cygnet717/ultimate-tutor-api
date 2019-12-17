const express = require('express')
const path = require('path')
const decksService = require('./decks-service')
const { requireAuth } = require('../middleware/jwt-auth')

const decksRouter = express.Router()
const jsonBodyParser = express.json()

decksRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.user_id
        
        decksService.getAllDecks(req.app.get('db'), userId)
        .then(decks => {
            res.json(decks)
        })
        .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const {deck_name, user_id} = req.body
        const newDeck = {deck_name, user_id}
        
        for(const [key, value] of Object.entries(newDeck))
        if(value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        decksService.serializeDeckName(newDeck)

        decksService.insertDeck(req.app.get('db'), newDeck)
        .then(deck => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `./${deck.deck_id}`))
            .json(deck)
        })
        .catch(next)
    })
    .delete(jsonBodyParser, (req, res, next) => {
        const deck_id = req.body.deck_id

        if(!deck_id)
        return res.send(400).json({
            error: 'Missing deck Id'
        })

        decksService.deleteDeck(req.app.get('db'), deck_id)
        .then(deleted => {
            res.status(200).json({message: 'deleted'})
        })
        .catch(next)
    })
    
    

decksRouter
    .route('/:deck_id')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.user_id
        const deck_id = req.params.deck_id
        
        decksService.getAllCards(req.app.get('db'), deck_id)
        .then(cards => {
            res.json(cards)
        })
        .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const {card_name, image_url, multiverseid, deck_id} = req.body
        const newCard = {card_name, image_url, multiverseid, deck_id}

        decksService.insertCardInDeck(req.app.get('db'), newCard)
        .then(card => {
            res
            .status(201)
            .json(card)
        })
        .catch(next)
    })
    .delete(jsonBodyParser, (req, res, next) => {
        const card_id = req.body.card_id

        decksService.deleteCard(req.app.get('db'), card_id)
        .then(deleted => {
            res.status(200).json({message: 'deleted'})
        })
        .catch(next)
    })


module.exports = decksRouter