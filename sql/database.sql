-- Create the table for the towns called town_table
CREATE TABLE town_table (
    id serial PRIMARY KEY,
    towns TEXT NOT NULL,
    town_tag TEXT NOT NULL
    );

-- Create the table for the registration numbers and the id will make the relations of the tables
CREATE TABLE registration_table (
    id serial PRIMARY KEY,
    registrations VARCHAR(9) NOT NULL,
    town_id INT NOT NULL,
    FOREIGN KEY (town_id) REFERENCES town_table(id)
);