CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL
);

CREATE TABLE friends (
	id SERIAL NOT NULL,
	users_id INTEGER NOT NULL
		REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	status INTEGER DEFAULT 0,
	PRIMARY KEY(id, users_id)
);

CREATE TABLE dialogs (
	id SERIAL PRIMARY KEY NOT NULL,
	time_create DATE NOT NULL
);

CREATE TABLE users_dialogs (
	users_id INTEGER NOT NULL
		REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	dialogs_id INTEGER NOT NULL REFERENCES dialogs(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	time_create DATE NOT NULL
);

CREATE TABLE msg (
	id SERIAL PRIMARY KEY NOT NULL,
	users_id INTEGER NOT NULL
		REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	dialogs_id INTEGER NOT NULL
		REFERENCES dialogs(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	text_msg TEXT NOT NULL,
	time_create DATE NOT NULL
);

CREATE TABLE users_serials (
	users_id INTEGER NOT NULL
		REFERENCES users(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	serials_id INTEGER NOT NULL
		REFERENCES serials(id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	is_favourite BOOLEAN DEFAULT FALSE,
	is_recomendation BOOLEAN DEFAULT FALSE,
	is_watched BOOLEAN DEFAULT FALSE,
	rating SMALLINT DEFAULT 0 NOT NULL,
	review TEXT NOT NULL
);

CREATE TABLE serials (
	id SERIAL PRIMARY KEY NOT NULL,
	actors TEXT NOT NULL,
	country VARCHAR NOT NULL,
	director VARCHAR NOT NULL,
	genre VARCHAR NOT NULL,
	rating SMALLINT NOT NULL,
	seriesName VARCHAR NOT NULL,
	seriesOriginalName VARCHAR,
	tvChannel VARCHAR NOT NULL,
	description TEXT,
	year VARCHAR NOT NULL
)