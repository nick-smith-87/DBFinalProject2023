CREATE DATABASE FantasyFootball;

CREATE TABLE Player(
    PlayerID SERIAL PRIMARY KEY,
    Pname VARCHAR(255),
    Position VARCHAR(255),
    Salary VARCHAR(255),
    FPoints VARCHAR(255)
);