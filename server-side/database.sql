CREATE TABLE Notes (
    note_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    content TEXT,
    created_at TIMESTAMP
);