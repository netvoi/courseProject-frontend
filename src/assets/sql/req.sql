/* Кол-во друзей у пользователя */
/* FIXME: */
SELECT SUM(users_id) AS total FROM Friends
WHERE users_id = $id AND status = 'true'

/* Кол-во просмотренных и избранных сериалов */
SELECT
    C1.count_watched,
    C0.count_favourite
FROM
    (
    SELECT
       COUNT(users_id) AS count_watched
    FROM users_serials
    WHERE users_id = ' + id + ') C1,
    (
    SELECT
        COUNT(users_id) AS count_favourite
    FROM users_serials f
    WHERE users_id = $id AND is_favourite = true) C0

/* get userSerials */
SELECT "seriesName", "serials_id", "is_favourite", "is_recomendation", "is_watched", "review", users_serials.rating, 
FROM serials
INNER JOIN users_serials ON serials.id = users_serials.serials_id AND users_serials.users_id = $id

/* get series */
SELECT serials_id, is_favourite, is_watched, is_recomendation, rating
FROM serials
WHERE serials_id = $id

/* findWithFirstLetter */
SELECT "seriesName"
FROM serials
WHERE "seriesName" like 'Г%'
ORDER BY "seriesName"

/* findIdBySeriesName */
SELECT id
FROM serials
WHERE "seriesName" = $seriesName

/* options */
SELECT DISTINCT(genre), SUBSTRING(DISTINCT(year), 1, 4), DISTINCT(country), DISTINCT(rating)
from serials

select id, users_id
from friends
where id = $id or users_id=$d