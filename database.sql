CREATE DATABASE pernproject;

CREATE TABLE todo(
    id INT PRIMARY KEY,
    title TEXT,
    pages INT,
    completed BOOLEAN default 'FALSE',
    ren BOOLEAN default 'FALSE',
    description TEXT
);