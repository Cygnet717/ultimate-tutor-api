# Ultimate Tutor
http://ultimatetutor.herokuapp.com/


## Summary
This app makes it easy to build new decks and make online versions of existing decks.  The user can create new decks and search for cards to add to thier deck.  Future deployments will include the ability to add many coppies of a card at once and to random draw a number of cards from your deck to test the first hand you might get in a game.

## API Documentation
### Getting Started
To use API endpoints:
https://ultimatetutor-api.herokuapp.com/api

#### EndPoints
**/**
>Test
Response 

    [
        {"Hello, world!"}
    ]
    


**/users**  POST
>Adds a new user

Send 

    [
        {"username": "Picard", "password": "Makeitso#1"}
    ]


*username must be unique, password must contain 8 characters long and inclue Capital, number, and one of #?!@$%^&*-

Response  

    [
        {user_id: 99, username: "Picard"}
    ]



**/auth/login**  POST
>Logsin user

Send 

    [
        {"username": "Picard", "password": "Makeitso#1"}
    ]

Response 

    [
        {"authToken": *token*, "user_id": 99}
    ]



**/decks/**   GET
>Gets all decks a user has made

Send 

    [
        {"user_id": 99}
    ]

Response 

    [
        {
            "deck_id": 100,
            "deck_name": "Birds",
            "user_id": 99,
            "white": null,
            "blue": null,
            "black": null,
            "red": null,
            "green": null
        }
    ]

*columns white, blue, black, red, green are for future use



**/decks/**   POST
>adds a deck to a users account

Send 

    [
        {"user_id": 99, "deck_name": "The Enterprise"}
    ]

Response 

    [
        {
            "deck_id": 115,
            "deck_name": "The Enterprise",
            "user_id": 99,
            "white": null,
            "blue": null,
            "black": null,
            "red": null,
            "green": null
        }
    ]

*columns white, blue, black, red, green are for future use



**/decks/**  DELETE
>Deletes deck from users account

Send

    [
        {"deck_id": 100}
    ]
    
Response

    [
        {message: "deleted"}
    ]



**/decks/:deck_id**  GET
>Get all cards in a deck

Send

    [
        {"deck_id": 115}
    ]

Response

    [
        {
            "card_id": 159,
            "card_name": "Abundance",
            "image_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card",
            "multiverseid": 130483,
            "deck_id": 78,
            "type": "Enchantment"
        },
        {
            "card_id": 160,
            "card_name": "Ancestor"s Chosen",
            "image_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card",
            "multiverseid": 130550,
            "deck_id": 78,
            "type": "Creature"
        }
    ]



**/decks/:deck_id**  POST
>Add card to existing deck

Send

    [
        {
            "card_name": "Caves of Koilos",
            "image_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129497&type=card",
            "multiverseid": 129497,
            "deck_id": "78",
            "type": "Land"
        }
    ]

Response

    [
        {
            "card_id": 288,
            "card_name": "Caves of Koilos",
            "image_url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129497&type=card",
            "multiverseid": 129497,
            "deck_id": 78,
            "type": "Land"
        }
    ]



**/decks/:deck_id** DELETE
>Removes a card from a deck

Send

    [
        {"card_id": 288}
    ]

Response

    [
        {message: "deleted"}
    ]



## Screenshots
### Landing Page
![Landing Page](/ScreenShots/LandingPage.png "Landing Page")

### Decks View Page
![Decks View Page](/ScreenShots/DeckViewPage.png "Decks View Page")

### Deck ListView Page
![Deck ListView Page](/ScreenShots/DeckListPage.png "Deck ListView Page")

### Deck CardView Page
![Deck CardView Page](/ScreenShots/DeckListCardPage.png "Deck CardView Page")

### Search Page
![Search Page](/ScreenShots/SearchPage.png "Search Page")

### Results Page
![Results Page](/ScreenShots/ResultsPage.png "Results Page")

## Technology used
HTML, CSS, javaScript, React
For the card search Magic: The Gathering - Developers API was used 
https://magicthegathering.io/ 
