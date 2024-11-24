CREATE TABLE
    IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        avatar TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
    )