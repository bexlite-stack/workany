CREATE TABLE
    IF NOT EXISTS workplaces (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city_id TEXT NOT NULL,
        type TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (city_id) REFERENCES cities (id)
    );

CREATE INDEX IF NOT EXISTS workplaces_city_id_index ON workplaces (city_id);

CREATE INDEX IF NOT EXISTS workplaces_user_id_index ON workplaces (user_id);