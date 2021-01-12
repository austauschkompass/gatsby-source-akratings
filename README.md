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

```
mysql -N -B --password --host=localhost --user=kompass --execute='select JSON_ARRAYAGG(JSON_OBJECT("Land", Land, "Ort", Ort, "Strand",Strand,"Party",Party,"Metropole",Metropole,"Kultur",Kultur,"Note",NotevonSRB)) from Orte;' sprachreisenvergleich > rating_summaries_cities.json

mysql -N -B --password --host=localhost --user=kompass --execute='select JSON_ARRAYAGG(JSON_OBJECT("Organisation", Firma.Firma, "AnzahlBewertungen", AnzahlBewertungen, "Note", Gesamtbewertung, "Datum", Datum)) from BewImportSRB join Firma on BewImportSRB.idFirma=Firma.id;' sprachreisenvergleich > rating_summaries_organisations.json
```

__NOTE__: "Datum" column does not seem to be up to date. "Note" is a
school grade in german, so 6 is worst, 1 is best, which is currently
mapped to 1-5 stars (i.e. reversed!). With city ratings however
"Kultur", "Metropole", "Party" and "Strand" are star values, so the
map directly into how many stars are displayed...

__TODO__: Map full Organisation names into organisation slugs...
