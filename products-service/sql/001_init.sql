PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR'
);

INSERT INTO
    products (name, price, currency)
VALUES (
        'Clavier mécanique',
        89.90,
        'EUR'
    ),
    (
        'Souris sans fil',
        29.99,
        'EUR'
    ),
    (
        'Écran 27" 144Hz',
        279.00,
        'EUR'
    );