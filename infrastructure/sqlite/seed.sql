DELETE FROM order_items;

DELETE FROM orders;

DELETE FROM cart_items;

DELETE FROM carts;

DELETE FROM products;

INSERT INTO
    products (
        id,
        sku,
        name,
        price_cents,
        currency
    )
VALUES (
        1,
        'SKU-001',
        'Headphones',
        1999,
        'EUR'
    ),
    (
        2,
        'SKU-002',
        'Keyboard',
        4999,
        'EUR'
    ),
    (
        3,
        'SKU-003',
        'Mouse',
        2999,
        'EUR'
    );