CREATE TABLE
    IF NOT EXISTS images (
        id TEXT PRIMARY KEY NOT NULL,
        filename TEXT NOT NULL,
        type TEXT NOT NULL,
        user_id TEXT NOT NULL,
        workplace_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (workplace_id) REFERENCES workplaces (id)
    );

CREATE INDEX IF NOT EXISTS images_workplace_id_index ON images (workplace_id);

CREATE INDEX IF NOT EXISTS images_user_id_index ON images (user_id);