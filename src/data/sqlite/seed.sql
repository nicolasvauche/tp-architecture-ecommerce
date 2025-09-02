INSERT INTO
    products (id, name, price_cents, stock)
VALUES (1, 'T-shirt', 1999, 100),
    (2, 'Hoodie', 3999, 50),
    (3, 'Sticker Pack', 499, 500) ON CONFLICT (id) DO NOTHING;