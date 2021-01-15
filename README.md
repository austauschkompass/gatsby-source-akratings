# Rating API

__TODO__ this is currently a stub and just serves static, pregenerated json files.

The rating API serves aggregated summaries of Ratings across different sites and for specific _things_
Things that can be rated are:

- Cities
- Organisations

## Install

Host `rating_summaries` directory within docroot of webserver-vhost.

## Endpoints

`GET /rating_summaries/organisations.json`

`GET /rating_summaries/cities.json`


## Pregeneration of JSON data

To (re)generate json data locally or on a server that is different from the mysql server the original data is on,
follow these steps.

Assumes you created a local mysql config named `my.cnf` (in this folder) for passwordless interaction with the remote mysql server based on `my.cnf.sample`.

Establish a tunnel to the mysql host via:

```
ssh -f kompass@www.sprachreisenvergleich.de -L 3307:localhost:3306 -N
```

You can now connect to the remote MySQL server on port 3307

Run the prepared queries to generate JSON of rating summaries for cities and organisations:

```
mysql --defaults-extra-file=./my.cnf --batch --skip-column-names sprachreisenvergleich < ./read_rating_summaries_cities > ./rating_summaries/cities.json

mysql --defaults-extra-file=./my.cnf --batch --skip-column-names sprachreisenvergleich < ./read_rating_summaries_organisations > ./rating_summaries/organisations.json
```

__NOTE__: "updated\_at" column does not seem to be up to date. "grade" is a
school grade in german, so 6 is worst, 1 is best, which is currently
mapped to 0-5 stars (i.e. reversed!) in the frontend. With city
ratings however "culture", "metropolis", "party" and "beach" are
directly mapped to how many stars are shown in frontend.

__TODO__: Map full Organisation names into organisation slugs...

## Notes

a join table for "Firma" Names to our organisations slugs was created
in the original remote database with the following statements:

```mysql
CREATE TABLE `AkOrganisations` (
  `Firma_id` int(5) NOT NULL,
  `slug` varchar(140) COLLATE utf8_unicode_ci NOT NULL
) DEFAULT CHARACTER SET=utf8 COLLATE=utf8_unicode_ci;
```

And then manually filled.
