const { sequelize } = require("../models/index");

const bmentahModel = require(`../models/index`).bmentah;
const bjadiModel = require(`../models/index`).bjadi;

exports.statistik = async (request, response) => {
  try {
    const result = await sequelize.query(`
  SELECT
    dat_bulan.bulan,
    COALESCE(SUM(bmentahs.jml_bmentah), 0) AS jml_bmentah,
    COALESCE(SUM(bjadis.jml_bjadi), 0) AS jml_bjadi
  FROM
    dat_bulan
  LEFT JOIN
    bmentahs ON DATE_FORMAT(bmentahs.createdAt, '%m') = dat_bulan.kode
  LEFT JOIN
    bjadis ON DATE_FORMAT(bjadis.createdAt, '%m') = dat_bulan.kode
  GROUP BY
    dat_bulan.bulan
  ORDER BY
    dat_bulan.kode;
;`);

    response.json({
      data: result,
    });
  } catch (error) {
    response.json({
      message: error.message,
    });
  }
};
