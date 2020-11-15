INSERT INTO public.users(
	first_name, last_name, email, password)
	VALUES
	('Марсель', 'Белялов', 'mail@m', 'qwerty'),
	('Уолтер', 'Уайт', 'walter@m', 'qwerty'),
	('Джон', 'Сноу', 'jhon@m', 'qwerty'),
	('Джорах', 'Мормонт', 'jorah@m', 'qwerty'),
	('Тед', 'Мосби', 'ted@m', 'qwerty');

INSERT INTO public.friends(
	id, users_id, status)
	VALUES (1, 3, 1),
	 (1, 5, 1),
	 (3, 1, 1),
	 (3, 4, 1),
	 (4, 3, 1),
	 (5, 1, 1);

/* 
	{
		18 - umbrella,
		58 - shameless,
		102 - witcher,
		124 - breaking bad,
		230 - friends,
		271 - got,
		193 - himym,
		481 - peaks
	} 
*/
INSERT INTO public.users_serials(
	users_id, serials_id, is_favourite, is_recomendation, is_watched, rating, review)
	VALUES 
		(1, 18, false, false, true, 4, 'norm'),
		(1, 58, true, true, true, 4.4, 'norm'),
		(1, 102, true, true, true, 4.7, 'good'),
		(1, 124, true, false, true, 4.5, 'good'),
		(1, 271, true, true, true, 4.7, 'very good'),
		(1, 293, true, true, true, 5, 'very good'),
		(1, 481, true, true, true, 5, 'very good'),
		(2, 124, true, true, true, 5, 'say my name mf'),
		(3, 271, true, true, true, 5, 'yeah it winter bit'),
		(3, 102, true, false, true, 4.2, 'good series'),
		(4, 271, true, true, true, 5, 'Deny ^('),
		(5, 293, true, true, true, 5, 'not good after 2 midnight'),
		(5, 230, false, false, true, 1, 'bad series'),
		(5, 481, false, true, true, 4.5, 'thomas is nice hero');