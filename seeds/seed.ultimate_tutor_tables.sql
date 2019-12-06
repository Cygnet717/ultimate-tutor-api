BEGIN;

TRUNCATE
    ut_users,
    ut_decks,
    ut_decklist
    RESTART IDENTITY CASCADE;

INSERT INTO ut_users (username, password)
VALUES
    ('administrator', 'Password1!'),
    ('testUser', 'Password1!');

INSERT INTO ut_decks (deck_name, user_id)
VALUES
    ('Bird deck', 1),
    ('test deck', 1);

INSERT INTO ut_decklist (card_name, image_url, multiverseid, deck_id)
VALUES
    ('test card', 'https://i.imgur.com/oKvvagP.jpg?2', 426917, 1),
    ('test card', 'https://i.imgur.com/oKvvagP.jpg?2', 137913, 1);

COMMIT;