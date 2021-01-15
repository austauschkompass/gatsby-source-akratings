SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    "organisation_name", Firma.Firma,
    "organisation_slug", AkOrganisations.slug,
    "rating_count", AnzahlBewertungen,
    "grade", Gesamtbewertung,
    "updated_at", Datum
  )
)
FROM BewImportSRB
JOIN AkOrganisations
ON BewImportSRB.idFirma=AkOrganisations.Firma_id
JOIN Firma
ON BewImportSRB.idFirma=Firma.id;
