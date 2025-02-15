CREATE TABLE expense (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    description TEXT,
    category_id UUID REFERENCES category(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);