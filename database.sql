CREATE DATABASE pernproject;

CREATE TABLE todo(
    id serial PRIMARY KEY,
    title TEXT,
    pages INT,
    completed BOOLEAN default 'FALSE',
    ren BOOLEAN default 'FALSE',
    description TEXT
);