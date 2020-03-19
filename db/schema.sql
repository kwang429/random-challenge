/*
  Database must exist first, before uploading this file
  After database creation, use command: psql [db name] < schema.sql
*/

DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS completed CASCADE;

CREATE TABLE challenges(
  id SERIAL PRIMARY KEY,
  name TEXT,
  category TEXT [],
  link TEXT,
  complete Boolean DEFAULT false
);

CREATE TABLE completed(
  id SERIAL PRIMARY KEY,
  ref_id INTEGER REFERENCES challenges(id)
);