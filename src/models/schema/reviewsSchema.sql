CREATE TABLE
    IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY NOT NULL,
        content TEXT NOT NULL,
        quiteness INTEGER NOT NULL,
        comfortness INTEGER NOT NULL,
        service INTEGER NOT NULL,
        cleanliness INTEGER NOT NULL,
        food_quality INTEGER NOT NULL,
        food_price INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        workplace_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (workplace_id) REFERENCES workplaces (id)
    );

CREATE INDEX IF NOT EXISTS reviews_workplace_id_index ON reviews (workplace_id)