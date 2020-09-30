CREATE TABLE IF NOT EXISTS week (
    week INT NOT NULL,
    data TEXT NOT NULL,
    UNIQUE(week)
);


CREATE TABLE users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);
