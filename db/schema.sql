/*
  Database must exist first, before uploading this file
  After database creation, use command: psql [db name] < schema.sql
*/

DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS completed CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  type TEXT
);

CREATE TABLE challenges(
  id SERIAL PRIMARY KEY,
  name TEXT,
  cat_id INTEGER [],
  link TEXT,
  complete Boolean DEFAULT false,
  premium Boolean DEFAULT false
);

CREATE TABLE completed(
  id SERIAL PRIMARY KEY,
  ref_id INTEGER REFERENCES challenges(id)
);

INSERT INTO categories(type) VALUES ('Arrays');
INSERT INTO categories(type) VALUES ('Strings');
INSERT INTO categories(type) VALUES ('Dynamic Programming');
INSERT INTO categories(type) VALUES ('Graph');
INSERT INTO categories(type) VALUES ('Hash Map');

INSERT INTO challenges(name, cat_id, link) VALUES ('Two Sum', ARRAY [(SELECT id FROM categories WHERE type = 'Arrays'), (SELECT id FROM categories WHERE type = 'Hash Map')],'https://leetcode.com/problems/two-sum/');