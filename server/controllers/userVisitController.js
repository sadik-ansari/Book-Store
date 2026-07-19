const Visit = require("../models/UsersVisits");

const increaseVisit = async (req, res) => {
  const visit = await Visit.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    {
      returnDocument: "after",
      upsert: true,
    }
  );

  res.json({
    visits: visit.count,
  });
};

const getVisitCount = async (req, res) => {
  const visit = await Visit.findOne();

  res.json({
    visits: visit?.count || 0,
  });
};

module.exports = { increaseVisit, getVisitCount }