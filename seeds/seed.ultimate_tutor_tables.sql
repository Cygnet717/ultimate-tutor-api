BEGIN;

TRUNCATE
    ut_users,
    ut_decks,
    ut_decklist
    RESTART IDENTITY CASCADE;

INSERT INTO ut_users (username, password)
VALUES
    ('administrator', 'administrator'),
    ('testUser', 'testPassword');

INSERT INTO ut_decks (deck_name, user_id)
VALUES
    ('Bird deck', 1),
    ('test deck', 1);

INSERT INTO ut_decklist (card_name, image_url, multiverseid, deck_id)
VALUES
    ('Start', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426917&type=card', 426917, 1),
    ('Esper Charm', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=137913&type=card', 137913, 1);

COMMIT;