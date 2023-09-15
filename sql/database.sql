-- Create the table for the towns called town_table
CREATE TABLE town_table (
    id serial PRIMARY KEY,
    towns TEXT ,
    town_tag TEXT 
    );

-- Create the table for the registration numbers and the id will make the relations of the tables
CREATE TABLE registration_table (
    id serial PRIMARY KEY,
    registrations VARCHAR(11),
    town_id INT,
    FOREIGN KEY (town_id) REFERENCES town_table(id)
);