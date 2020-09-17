CREATE TABLE IF NOT EXISTS week (
    week INT NOT NULL,
    data TEXT NOT NULL,
    UNIQUE(week)
);