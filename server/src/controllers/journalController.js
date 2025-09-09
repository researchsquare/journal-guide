// const Journal = require('../models/journal');

exports.getAllJournals = async (req, res) => {
  try {
    // TODO: Fetch journals from the database
    res.status(200).json({ message: "👋Hi.... , We haven't built journal controllers yet" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};