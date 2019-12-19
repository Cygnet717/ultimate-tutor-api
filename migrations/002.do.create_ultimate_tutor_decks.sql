CREATE TABLE ut_decks (
    deck_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    deck_name TEXT NOT NULL,
    user_id INTEGER REFERENCES ut_users(user_id) ON DELETE CASCADE
);