SET character_set_results = latin1;

SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    "country_name", Land,
    "country_code", AkCountryCodes.country_code,
    "city_name", Ort,
    "rating_beach", Strand,
    "rating_party", Party,
    "rating_metropolis", Metropole,
    "rating_culture", Kultur,
    "grade", NotevonSRB
  )
)
FROM Orte
JOIN AkCountryCodes
ON AkCountryCodes.Orte_id=id;
