CREATE TABLE UT_decklist (
    id SERIAL PRIMARY KEY,
    card_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    deck_id INTEGER REFERENCES UT_decks ON DELETE SET NULL
)