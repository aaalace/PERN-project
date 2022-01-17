CREATE DATABASE pernproject;

CREATE TABLE todos(
    id INT PRIMARY KEY,
    title TEXT,
    pages INT,
    completed BOOLEAN default 'FALSE',
    ren BOOLEAN default 'FALSE'
)   