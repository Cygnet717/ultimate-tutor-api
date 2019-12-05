CREATE TABLE UT_decks (
    deck_id SERIAL PRIMARY KEY,
    deck_name TEXT NOT NULL,
    user_id INTEGER REFERENCES UT_users(id) ON DELETE SET NULL,
)