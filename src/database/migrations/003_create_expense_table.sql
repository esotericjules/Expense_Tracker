CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,
    user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);