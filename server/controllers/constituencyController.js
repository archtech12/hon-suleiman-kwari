const Constituency = require('../models/Constituency');

// Get constituency content
const getConstituencyContent = async (req, res) => {
  try {
    const constituency = await Constituency.findOne();
    if (!constituency) {
      return res.status(404).json({ message: 'Constituency content not found' });
    }
    res.json(constituency);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update constituency content
const updateConstituencyContent = async (req, res) => {
  try {
    const {
      name,
      representative,
      party,
      electionYear,
      communities,
      population,
      initiatives,
      visionContent
    } = req.body;

    // Convert communities string to array if needed
    let communitiesArray = communities;
    if (typeof communities === 'string') {
      communitiesArray = communities.split(',').map(c => c.trim()).filter(c => c);
    }

    const constituencyData = {
      name,
      representative,
      party,
      electionYear,
      communities: communitiesArray,
      population,
      initiatives,
      visionContent
    };

    let constituency = await Constituency.findOne();
    if (constituency) {
      constituency = await Constituency.findByIdAndUpdate(
        constituency._id,
        constituencyData,
        { new: true, runValidators: true }
      );
    } else {
      constituency = new Constituency(constituencyData);
      await constituency.save();
    }

    res.json(constituency);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getConstituencyContent,
  updateConstituencyContent
};