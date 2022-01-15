CREATE DATABASE pernproject;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    pages INT,
    completed BIT default 'FALSE',
    ren BIT default 'FALSE'
)