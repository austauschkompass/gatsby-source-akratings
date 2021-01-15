SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    "country_name", Land,
    "city_name", Ort,
    "rating_beach", Strand,
    "rating_party", Party,
    "rating_metropolis", Metropole,
    "rating_culture", Kultur,
    "grade", NotevonSRB
  )
)
FROM Orte;
