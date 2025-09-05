PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS cart_items (
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    unit_price REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    PRIMARY KEY (product_id)
);